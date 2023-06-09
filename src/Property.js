import React, { useEffect, useState } from "react";
import { getData } from "./components/data";
import { getCalendar } from "./components/data";
import { FaDoorOpen, FaToilet ,FaUsers} from "react-icons/fa";
import Calendar from "react-calendar";
import Form from "./components/Form.js";
import Map from "./components/Map";
import Loader from "./components/Loader";


function Property(props) {
  const [selectedID, setSelectedID] = useState(null);
  const [property, setProperty] = useState();
  const [propertyID, setPropertyID] = useState();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [searchDate, setSearchDate] = useState();
  const [imgToShow, setImgToShow] = useState(0);
  const [amenities, setAmenities] = useState(null);
  const [pictures, setPictures] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const [propertyName, setPropertyName] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [scroll, setScroll] = useState(true);
  const [balance, setBalance] = useState(0);
  const [balances, setBalances] = useState([]);


  useEffect(()=>{
      const searchParams = new URLSearchParams(window.location.search);
      setSelectedID(searchParams.get("id"));  
      if(selectedID == null){
        console.log("Reading ID ...");
      } else {
        // console.log("Fetching Data Property: " + selectedID);
        fetchData();
      }
  },[selectedID])


  //FUNCTION TO FORMAT DATE YYYY-MM-DD
  const formatDate = (range) => {
    const year = range.getFullYear();
    const month = String(range.getMonth() + 1).padStart(2, '0');
    const day = String(range.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };


  // CALLING THE API TO FETCH THE PROPERTY DATA
  // let selectedProperty;
  // async function fetchData() {
  //   try {
  //     await fetch('https://api-token-diegotruezenith.vercel.app/api/guestyProperties')
  //     .then(response => response.json())
  //     .then(data => selectedProperty = data);
  //     let property = selectedProperty.data.results[selectedID]
  //     setProperty(selectedProperty.data.results[selectedID]);
  //     setPictures(property.pictures);
  //     setAmenities(property.amenities);
  //     setPropertyID(property._id);
  //     fetchCalendar(property._id);
  //   } catch (error) {
  //     console.error(error);
  //   } 
  // }


  async function fetchData(){

      let myProperty;
      await fetch('https://api-token-diegotruezenith.vercel.app/api/guestyProperties')
      .then(response => response.json())
      .then(response => myProperty = response.response.results[selectedID])
      .then(response => setProperty(response.response.results[selectedID]))
    
      console.log(myProperty.pictures);
      // setPictures(myProperty.pictures);
      // setAmenities(property.amenities);
      // setPropertyID(property._id);
      // fetchCalendar(property._id);
  }

  // CALLING THE API TO FETCH THE DATES
  let calendar;
  async function fetchCalendar(id) {
    try {
      const response = await fetch('https://api-token-diegotruezenith.vercel.app/api/guestyCalendar',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          propertyID: id,
        })
      });
      calendar = await response.json();
      let fetchedID = calendar.data.data.days[0].listingId
      if(id == fetchedID){
        setUnavailableDates(calendar.data.data.days)
        setShowCalendar(true);
      } else {
        setTimeout(() => {
          fetchCalendar(id);
        }, 1000);
      }

    } catch (error) {
      console.error(error);
    } 
  }

  // CALLING API TO FETCH THE BALANCES
  async function fetchBalance(id) {
    let dates;
    let balances = [];
    try {
      const response = await fetch('https://api-token-diegotruezenith.vercel.app/api/guestyCalendar',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          propertyID: id,
        })
      });
      dates = await response.json();
      let totBalance = 0;
      dates.data.data.days.forEach((date) => {
        if(selectedDates.includes(date.date)){
          totBalance = totBalance + date.price
          balances.push({ date: date.date, price: date.price});
        }
      })
      // console.log(balances);
      setBalances(balances)
      setBalance(totBalance);
    } catch (error) {
      console.error(error);
    } 
  }

  // STORING -> MAPPING AMENITIES
  let amenitiesMap = [];
  if(!amenities){
    return ;
  } else {  
    for (const [key, value] of Object.entries(amenities)) {
      amenitiesMap.push(<div className="amenities" key={key}>{value}</div>);
    }
  }
  // STORING -> MAPPING PICTURES
  let picturesMap = [];
  if(!pictures){
    return ;
  } else {
    for (const [key, value] of Object.entries(pictures)) {
      picturesMap.push(<img  key={key} onMouseOver={() => setImgToShow(key)} src={pictures[key].original}/>);
    }
  }

  //  WHEN DATES ARE SELECTED
  let disabledDates = [];
  const onDateSelected = (range) => {
    setCheckIn(formatDate(range[0]));
    setCheckOut(formatDate(range[1]));
    balancingDates(range[0], range[1]);
    function balancingDates(start, end){
      const currentStart = new Date(start);
      const newStart = new Date();
      newStart.setDate(currentStart.getDate() + 1);
      // console.log(newStart);
    
      const currentEnd = new Date(end);
      const newEnd = new Date();
      newEnd.setDate(currentEnd.getDate() + 1);
      // console.log(newEnd);
    
      getBalance(formatDate(newStart), formatDate(newEnd));
    }
  };
  function isDateDisabled(date) {
    return disabledDates.some(disabledDate => 
      disabledDate.getDate() === date.getDate() &&
      disabledDate.getMonth() === date.getMonth() &&
      disabledDate.getFullYear() === date.getFullYear()
    );
  }

  //GETTING FINAL BALANCE OF THE SELECTED DATES
  let selectedDates = [];
  function getBalance(start, end){
    console.log("Start: " + start);
    console.log("End: " + end);
    const dates = [];
    let currentDate = new Date(start);
    let endDate = new Date(end);
  
    //GETTING DATES BETWEEN START AND END
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    //PUSHING EACH DAY INTO THE ARRAY
    dates.forEach((date) => {
      selectedDates.push(date.toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}));
    });
    
    // CALLING THE FUNCTION TO GET TOTAL BALANCE
    fetchBalance(propertyID);
  }

  //STORING -> UNAVAILABLE DATES
  if(!unavailableDates){
    return <Loader/>
  } else {
    // console.log("storing unavailable dates");
    for (const [key, value] of Object.entries(unavailableDates)) {
      if(unavailableDates[key].status == "unavailable" || unavailableDates[key].status == "booked"){
        let unavailbleDay = unavailableDates[key].date
        let date = unavailbleDay.split("-");
        disabledDates.push(new Date(date[0], parseInt(date[1]) - 1, date[2]));
      }
    }
  }

  return (
    <div style={{overflowY:"hidden"}}>
      {property ? (
        <div className="wrapper-booking" >
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
            <div className="calendar-loader" style={{display: showCalendar? "none" : "block"}}>
              <p> Loading ... </p>
            </div>
            <div style={{display: showCalendar? "block" : "none"}}>
            <Calendar
                 onActiveStartDateChange={(e) => setSearchDate(e.activeStartDate)}
                //  onViewChange={nextMonth()}
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
             </div>
            <Form 
              checkIn={checkIn} 
              checkOut={checkOut} 
              selectedDates={selectedDates}
              balance={balance}
              balances={balances}
              propertyID={property._id}
              propertyName={property.nickname} 
              propertyTitle={property.title}
              propertyPicture={property.pictures[0].original} 
              showPopUp={()=>setScroll(false)}
            />
          </div>
        </div>
      ) : (
        <div> Loading Data ... </div>
      )}
    </div>
  );
}
export default Property;
