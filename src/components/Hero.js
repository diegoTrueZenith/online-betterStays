import React from 'react'
import { useState, useEffect } from 'react';

function Hero() {

    let [imgToShow, setImgToShow] = useState(0);
    let images = ['https://res.cloudinary.com/dxfi1vj6q/image/upload/v1669395666/df3f16b7-6626-49a2-9be9-8b0af744f22d_w52mkn.webp', 
    'https://res.cloudinary.com/dxfi1vj6q/image/upload/v1669232667/theBetterStay/Properties/r-architecture-T6d96Qrb5MY-unsplash_ngbrwz.jpg', 
    'https://res.cloudinary.com/dxfi1vj6q/image/upload/v1669660966/r-architecture-WQCkior21Gc-unsplash_1_l3zgel.jpg', 
    'https://res.cloudinary.com/dxfi1vj6q/image/upload/v1669232667/theBetterStay/Properties/r-architecture-0tKCSyLXqQM-unsplash_uwi8gz.jpg'];
  
    const nextImg = () => {
      if(imgToShow == images.length-1){
        setImgToShow(0)
      } else {
        setImgToShow(imgToShow + 1)
      }
    }
    const prevImg = () => {
      if(imgToShow == 0){
        setImgToShow(images.length-1)
      } else {
        setImgToShow(imgToShow - 1)
      }
    }


    const divStyle = {
        backgroundImage: `url(${images[imgToShow]})`,
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
  return (
    <div className='wrapper-hero' style={divStyle}>
        <h2> Mario's Pad </h2>
        <p> Arcade, Spa, Pool.</p>
        <div className='navigation'>
            <button onClick={()=> prevImg()}> <i className="bi bi-arrow-left-circle"></i></button>
            <button onClick={()=> nextImg()}> <i className="bi bi-arrow-right-circle"></i></button>
        </div>
  
    </div>
  )
}

export default Hero
