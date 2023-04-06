import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails =() =>{
    const {customerId} =useParams()
   const [customer,updateCustomer] = useState({})

   useEffect(
    ()=>{
        fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
        .then(response => response.json())
        .then((data)=>{
            const singleCustomer =data[0]
            updateCustomer(singleCustomer)
        })
    },
    [customerId]
   )
   return <div className="employeeDetailContainer">
   <div className="customerDetailBox">
    <h2>{customer?.user?.fullName}</h2>
            <div><img src={customer?.user?.photo} className="photos"></img></div>
            <div>Phone Number: {customer.phoneNumber}</div>
            <div>Email: {customer?.user?.email}</div>
            <div>Address: {customer.address}</div>
            
   </div>
   </div>
  
}