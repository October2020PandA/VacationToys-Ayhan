import React, {useEffect, useState} from 'react'
import {Link, navigate} from '@reach/router'
import axios from 'axios'
import moment from 'moment'

const ReservationList = () => {
    const [list, setlist] = useState([])
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:8000/api/reservations/")
        .then(res => setlist(res.data.reservation))
        .catch(err =>  console.log(err))
        setLoaded(true);
    },[])
    const deleteReservation = (id) => {
        axios.delete(`http://localhost:8000/api/reservation/delete/${id}`)
        .then(res => navigate("/reservations"))
        .catch(err => console.log(err))
        const newList = list.filter((item) => item._id !== id);
        setlist(newList)
    }
    return(
        <div className="container">
            <h1>Reservation List of Customers</h1>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope='col'>Tool</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Customer email</th>
                        <th scope="col">Customer phone</th>
                        <th scope="col">Modify Reservation</th>
                    </tr>
                </thead>
                <tbody>
                {loaded && (
                list.map((reservation, idx) => (
                    <tr key={idx}>
                        <td>{moment(reservation.date).format('MM/DD/YYYY')}</td>
                        <td>{reservation.tool}</td>
                        <td>{reservation.customer}</td>
                        <td>{reservation.email}</td>
                        <td>{reservation.phone}</td>
                        <td>
                            <Link to={'/reservations'} onClick={()=>deleteReservation(reservation._id)}>delete</Link> | 
                            <Link to={`/reservation/update/${reservation._id}`}>edit</Link>
                        </td>
                    </tr>

                ))
            )}
            </tbody>
            </table>
        </div>
    )
}
export default ReservationList;