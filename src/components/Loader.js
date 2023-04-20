import React from 'react'

function Loader() {
  return (
    <div className='wrapper-loader'>
        <div className='bouncingCalendar'>
            <i className="calendarIcon bi bi-calendar4-week"></i>
        </div>
        
        <h2> Loading Dates ...</h2>
        <div className="loading-bar">
            <div className="loading-bar-progress"></div>
        </div>
    </div>
  )
}

export default Loader
