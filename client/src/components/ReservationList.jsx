import React, {useEffect, useState} from 'react'
import {Link} from '@reach/router'
import axios from 'axios'

const ReservationList = () => {
    const [list, setlist] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/api/reservations/")
        .then(res => setlist(res.data.reservation))
        .catch(err =>  console.log(err))
    },[])
    return(
        <div className="container">
            <h2>All Reservation List</h2>
            {
                list.map((reservation, idx) => (
                    <div>
                        <Link key={idx} to={`/reservation/${reservation._id}`}>
                            <button className="btn btn-info btn-m m-1">{reservation.customer}</button>
                        </Link>
                    </div>

                ))
            }
        </div>
    )
}
export default ReservationList;