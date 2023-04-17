import React, { useEffect, useState } from "react";
import Booking from "./components/Booking";
import { getData } from './components/data';
import { FaDoorOpen, FaToilet } from "react-icons/fa";
function Rentals() {

  const [selectedID, setSelectedID] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [property, setProperty] = useState();

  const [myListings, setMyListings] = useState([])





  
  function showProperty(id) {
    setShowBooking(true);
    setSelectedID(id)
  }

  useEffect(()=>{
    if(showBooking){
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  },[showBooking])

  useEffect(()=> {
    getData().then((result) => {
      setMyListings(result.data.results);
      console.log(myListings);
    });
  })



  return (
    <div className="wrapper-properties">
       
    {Object.keys(myListings).map((key) => {
        const { _id, pictures, nickname, address, publicDescription, bedrooms, bathrooms, prices } = myListings[key];
        return (
          <div key={key}>
            <div className="property">
              <img src={pictures[0].original} />
              <div className="name-price">
                <p className="nickname"> {nickname} </p>
                <p className="price"> ${prices.basePrice} USD</p>
              </div>
              <p className="address"> <i className="bi bi-geo-alt"></i> {address.city}, {address.state}</p>
              <p className="description"> {publicDescription.summary.slice(0, 200)}... </p>
              <div className="capacities">
                <p> <FaDoorOpen className="icon"/> {bedrooms} bedrooms  </p>
                <p> <FaToilet className="icon"/> {bathrooms} bathrooms </p>
              </div>
              <a href={"/property?id=" + key}> <button> View Property </button> </a>
            </div>
          </div>
        );
      })} 


      {/* <div id="booking" style={{display: showBooking ? "block" : "none"}}>
          <Booking id={selectedID} changeVisibility={()=>setShowBooking(!showBooking)} properties={myListings}/>
      </div> */}
    </div>
  )
}

export default Rentals;
