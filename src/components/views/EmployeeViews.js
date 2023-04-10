import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerDetails } from "../customers/CustomerDetails"
import { CustomerList } from "../customers/CustomerList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { EmployeeList } from "../employees/EmployeeList"
import { EmployeePhoto } from "../profile/EmployeePhoto"
import { Profile } from "../profile/Profile"
import { TicketContainer } from "../tickets/TicketContainer"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"
import { TicketSearch } from "../tickets/TicketSearch"
import "./Views.css"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                  <div className="home">
                    <h1>The Rogues Repair Shop</h1>
                    
                    <img className="logo"src="https://townsquare.media/site/622/files/2016/06/Rogues-Gallery.png?w=1200&h=0&zc=1&s=0&a=t&q=89"></img>
                    </div>
                    <Outlet />
                </>
            }>

            </Route>
                <Route path="tickets" element={ <TicketContainer />} />
                <Route path="profile" element={ <Profile/> } />
                <Route path="employees" element={ <EmployeeList />} />
                <Route path="employees/:employeeId" element={ <EmployeeDetails />} />
                <Route path="customers" element={ <CustomerList />} />
                <Route path="customers/:customerId" element={ <CustomerDetails />} />
                <Route path="profile/photo/:photoId" element={ <EmployeePhoto/>} />
                
        </Routes>
    )
}
