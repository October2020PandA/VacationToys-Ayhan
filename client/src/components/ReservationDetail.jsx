import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {navigate} from "@reach/router"
import Form from './Form'
import moment from 'moment'
import MyFancyComponent from './Map'

const ReservationEdit = (props) => {
    const [tool, setTool] = useState("")
    const [customer, setCustomer] = useState("")
    const [date, setDate] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [errs, setErrs] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [emailStatus, setEmailStatus]= useState("");
    const [friendEmail, setFriendEmail] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/reservation/${props.id}`)
        .then(res =>{
            setTool(res.data.tool);
            setCustomer(res.data.customer);
            setDate(moment(res.data.date).format('YYYY-MM-DD'));
            setEmail(res.data.email);
            setPhone(res.data.phone);
            setLoaded(true);
        })
        .catch(err =>  console.log(err))
    },[])

    const onUpdate = () =>{
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
                    navigate(`/reservation/update/${props.id}`)
                }
            })
        .catch(err => console.log(err))
    }
    const sendMailToOther = () => {
        console.log('parameters:', tool,date,friendEmail)
        const message = `Your friend send you reservation is approved for ${tool} on ${date}`
        fetch('http://localhost:8000/send', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: friendEmail,
                text: message
            })
          })
          .then((res) => res.json())
          .then((res) => {
              if(res.code =="fail"){
                setEmailStatus(true);
                
              }else{
                  setEmailStatus(false);
                  setFriendEmail("")
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
        <h2>Update Reservation</h2>
        <div className="row">
            <div className="col-6">
            {loaded && (
            <Form initialTool={tool} initialCustomer={customer} initialDate={date} initialEmail={email} initialPhone={phone}  onSubmitProp={onUpdate} errs={errs}  emailStatus={emailStatus}/>
            )}
            </div>
            <div className="col-6">
            <MyFancyComponent/>
            </div>
        </div>
        <div className="container-fluid mt-5">
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Recipient's email" aria-label="Recipient's username" aria-describedby="basic-addon2" type="text" name="friendEmail" value={friendEmail} onChange={(e) => setFriendEmail(e.target.value)}/>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" props={props} onClick={sendMailToOther} type="button">Share with your Friend</button>
            </div>
        </div>
        </div>
        </div>
        </>
    )
}
export default ReservationEdit;