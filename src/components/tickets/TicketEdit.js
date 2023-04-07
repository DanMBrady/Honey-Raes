import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const TicketEdit = () => {
    const [ticket,setTicket]=useState({
        description:"",
        emergency: false,
    })
    const { ticketId } = useParams()

    useEffect(
        () => {
           fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
           .then(response => response.json())
           .then((ticket) => {
            setTicket(ticket)
           })
        },
        [ticketId] 
    )

    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        

       
       

        return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(ticket)
        })
        .then(response => response.json())
        .then(() =>{
            navigate("/tickets")
        })

      
    }

    return(
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={ticket.description}
                        onChange={
                            (evt)=>{
                                const copy = {...ticket}
                                copy.description = evt.target.value
                                setTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        checked={ticket.emergency}
                        value={ticket.emergency}
                        onChange={
                            (evt)=>{
                               const copy = {...ticket} 
                               copy.emergency = evt.target.checked
                               setTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
            onClick ={(clickEvent)=> handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}