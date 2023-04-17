import React, { useState, useEffect } from 'react'
import Calendar from "react-calendar";
import { FaDoorOpen, FaToilet } from "react-icons/fa";
// import { getData } from '../components/data';
import Form from './Form.js';

function Booking(props) {

  const [selectedID, setSelectedID] = useState(props.id);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [searchDate, setSearchDate] = useState();
  const [imgToShow, setImgToShow] = useState(0);

  // const [myListings, setMyListings] = useState([])



  let property = props.properties[selectedID];
    
  let amenitiesMap = [];
  let picturesMap = [];

  // MAPING AMENITIES
  // for (const [key, value] of Object.entries(property.amenities)) {
  //   amenitiesMap.push(<div className='amenities'>{value}</div>)
  // }
  // MAPING PICTURES
  // for (const [key, value] of Object.entries(property.pictures)) {
  //   picturesMap.push(<img onMouseOver={()=>setImgToShow(key)} src={property.pictures[key].original} />)
  // }

  //  WHEN DATES ARE SELECTED
  const onDateSelected = (range) => {
    const formatDate = (range) => {
      const year = range.getFullYear();
      const month = String(range.getMonth() + 1).padStart(2, '0');
      const day = String(range.getDate()).padStart(2, '0');
      return `${year}/${month}/${day}`;
    };
    setCheckIn(formatDate(range[0]));
    setCheckOut(formatDate(range[1]));
  };

  useEffect(()=>{
      setSelectedID(props.id);
      // console.log(props.properties);
  })

  return (
    // <div className='wrapper-booking'>
    //     <button className='btnClose' onClick={()=>props.changeVisibility()}> <i className="bi bi-x-lg"></i> </button>
    //     <div id="left">
    //         <h3> Book Now </h3>
    //         <Calendar
    //             onActiveStartDateChange={(e) => setSearchDate(e.activeStartDate)}
    //             className="calendar"
    //             minDate={new Date()}
    //             selectRange={true}
    //             onChange={onDateSelected}
    //         ></Calendar>
    //         <Form  checkIn={checkIn} checkOut={checkOut}/>
    //         <button className='btnForm'> Continue </button>
    //     </div>
    //     <div id="right">
    //         <img src={property.pictures[imgToShow].original} />
    //         <div className='galery'>
    //             {picturesMap}
    //         </div>
    //         <h3> {property.nickname}</h3>
    //         <p className="address"> <i className="bi bi-geo-alt"></i> {property.address.city}, {property.address.state} </p>
    //         <p> {property.publicDescription.summary} </p>
    //         <div className="capacities">
    //             <p> <FaDoorOpen className="icon"/> {property.bedrooms} bedrooms  </p>
    //             <p> <FaToilet className="icon"/> {property.bathrooms} bathrooms </p>
    //         </div>
    //         <iframe src={'http://tecnodael.com/MapsAPI/?from='+property.address.lat+','+property.address.lng} />
    //         <h2> Amenities Included: </h2>
    //         <div className='allAmenities'>
    //             {amenitiesMap}
    //         </div>
    //     </div>
    // </div>

    <div></div>
  )
}

export default Booking
