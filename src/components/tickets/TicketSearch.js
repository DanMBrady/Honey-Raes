export const TicketSearch =({ setterFunction }) =>{
    return (
        <div>
             <h2>List of Tickets</h2>
            <input 
            onChange={
                (changeEvent)=>{
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Enter search terms" />

        </div>
    )
}