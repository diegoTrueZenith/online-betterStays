import React, { useState, useEffect } from 'react'

function Form(props) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // VALIDATING FORM
  function checkName(event) {
    setName(event.target.value);
  }
  function checkLastName(event) {
    setLastName(event.target.value);
  }
  function checkPhone(event) {
    if (event.target.value.length == 10) {
      setPhone(event.target.value);
    } else {
      setPhone("");
    }
  }
  function checkEmail(event) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(event.target.value)) {
      setEmail(event.target.value);
    } else {
      setEmail("");
    }
  }

  // FORMATING DATE INTO DATE-TEXT
  function formatDate(date) {
    if (date == ""){
        return ""
    } else {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString(undefined, options);
    }
  }
  
  return (
    <div>
        <div className='form'>
        <h2> Contact Information:</h2>
            <input className="form-inputs" type={"text"} placeholder="First Name"     onChange={checkName}/>
            <input className="form-inputs" type={"text"} placeholder="Last Name"      onChange={checkLastName}/>
            <input className="form-inputs" type={"tel"} placeholder="Phone Number"    onChange={checkPhone}/>
            <input className="form-inputs" type={"email"} placeholder="Email Address" onChange={checkEmail} />
        </div>
        <div className="bookingConfirmation">
            <h2> Confirm your information: </h2>
            <p><b> Check-in:  </b> {formatDate(props.checkIn)}</p>
            <p><b> Check-Out: </b> {formatDate(props.checkOut)}</p>
            <p><b> Full Name: </b> {name} {lastName} </p>
            <p><b> Phone:     </b> {phone} </p>
            <p><b> Email:     </b> {email} </p>
        </div>
    </div>
  )
}

export default Form;
