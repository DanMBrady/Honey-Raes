import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerPhoto } from "../profile/CustomerPhoto"
import { Profile } from "../profile/Profile"
import { TicketContainer } from "../tickets/TicketContainer"
import { TicketEdit } from "../tickets/TicketEdit"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"
import { TicketSearch } from "../tickets/TicketSearch"

export const CustomerViews = () => {
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
                <Route path="tickets" element={ <TicketList />} />
                <Route path="ticket/create" element={ <TicketForm /> } />
                <Route path="profile" element={ <Profile/> } />
                <Route path="tickets/:ticketId/edit" element={ <TicketEdit />} />
                <Route path="profile/photo/:photoId" element={ <CustomerPhoto />} />
        </Routes>
    )
}
