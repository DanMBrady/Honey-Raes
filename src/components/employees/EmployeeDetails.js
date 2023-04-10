import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const EmployeeDetails =() =>{
    const {employeeId} =useParams()
   const [employee,updateEmployee] = useState({})

   useEffect(
    ()=>{
        fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
        .then(response => response.json())
        .then((data)=>{
            const singleEmployee =data[0]
            updateEmployee(singleEmployee)
        })
    },
    [employeeId]
   )
   return <div className="employeeDetailContainer">
   <div className="employeeDetailBox">
    <h2>{employee?.user?.fullName}</h2>
            <div><img src={employee?.user?.photo} className="photos"></img></div>
            <div>Position: {employee.role}</div>
            <div>Skills: {employee.specialty}</div>
            <div>Email: {employee?.user?.email}</div>
            <footer>Currently working on {employee?.employeeTickets?.length} {employee?.employeeTickets?.length ===1? "ticket":"tickets"}</footer>
   </div>
   </div>
  
}