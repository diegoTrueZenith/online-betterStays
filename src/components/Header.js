import React from 'react'
import { Link } from 'react-router-dom'

function Header() {

  return (
    <div className='wrapper-header'>
       <img src="https://res.cloudinary.com/dxfi1vj6q/image/upload/v1669228061/theBetterStay/Amarillo_kxcydh.png" />
       <div className='menu'>
        <a href='/'>        <button> Home      </button>  </a>
        <a href='/rentals'> <button> Rentals   </button>  </a>
        <a href='/contact'> <button> Services  </button>  </a>
        <a href='/contact'> <button> Contact   </button> </a>
        <a href='/contact'> <button> Login    </button> </a>
       </div>
    </div>
  )
}
export default Header
