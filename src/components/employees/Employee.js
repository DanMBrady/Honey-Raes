import { Link } from "react-router-dom"
export const Employee =({id,fullName,email,photo})=>{
    return <section key={id} className="employee">
    <div>
        <Link to={`/employees/${id}`} className="employeeLink">Name: {fullName}</Link> 
    </div>
    <div>Email: {email}</div>
    <div><img src={photo} className="photos"></img></div>
</section>
}