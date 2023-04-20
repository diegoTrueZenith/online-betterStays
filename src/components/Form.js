import React, { useState, useEffect } from 'react'
import Booking from './Booking';

function Form(props) {

  const [showPopup, setShowPopup] = useState(false);
  const [showBtnContinue, setShowBtnContinue] = useState(false)

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // VALIDATING FORM
  function checkName(event) {
    setName(event.target.value);
    checkForm()
  }
  function checkLastName(event) {
    setLastName(event.target.value);
    checkForm()
  }
  function checkPhone(event) {
    if (event.target.value.length == 10) {
      setPhone(event.target.value);
      checkForm()
    } else {
      setPhone("");
    }
  }
  function checkEmail(event) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(event.target.value)) {
      setEmail(event.target.value);
      checkForm()
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

  function checkForm(){
    if(!name == "" && !lastName == "" && !email == "" && !phone == "" && !props.checkIn == "" && !props.checkOut == "" ) {
      setShowBtnContinue(true);
    }
  }

  useEffect(()=>{
    checkForm();
  }, [props.checkIn, props.checkOut])


  
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
        <div style={{display: showBtnContinue ? "block" : "none"}}>
          <button className="btnForm" onClick={()=>setShowPopup(true)}> Continue </button>
        </div>
        <div className="popup-booking" style={{display : showPopup ? "grid" : "none"}}>
            <Booking 
              propertyName={props.propertyName} 
              propertyPicture={props.propertyPicture} 
              name={name} 
              lastName={lastName} 
              email={email} 
              phone={phone} 
              checkIn={props.checkIn} 
              checkOut={props.checkOut} 
              balance={props.balance}
              closePopUp={()=>setShowPopup(false)}
            />
          </div>
    </div>
  )
}

export default Form;
