import React, { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Information from './components/Information.js'
import SliderReview from './components/SliderReview'
import { getData } from './components/data';

import { FaDoorOpen, FaToilet } from "react-icons/fa";



function Home() {

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
    fetch('https://api-token-diegotruezenith.vercel.app/api/guestyProperties')
    .then(response => response.json())
    .then(response => setMyListings(response.response.results))
    // console.log(myListings);
  }, [])



  return (
    <div>
        <Hero />

        <div className="carousel">
          {Object.keys(myListings).map((key) => {
            const { _id, pictures, nickname, address, publicDescription, bedrooms, bathrooms, prices } = myListings[key];
            return (
              <div key={key}>
                <div className="property">
                  <img src={pictures[0].original} />
                  <div className="name-price">
                    <p className="nickname"> {nickname} </p>
                    <p className="price"> From ${prices.basePrice} USD</p>
                  </div>
                  <p className="address"> <i className="bi bi-geo-alt"></i> {address.city}, {address.state}</p>
                  {/* <p className="description"> {publicDescription.summary.slice(0, 200)}... </p> */}
                  <div className="capacities">
                    <p> <FaDoorOpen className="icon"/> {bedrooms} bedrooms  </p>
                    <p> <FaToilet className="icon"/> {bathrooms} bathrooms </p>
                  </div>
                  <a href={"/property?id=" + key}> <button> View Property </button> </a>
                </div>
              </div>
            );
          })} 
        </div>




        <Information />
        <SliderReview />
        <div className='wrapper-whyRecommend'>
          <div>
            <h2> Why People Recommend The Better Stay </h2>
            {/* <p> At The Better Stay properties, we provide a level of comfort and relaxation that is difficult to find in a typical hotel or vacation rental. Our homes offer high-end furnishings, top-of-the-line appliances, and other amenities that can make a vacation feel truly indulgent and luxurious. You and your family deserve it!</p> */}
          
            <h3> State-Of-The-Art Entertainment </h3>
            <p className='why'> From indoor pools and hot tubs, to large flat screen TV’s and arcade game rooms, our homes offer stays unlike any other out there. The entertainment that you will experience at The Better Stay is truly unlike any other. </p>
            <h3> High-End & Luxurious </h3>
            <p className='why'> Nothing says luxury like being able to walk into a home and it’s clean, tidy, and spacious. We take pride in our homes, and ensure that they are in an immaculate condition when you arrive. Every piece of furniture was selected to ensure comfort and luxury. We offer all of this without breaking the bank.</p>
            <h3> Perfect For Families </h3>
            <p className='why'> There is something truly special about getting away with your family. Where a hotel separates you from the family experience, our homes bring you closer together with shared spaces to create great memories. Book today to give your family the vacation of a lifetime! </p>          
          
          
          </div>
          <div>
            <img src='https://res.cloudinary.com/dxfi1vj6q/image/upload/v1669660966/r-architecture-WQCkior21Gc-unsplash_1_l3zgel.jpg'  />
          </div>
          
        </div>
    </div>
  )
}

export default Home
