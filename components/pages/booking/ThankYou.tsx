import { useBooking } from './BookingContext'

const ThankYou = () => {
  const { arrivalDate, departureDate, name, email, message, guestsNumber } =
    useBooking()

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 rounded-lg">
      <div>
        <span className="text-6xl mb-4">Sent</span>
      </div>
    </div>
  )
}

export default ThankYou
