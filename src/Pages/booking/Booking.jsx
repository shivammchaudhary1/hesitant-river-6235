import React from 'react'
import './Booking.Module.css'

import { BookingDetails } from './bookingDetails'
import { Cart } from './Cart'


export const Booking = () => {
  return (
    <div className="booking">
      
        <h1>
            Complete your Booking Process ...
        </h1>


<div>
<Cart/>
<BookingDetails/>
</div>
<Cart/>

    </div>
  )
}