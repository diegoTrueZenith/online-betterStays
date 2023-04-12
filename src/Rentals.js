import React, { useEffect, useState } from "react";
import Booking from "./components/Booking";
import { listings } from './components/data.js';
import { FaDoorOpen, FaToilet } from "react-icons/fa";
function Rentals() {

  const [selectedID, setSelectedID] = useState(1);
  const [showBooking, setShowBooking] = useState(false);
  const [property, setProperty] = useState();

  const [myListings, setMyListings] = useState([])
  const house = [
    {
      "id": 0,
      "name": "Mario's Pad",
      "description": "Get ready to put on those iconic overalls & jump right into the experience at Mario’s Pad. The immersive gaming experience is setup with the finest of details, from decorations, bedding, to gaming. Enjoy this 4-bed gem with Freeplay arcade, spa room, & pool! Easy highway access & 5 min ride to Midway / 30 min ride to O’Hare make this a convenient location for weary travelers. Those looking to explore downtown Chicago have a short train or car ride. This one-of-a-kind themed house has everything.",
      "notes": "Ring door bell at front of property and at side gate facing away from property. One exterior camera at back gate - does not face pool, hot tub, or picnic table.",
      "place": "Chicago, IL",
      "price": 45600,
      "images": [
        {
          "id":0,
          "url": "https://res.cloudinary.com/dxfi1vj6q/image/upload/v1669395666/df3f16b7-6626-49a2-9be9-8b0af744f22d_w52mkn.webp",
          "description": "New Big Buck Hunter, New 2021 Golden Tee, New Dart Machine, Three Pinball Machines & Much More!",
          "width": 1200,
          "height": 802
        }
      ],
      "allowsPets": false,
      "amenities": [
        {
          "type": "Internet and office",
          "icon": "wifi",
          "label": "Fast wifi – 673 Mbps"
        },
        { "type": "Kitchen and dining", "icon": "kitchen", "label": "Kitchen" },
        {
          "type": "Kitchen and dining",
          "icon": "fridge",
          "label": "Refrigerator"
        },
        {
          "type": "Parking and facilities",
          "icon": "parking",
          "label": "Free residential garage on premises – 1 space"
        },
        {
          "type": "Parking and facilities",
          "icon": "pool",
          "label": "Private outdoor pool - available seasonally, open 24 hours, heated, pool toys"
        },
        {
          "type": "Parking and facilities",
          "icon": "hot-tub",
          "label": "Private hot tub - available all year, open 24 hours"
        },
        {
          "type": "Entertainment",
          "icon": "tv",
          "label": "75\" HDTV with Amazon Prime Video, Fire TV"
        },
        {
          "type": "Bedroom and laundry",
          "icon": "washer",
          "label": "Free washer – In unit"
        },
        {
          "type": "Bedroom and laundry",
          "icon": "dryer",
          "label": "Free dryer – In unit"
        },
        {
          "type": "Heating and cooling",
          "icon": "ac",
          "label": "Central air conditioning"
        },
        {
          "type": "Home safety",
          "icon": "camera",
          "label": "Security cameras on property"
        }
      ],
      "rooms": [
        {
          "id": 0,
          "type": "bedroom",
          "name": "Main bedroom",
          "beds": [
            {
              "type": "king",
              "quantity": 2
            },
            {
              "type": "sofa",
              "quantity": 1
            }
          ]
        },
        {
          "id": 1,
          "type": "bedroom",
          "name": "Bedroom 2",
          "beds": [
            {
              "type": "king",
              "quantity": 1
            }
          ]
        },
        {
          "id": 2,
          "type": "bedroom",
          "name": "Bedroom 3",
          "beds": [
            {
              "type": "king",
              "quantity": 1
            }
          ]
        },
        {
          "id": 3,
          "type": "bedroom",
          "name": "Bedroom 4",
          "beds": [
            {
              "type": "king",
              "quantity": 1
            }
          ]
        }
      ]
    }
  ]
  
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


  useEffect(() => {
    console.log(listings[0].results);
    setMyListings(listings[0].results);
   }, []);


  return (
    <div className="wrapper-properties">
       
    {Object.keys(myListings).map((key) => {
        const { _id, pictures, nickname, address, publicDescription, bedrooms, bathrooms } = myListings[key];
        return (
          <div key={key}>
            <div className="property">
              <img src={pictures[0].original} />
              <p className="nickname"> {nickname} </p>
              <p className="address"> <i className="bi bi-geo-alt"></i> {address.city}, {address.state}</p>
              <p className="description"> {publicDescription.summary.slice(0, 200)}... </p>
              <div className="capacities">
                <p> <FaDoorOpen className="icon"/> {bedrooms} bedrooms  </p>
                <p> <FaToilet className="icon"/> {bathrooms} bathrooms </p>
              </div>
              <button onClick={()=> showProperty( key)}> View Property </button>
            </div>
          </div>
        );
      })} 


      <div id="booking" style={{display: showBooking ? "block" : "none"}}>
          <Booking id={selectedID} changeVisibility={()=>setShowBooking(!showBooking)}/>
      </div>
    </div>
  );
}

export default Rentals;
