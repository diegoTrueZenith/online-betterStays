import React, { useState, useEffect } from 'react'
import Calendar from "react-calendar";
import { listings } from './data.js';
import { FaDoorOpen, FaToilet } from "react-icons/fa";

function Booking(props) {

    let [selectedID, setSelectedID] = useState(props.id);
    // let [property, setProperty] = useState();

const [searchDate, setSearchDate] = useState();
let [imgToShow, setImgToShow] = useState(0);
let images = [
  'https://res.cloudinary.com/dxfi1vj6q/image/upload/v1669395666/df3f16b7-6626-49a2-9be9-8b0af744f22d_w52mkn.webp', 
  'https://res.cloudinary.com/dxfi1vj6q/image/upload/v1669232667/theBetterStay/Properties/r-architecture-T6d96Qrb5MY-unsplash_ngbrwz.jpg', 
  'https://res.cloudinary.com/dxfi1vj6q/image/upload/v1669660966/r-architecture-WQCkior21Gc-unsplash_1_l3zgel.jpg', 
  'https://res.cloudinary.com/dxfi1vj6q/image/upload/v1669232667/theBetterStay/Properties/r-architecture-0tKCSyLXqQM-unsplash_uwi8gz.jpg'
];

let property = listings[0].results[selectedID];


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

    let amenities = [];
    for (let i = 0; i < property.amenities.length; i++) {
        amenities.push(property.amenities[i]);
    }
    let myMap = [];
    for (const [key, value] of Object.entries(amenities)) {
      myMap.push(
        <div className='amenities'>{value}</div>
      )
    }


    let pictures = [];
    for (let i = 0; i < property.pictures.length; i++) {
        pictures.push(property.pictures[i].original);
    }
    let listImages = [];
    for (const [key, value] of Object.entries(pictures)) {
      listImages.push(
        <img onMouseOver={()=>setImgToShow(key)} src={value} />
      )
    }

    useEffect(()=>{
        setSelectedID(props.id);
    })


  return (
    <div className='wrapper-booking'>
        <button className='btnClose' onClick={()=>props.changeVisibility()}> <i className="bi bi-x-lg"></i> </button>
        <div id="left">
            <h3> Book Now </h3>
            <Calendar
                onActiveStartDateChange={(e) => setSearchDate(e.activeStartDate)}
                className="calendar"
                minDate={new Date()}
                selectRange={true}
            ></Calendar>
            <div className='form'>
                <h2> Contact Information:</h2>
                <input type='text' placeholder='First Name' />
                <input type='text' placeholder='Last Name' />
                <input type='text' placeholder='Phone' />
                <input type='text' placeholder='Email Address'/>
            </div>    
            <div className='bookingConfirmation'>
                <h2> Confirm your information: </h2>
                <p>Check-In:</p>
                <p>Check-Out: </p>
                <p>Full Name: </p>
                <p>Phone:</p>   
                <p>Email:</p>
                <p>Total:</p>
            </div>
            <button className='btnForm'> Continue </button>
        </div>
        <div id="right">
            <img src={pictures[imgToShow]} />
            <div className='galery'>
                {listImages}
            </div>
            <h3> {property.nickname}</h3>
            <p className="address"> <i className="bi bi-geo-alt"></i> {property.address.full}</p>
            <p> {property.publicDescription.summary} </p>
            <div className="capacities">
                <p> <FaDoorOpen className="icon"/> {property.bedrooms} bedrooms  </p>
                <p> <FaToilet className="icon"/> {property.bathrooms} bathrooms </p>
            </div>
            <iframe src={'http://tecnodael.com/MapsAPI/?from='+property.address.lat+','+property.address.lng} />
            <h2> Amenities Included: </h2>
            <div className='allAmenities'>
                {myMap}
            </div>
        </div>
    </div>
  )
}

export default Booking
