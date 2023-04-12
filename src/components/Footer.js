import React from 'react'

function Footer() {
  return (
    <div className='wrapper-footer'>
      <div>
        <img src="https://res.cloudinary.com/dxfi1vj6q/image/upload/v1669228061/theBetterStay/Monotono_ymgckn.png"></img>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique amet consectetur adipisicing elit. Similique. Lorem ipsum dolor sit. </p>
        <div className='newsLetter'>
            <input type='text' placeholder='email@exmaple.com'></input>
            <button> Submit </button>
        </div>
        <p id="noSpam"> *Get the lastest information and deals by just signing up your email with us. No Spam Btw. </p>
      </div>
      <div id="right">
        <div>
            <p> Company </p>
            <button> Home </button>
            <button> Rentals </button>
            <button> Services </button>
            <button> Contact Us </button>
        </div>
        <div>
            <p> Support </p>
            <button> Questions </button>
            <button> Terms & Conditions </button>
            <button> Help </button>
        </div>
        <div>
            <p> Other </p>
            <button> Lorem </button>
            <button> Ipsum </button>
            <button> Lorem </button>
            <button> Ipsum </button>
        </div>
      </div>
    </div>
  )
}

export default Footer
