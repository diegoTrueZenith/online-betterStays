import React, { useEffect, useState } from "react";
import { getData } from "./components/data";
import { getCalendar } from "./components/data";
import { FaDoorOpen, FaToilet ,FaUsers} from "react-icons/fa";
import Calendar from "react-calendar";
import Form from "./components/Form.js";
import Map from "./components/Map";


function Property(props) {
  const [selectedID, setSelectedID] = useState();
  const [myListings, setMyListings] = useState([]);
  const [property, setProperty] = useState();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [searchDate, setSearchDate] = useState();
  const [imgToShow, setImgToShow] = useState(0);

  const [amenities, setAmenities] = useState(null);
  const [pictures, setPictures] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState(null);

  const [propertyID, setPropertyID] = useState(null);

  let amenitiesMap = [];
  let picturesMap = [];


  useEffect(()=>{
    const searchParams = new URLSearchParams(window.location.search);
    setSelectedID(searchParams.get("id"));  
  },[])


  useEffect(() => {
    if(!propertyID){
      setPropertyID(null);
    getData().then((result) => {
      console.log(' ======= GETTING DATA =======');
      console.log(result.data.results[selectedID]);
      setProperty(result.data.results[selectedID]);
      setPictures(property.pictures);
      setAmenities(property.amenities);
      setPropertyID(property._id);
    }); 
    } else {
      getCalendar(propertyID).then((result) => {
        console.log("======== HERE IS THE CALENDAR FROM: " + propertyID);
        console.log(result);
        setUnavailableDates(result.data.data.days)
      });
    }
  });

 



  // STORING -> MAPPING AMENITIES
  if(!amenities){
    return <div>Loading...</div>;
  } else {  
    for (const [key, value] of Object.entries(amenities)) {
      amenitiesMap.push(<div className="amenities">{value}</div>);
    }
  }
  // STORING -> MAPPING PICTURES
  if(!pictures){
    return <div>Loading...</div>;
  } else {
    for (const [key, value] of Object.entries(pictures)) {
      // picturesMap.push( <img onMouseOver={() => setImgToShow(key)} src={pictures[key].original}/>);
      picturesMap.push( <img src={pictures[key].original}/>);
    }
  }



  let disabledDates = [];
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
  function isDateDisabled(date) {
    return disabledDates.some(disabledDate => 
      disabledDate.getDate() === date.getDate() &&
      disabledDate.getMonth() === date.getMonth() &&
      disabledDate.getFullYear() === date.getFullYear()
    );
  }
  // STORING -> UNAVAILABLE DATES
  if(!unavailableDates){
    return <div>Loading...</div>;
  } else {
    for (const [key, value] of Object.entries(unavailableDates)) {
      if(unavailableDates[key].status == "unavailable"){
        unavailbleDates(unavailableDates[key].date);
      }
    }
  }
  //STORING UNAVAILABLE DATES
  function unavailbleDates(unavailbleDay) {
    let date = unavailbleDay.split("-");
    disabledDates.push(new Date(date[0], parseInt(date[1]) - 1, date[2]));
  }


  return (
    <div>
      {property ? (
        <div className="wrapper-booking">
          <div id="left">
            <div className="pictures">
                <img src={property.pictures[imgToShow].original} />
                <div className="galery">{picturesMap}</div>
            </div>

            <h3 className="nickname"> {property.nickname} - {property.title}</h3>
            <p className="address"> <i className="bi bi-geo-alt"></i> {property.address.city}, {property.address.state}</p>
            <p> {property.publicDescription.summary} </p>
            <div className="capacities">
              <p>
                <FaUsers className="icon" /> {property.accommodates} people{" "}
              </p>
              <p>               
                <FaDoorOpen className="icon" /> {property.bedrooms} bedrooms{" "}
              </p>
              <p>
                <FaToilet className="icon" /> {property.bathrooms} bathrooms{" "}
              </p>
            </div>
            <Map title={property.nickname} lat={property.address.lat} long={property.address.lng}/>
            <h2> Amenities Included: </h2>
            <div className="allAmenities">{amenitiesMap}</div>
          </div>
          <div id="right">
            <h3> Book Now </h3>
            <Calendar
                 onActiveStartDateChange={(e) => setSearchDate(e.activeStartDate)}
                 className="calendar"
                 minDate={new Date()}
                 selectRange={true}
                 onChange={onDateSelected}
                   // //DISABLE DATES
                tileDisabled={({date, view}) => 
                view === 'month' && // Only disable dates in month view
                isDateDisabled(date) // Call isDateDisabled function to check if date should be disabled
              }
             ></Calendar>
            <Form checkIn={checkIn} checkOut={checkOut} />
            <button className="btnForm"> Continue </button>
        </div>
    </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Property;
