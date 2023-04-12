import React from 'react'
import imgInfo from '../images/information.png'

function information() {
  return (
    <div className='wrapper-information'>
        <div id="left">
            <img src={imgInfo} />
        </div>
        <div id="right">
            <h2>Deluxe Vacation </h2>
            <h2>Rentals Made Easy</h2>
            <p>Our entire process is designed to be a stress-free experience. Simply choose your location, then use our integrated booking system to select the dates of your stay, and then, just relax and we’ll take care of the rest.</p>
            <a href='/contact'> <button className='generalBtn'> See More </button> </a>
        </div>
    </div>
  )
}

export default information
