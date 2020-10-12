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
    const [emailStatus, setEmailStatus]= useState("");
    

    const onSubmit = ({tool,customer,date,email,phone}) => {
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
                console.log(res.data._id);
                sendMail(tool, date, email, res.data._id)
            }
        })
    }
    const sendMail = (tool, date, email, id) => {
        console.log("this id is from send email", id)
        const message = `Your reservation is approved for ${tool} on ${date}`
        fetch('http://localhost:8000/send', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: email,
                text: message
            })
          })
          .then((res) => res.json())
          .then((res) => {
              if(res.code =="fail"){
                setEmailStatus(true);
                
              }else{
                  setEmailStatus(false);
                  console.log('id is here', id)
                  navigate(`/reservation/update/${id}`)
              }
            console.log('here is the response: ', res);
          })
          .catch((err) => {
            console.error('here is the error: ', err);
          })
    }
    return(
            <>
            <div className="container">
            <h2>Add New Reservation</h2>
            <Form initialTool={tool} initialCustomer={customer} initialDate={date} initialEmail={email} initialPhone={phone} onSubmitProp={onSubmit} onClickProp={sendMail} errs={errs} emailStatus={emailStatus} />
            </div>
        </>
    )
}
export default ReservationForm;