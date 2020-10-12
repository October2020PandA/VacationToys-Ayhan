import React from 'react'
import ReservationForm from '../components/ReservationForm'


const Main = () =>{
    return(
        <div className="container mt-3">
            <div className="row">
                <div className="col">
                    <ReservationForm className="col"/>
                </div>
            </div>
        </div>
        
    )
}

export default Main;