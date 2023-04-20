import React, { useState, useEffect, useRef } from 'react'

function Booking(props) {

  const [paymentApproved, setPaymentApproved] = useState(false);
  
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

  


  return (
    <div ref={ref}>
    <div className='wrapper-confirmation'>
        <div id="left">
          <img src={props.propertyPicture} />
          <hr></hr>
          <h1> {props.propertyName} </h1>
          <p> <i className="icon-confirmation bi bi-calendar4-week"></i><b> Check-In:     </b>{props.checkIn} </p>
          <p> <i className="icon-confirmation bi bi-calendar4-week"></i><b> Check Out:    </b>{props.checkOut} </p>
          <p> <i className="icon-confirmation bi bi-person"></i><b> Full Name:    </b>{props.name} {props.lastName}</p>
          <p> <i className="icon-confirmation bi bi-envelope"></i><b> Email:        </b>{props.email} </p>
          <p> <i className="icon-confirmation bi bi-telephone"></i><b> Phone: </b>{props.phone} </p>
        </div>
        <div id="right">
          <h1> Check Out </h1>
          <p> Balance $ {props.balance}USD</p>
          <p> Payment Approved:  {paymentApproved ? "True" : "False"}</p>
          <button onClick={()=> setPaymentApproved(!paymentApproved)}> Pay Now</button>
        </div>
    </div>
    </div>
  )
}

export default Booking
