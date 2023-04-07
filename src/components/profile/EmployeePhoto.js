import { useEffect, useState } from "react"
import "./Photo.css"

export const EmployeePhoto=()=>{
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const [user,setUser]=useState([])
    useEffect(
        () => {
           fetch(`http://localhost:8088/users/${honeyUserObject.id}`)
           .then(response => response.json())
           .then((user) => {
            setUser(user)
           })
        },
        [] 
    )
    return <div className="photoContainer">
        <img className="photoPage"src={user.photo}></img>
    </div>
}