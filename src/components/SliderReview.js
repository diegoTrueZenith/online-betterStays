import React from 'react'

function SliderReview() {
  return (
    <div className='wrapper-reviews'>

        <div className='two-col'>
            <h3> What Our Customer Says About Us</h3>
            <p> At The Better Stay, we genuinely believe in overdelivering on value. That’s why we offer luxury, relaxation, and entertainment at affordable pricing. We have had more than 400 happy guests at our properties, and we look forward to serving your family too! </p>
        </div>

        <div className='three-col'>
        <div className='review'>
            <i className="icon-chating bi bi-chat-square-text-fill"></i>
            <p> The best Airbnb stay hands down. I rented this as a 4 day Thanksgiving retreat for me and my family after not seeing each other for a decade because of family drama. I thought this was the perfect choice because of all the fun family ... </p>
            <hr></hr>
            <div className='person-stars'>
                <p> Tifany Kuo </p>
                <p> ⭐️ ⭐️ ⭐️ ⭐️ ⭐️  </p>
            </div>
        </div>
        <div className='review'>
            <i className="icon-chating bi bi-chat-square-text-fill"></i>
            <p> Great home to stay at ! Felt just like home! Had everything you need! They put in all the little details that matter ! Very clean and cozy ! Kids loved the game room ! Adults loved the massage chairs ! Highly recommend! Tons of space for family and lots of parking spaces! </p>
            <hr></hr>
            <div className='person-stars'>
                <p> Tom Suffredin </p>
                <p> ⭐️ ⭐️ ⭐️ ⭐️ ⭐️  </p>
            </div>
        </div>
         <div className='review'>
            <i className="icon-chating bi bi-chat-square-text-fill"></i>
            <p> Great spot! Our kids had a blast with all the goodies in the garage. The golf bay and bubble hockey were favorites. There is an Infinity game table in the living room and the massage chairs in a separate room were a hit as well. </p>
            <hr></hr>
            <div className='person-stars'>
                <p> Jordan Wilson </p>
                <p> ⭐️ ⭐️ ⭐️ ⭐️ ⭐️  </p>
            </div>
        </div>

        </div>

    </div>
  )
}

export default SliderReview
