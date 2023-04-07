import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const EmployeeForm = () => {
    // TODO: Provide initial state for profile


    const [feedback, setFeedback] = useState("")

    useEffect(() => {
    if (feedback !== "") {
        // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 2000);
    }
}, [feedback])



    const [profile,updateProfile] =useState({
        specialty:"",
        rate:0,
        role:"",
        userId:null,
    })

    const [extra,setExtra]=useState({
        photo:"",
        email:"",
        fullName:"",
        isStaff:true,
    })
    

    const localHoneyUser =localStorage.getItem("honey_user")
    const honeyUserObject =JSON.parse(localHoneyUser)

    // TODO: Get employee profile info from API and update state
    useEffect(()=>{
        fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
        .then(response => response.json())
        .then((data)=>{
            const employeeObject =data[0]
           updateProfile(employeeObject)
        })
        
    },[]
    )

    useEffect(()=>{
        fetch(`http://localhost:8088/users?id=${honeyUserObject.id}`)
        .then(response => response.json())
        .then((data)=>{
            const employeeObject =data[0]
         setExtra(employeeObject)
        })
        
    },[]
    )


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        

        return fetch(`http://localhost:8088/employees/${profile.id}`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(profile)
        })
        .then(response=>response.json())
        .then(fetch(`http://localhost:8088/users/${profile.userId}`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(extra)
        }))
        //.then(response=>response.json())
        .then(() => {
            setFeedback("Employee profile successfully saved")
        })
        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
    }

    return (<div>
        <form className="profile">
            <h2 className="profile__title">Update Profile</h2>
         <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
         {feedback}
        </div>  
        <article><Link to={`photo/${extra.id}`}><img className="photos"src ={extra.photo}></img></Link></article>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.specialty}
                        onChange={
                            (evt) => {
                                const copy ={...profile}
                                copy.specialty =evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Photo:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={extra.photo}
                        onChange={
                            (evt) => {
                                
                                const copy ={...extra}
                                copy.photo =evt.target.value
                                setExtra(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Role:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.role}
                        onChange={
                            (evt) => {
                                const copy ={...profile}
                                copy.role =evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Hourly rate:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.rate}
                        onChange={
                            (evt) => {
                                const copy ={...profile}
                                copy.rate =parseFloat(evt.target.value,2)
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent)=>handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </div>
    )
}