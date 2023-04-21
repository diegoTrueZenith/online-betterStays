import React, { useState, useEffect, useRef } from 'react'

function Booking(props) {

  const [paymentApproved, setPaymentApproved] = useState(false);

  const [isRegistred, setIsRegistred] = useState(false);
  const [guestID, setGuestID] = useState();
  
  //HANDLES CLICK OUT OF DIV
  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        props.closePopUp();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);


  const newReservation = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: props.name, 
        lastName: props.lastName, 
        phone: props.phone, 
        email: props.email ,
        propertyID: props.propertyID,
        checkIn: props.checkIn.split('/').join('-'), 
        checkOut: props.checkOut.split('/').join('-')
      })
    };
    const response = await fetch('http://localhost:3000/api/guestyNewReservation', requestOptions);
    const result = await response.json();
    console.log(result);
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

    function limitCharacters(text, length){
        let maxLength = length;
        if(text.length > maxLength){
          return text.slice(0, maxLength) + '...'
        } else {
          return text
        }
    }


  return (
    <div ref={ref}>
      <div className='wrapper-confirmation'>
        <div className='reservation-details'>
          {/* LEFT SIDE */}
        <div>
          <img src={props.propertyPicture} />
      
          <h2 id="summaryTitle"> Summary </h2>
          <div className='summary'>
          {props.balances.map(balances => (
            <div key={balances.date} className='summary-row'>
              <p>{formatDate(balances.date)}</p>
              <p>${balances.price}.00 </p>
            </div>
          ))}
          </div>
          <div className='totals'>
            <h2> Total: </h2>
            <h2>${props.balance}.00</h2>
          </div>
         
        </div>
        {/* RIGHT SIDE */}
        <div>
          <h1> {props.propertyName} </h1>
          <h2> {props.propertyTitle} </h2>
          <div id="details">
            <div className='detail'>
              <i className="icon-confirmation bi bi-calendar4-week"></i>
              <h3> Check In</h3>
              <p> {formatDate(props.checkIn)} </p>
              {/* <p className="checksTime"> 4:00 pm</p> */}
            </div>
            <div className='detail'>
              <i className="icon-confirmation bi bi-calendar4-week"></i>
              <h3> Check In</h3>
              <p> {formatDate(props.checkOut)} </p>
              {/* <p className="checksTime"> 11:00 am</p> */}
            </div>
            <div className='detail'>
              <i className="icon-confirmation bi bi-person"></i>
              <h3> Full Name</h3>
              <p> {limitCharacters(props.name + " " + props.lastName, 15)}</p>
            </div>
            <div className='detail'>
              <i className="icon-confirmation bi bi-telephone"></i>
              <h3> Phone</h3>
              <p> {props.phone} </p>
            </div>
            <div className='detail'>
              <i className="icon-confirmation bi bi-person"></i>
              <h3> Email</h3>
              <p> {limitCharacters(props.email, 20)} </p>
            </div>
          </div>
          <div className='checkOut'>
            <p> Balance $ {props.balance}USD</p>
            <p> Payment Approved:  {paymentApproved ? "True" : "False"}</p>
            <button onClick={()=>newReservation()}> Pay Now</button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
