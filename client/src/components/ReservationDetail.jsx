import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {navigate} from "@reach/router"
import Form from './Form'

const ReservationEdit = (props) => {
    const [tool, setTool] = useState("")
    const [customer, setCustomer] = useState("")
    const [date, setDate] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [errs, setErrs] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/reservation/${props.id}`)
        .then(res =>{
            setTool(res.data.tool);
            setCustomer(res.data.customer);
            setDate(res.data.date);
            setEmail(res.data.email);
            setPhone(res.data.phone);
            setLoaded(true);
        })
        .catch(err =>  console.log(err))
    },[])

    const onUpdate = ({tool,customer,date,email,phone}) =>{
        axios.put(`http://localhost:8000/api/reservation/update/${props.id}`, {
            tool,
            customer,
            date,
            email,
            phone
        })
        .then(res => 
            {
                if(res.data.error){
                    setErrs(res.data.error.errors);
                }else{
                    navigate(`/reservation/${props.id}`)
                }
            })
        .catch(err => console.log(err))
    }
    
    return(
        <>
        <div className="container">
        <h2>Update Reservation</h2>
        {loaded && (
        <Form initialTool={tool} initialCustomer={customer} initialDate={date} initialEmail={email} initialPhone={phone}  onSubmitProp={onUpdate} errs={errs} />
        )}
        </div>
        </>
    )
}
export default ReservationEdit;