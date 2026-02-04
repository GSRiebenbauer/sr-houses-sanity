'use client'
import { client } from '@/sanity/lib/client'

const pad = (n: number) => n.toString().padStart(2, '0')
const formatDate = (date: Date) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

interface BookingData {
  arrivalDate: Date
  departureDate: Date
  name: string
  email: string
  message: string
  guestsNumber: number
}

export const requestBooking = async ({
  arrivalDate,
  departureDate,
  name,
  email,
  message,
  guestsNumber,
}: BookingData) => {
  const arrivalFormatted = formatDate(arrivalDate)
  const departureFormatted = formatDate(departureDate)

  // Create booking in Sanity
  await client.create({
    _type: 'booking',
    bookingSummary: `Arrival: ${arrivalFormatted}
Departure: ${departureFormatted}

Name: ${name}
Email: ${email}
Persons: ${guestsNumber}

Message:
${message}`,
    from: arrivalFormatted,
    to: departureFormatted,
    name,
    email,
    persons: guestsNumber,
    message,
    status: 'confirmed',
  })

  // Send email via Resend API
  const response = await fetch('/api/sendMail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      guestName: name,
      guestEmail: email,
      checkinDate: arrivalFormatted,
      checkoutDate: departureFormatted,
      numberOfGuests: guestsNumber,
      guestMessage: message,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to send booking email')
  }

  return response.json()
}
