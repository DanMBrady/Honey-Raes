import { useEffect, useState } from "react"

export const CustomerForm =()=>{

    const localHoneyUser =localStorage.getItem("honey_user")
    const honeyUserObject =JSON.parse(localHoneyUser)

    const [feedback, setFeedback] = useState("")


    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 2000);
        }
    }, [feedback])

    const [profile,updateProfile] =useState({
        address:"",
        phoneNumber:0,
        userId:null,
    })

    const [extra,setExtra]=useState({
        photo:"",
        email:"",
        fullName:"",
        isStaff:false,
    })
    useEffect(()=>{
        fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
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
       

        return fetch(`http://localhost:8088/customers/${profile.id}`,{
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
    
        .then(() => {
            setFeedback("Employee profile successfully saved")
        })
      
    }

    return (<div>
        <form className="profile">
            <h2 className="profile__title">Update Profile</h2>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
         {feedback}
        </div>  
            <article><img className="photos"src ={extra.photo}></img></article>
            <article></article>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Full Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={extra.fullName}
                        onChange={
                            (evt) => {
                                const copy ={...extra}
                                copy.fullName =evt.target.value
                                setExtra(copy)
                                
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Photo:</label>
                    <input type="text"
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
                    <label htmlFor="specialty">Phone Number:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy ={...profile}
                                copy.phoneNumber =evt.target.value
                                updateProfile(copy)
                                
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Email:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={extra.email}
                        onChange={ (evt) => {
                            const copy ={...extra}
                            copy.email =evt.target.value
                            setExtra(copy)
                                
                        }
                    } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                const copy ={...profile}
                                copy.address =evt.target.value
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