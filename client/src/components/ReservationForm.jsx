import React, { useState } from 'react'
import axios from 'axios'
import {navigate} from "@reach/router"
import Form from './Form'

const ReservationForm = () => {
    const [tool, setTool] = useState("")
    const [customer, setCustomer] = useState("")
    const [date, setDate] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [errs, setErrs] = useState("");

    const onSubmit = ({tool,customer,date,email,phone}) =>{
        axios.post('http://localhost:8000/api/reservation/new', {
            tool,
            customer,
            date,
            email,
            phone
        })
        .then(res => {
            if(res.data.error){
                setErrs(res.data.error.errors);
            }else{
                navigate(`/reservation/${res.data._id}`)
            }
        })
        .catch(err => console.log(err))
    }
    return(
            <>
            <div className="container">
            <h2>Add New Reservation</h2>
            <Form initialTool={tool} initialCustomer={customer} initialDate={date} initialEmail={email} initialPhone={phone} onSubmitProp={onSubmit} errs={errs} />
            </div>
        </>
    )
}
export default ReservationForm;