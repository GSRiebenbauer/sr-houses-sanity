'use client'

import { useState } from 'react'
import CalenderForm from './CalenderForm'
import { BookingProvider, useBooking } from './BookingContext'
import Dates from './Dates'
import Buttons from './Buttons'
import BookingInterface from './BookingInterface'

const BookingPageContent = ({ data }) => {
  return (
    <BookingProvider>
      <BookingInterface data={data} />
    </BookingProvider>
  )
}

export default BookingPageContent
