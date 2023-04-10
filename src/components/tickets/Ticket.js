import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Ticket =({ ticketObject,employees,currentUser,getAllTickets})=>{
   




const userEmployee=employees.find(employee=> employee.userId=== currentUser.id)


let assigenedEmployee =null

if(ticketObject.employeeTickets.length > 0){
const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
assigenedEmployee = employees.find(employee => employee.id===ticketEmployeeRelationship.employeeId)

}


const canClose =()=>{
    if(userEmployee?.id===assigenedEmployee?.id && ticketObject.dateCompleted === ""&&currentUser.staff === true){
        return <button onClick={closeTicket}className="ticketFinish">Finish</button>
    }
    else{
        return ""
    }
}

const closeTicket =()=>{
    const copy ={
        userId:ticketObject.userId,
        description:ticketObject.description,
        emergency:ticketObject.emergency,
        dateCompleted: new Date()
    }

    return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(copy)
    })
    .then(response=>response.json())
    .then(getAllTickets)
}


const buttonOrNoButton =() =>{
    if(currentUser.staff){
        return <button
        onClick={()=>{
            fetch(`http://localhost:8088/employeeTickets`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    employeeId:userEmployee.id,
                    serviceTicketId:ticketObject.id,
                })
            })
            .then(response=>response.json())
            .then(()=>{
                getAllTickets()
            })
        }}
        >Claim</button>
    }
    else{
        return''
    }
}

    return <section className="ticket">
    <div className="ticketTop">
        <article>Customer: {ticketObject?.user?.fullName}</article>
    <article><img className="photos"src={ticketObject?.user?.photo}></img></article>
    </div>
    <div className="ticketBottom">
    <header>
        {currentUser.staff ? `Ticket ${ticketObject.id} `:
    <header>
     <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
    </header>
    
}
    </header>
    <header>{ticketObject.description}</header>
    <section>Emergency: {ticketObject.emergency ? "yes" : "No"}</section>
    <footer>
        {
            ticketObject.employeeTickets.length
            ? `Currently being worked on by ${assigenedEmployee !== null ? assigenedEmployee?.user?.fullName : "" }`
            : buttonOrNoButton()
        }
        <article>
        {
            canClose()
        }
        </article>
    </footer>
    </div>
</section>
}