import React, {useState} from 'react'

const Form = (props) => {
    const { initialTool, initialCustomer, initialDate,initialEmail,initialPhone,errs, onSubmitProp, emailStatus } = props;
    const [tool, setTool] = useState(initialTool)
    const [customer, setCustomer] = useState(initialCustomer)
    const [date, setDate] = useState(initialDate)
    const [email, setEmail] = useState(initialEmail)
    const [phone, setPhone] = useState(initialPhone)

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp({tool, customer, date, email, phone});
    }

    
    return(
        <div className="container">
        <form>
            <div className="form-group">
                <label>Tool</label>
                <input className="form-control form-control-sm w-50" type="text" name="tool" value={tool} onChange={(e) => setTool(e.target.value)}/>
                {errs.tool ? <p className="text-danger small">{errs.tool.message}</p>: null}
            </div>
            <div className="form-group">
                <label>Customer</label>
                <input className="form-control form-control-sm w-50" type="customer" name="customer" value={customer} onChange={(e) => setCustomer(e.target.value)}/>
                {errs.customer ? <p className="text-danger small">{errs.customer.message}</p>: null}
            </div>
            <div className="form-group">
                <label>Date</label>
                <input className="form-control form-control-sm w-50" placeholder='MM/DD/YYYY' type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                {errs.date ? <p className="text-danger small">{errs.date.message}</p>: null}
            </div>
            <div className="form-group">
                <label>eMail</label>
                <input className="form-control form-control-sm w-50" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                {errs.email ? <p className="text-danger small">{errs.email.message}</p>: null}
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input className="form-control form-control-sm w-50" type="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                {errs.phone ? <p className="text-danger small">{errs.phone.message}</p>: null}
            </div>
            <input className="btn btn-primary btn-lg" onClick={onSubmitHandler} type="submit"/>
            {emailStatus ? <p className="text-danger small">There is an issue on email</p>: null}
        </form>
        </div>
    )
}

export default Form;