import { Link } from "react-router-dom"
export const Customer =({id,fullName,email,photo})=>{
    return <section key={id} className="customer">
    <div>
        <Link to={`/customers/${id}`} className="employeeLink">Name: {fullName}</Link> 
    </div>
    <div>Email: {email}</div>
    <div><img src={photo} className="photos"></img></div>
</section>
}