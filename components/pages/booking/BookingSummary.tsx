import { useBooking } from './BookingContext'

const BookingSummary = () => {
  const { arrivalDate, departureDate, name, email, message, guestsNumber } =
    useBooking()

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 rounded-lg">
      <div>
        <span className="font-bold mb-4">Booking Summary</span>
        <ul className="text-left ">
          <li className="border-b border-black  py-2 min-w-[350px] flex justify-between  ">
            <span>From</span>{' '}
            {arrivalDate ? arrivalDate.toDateString() : 'Not set'}
          </li>
          <li className="border-b border-black  min-w-[350px] flex justify-between  py-2">
            <span>To</span>{' '}
            {departureDate ? departureDate.toDateString() : 'Not set'}
          </li>
          <li className="border-b border-black  min-w-[350px] flex justify-between  py-2">
            <span>Name</span> {name || 'Not set'}
          </li>
          <li className="border-b border-black  min-w-[350px] flex justify-between py-2 ">
            <span>Email</span> {email || 'Not set'}
          </li>
          <li className="border-b border-black  min-w-[350px] flex justify-between py-2  ">
            <span>Persons</span>{' '}
            {guestsNumber !== null ? guestsNumber : 'Not set'}
          </li>
          <li className="border-b border-black py-2 min-w-[350px] flex justify-between last:border-b-0">
            <span>Message</span>{' '}
            {message ? `${message.slice(0, 20)}...` : 'Not set'}
          </li>
        </ul>
      </div>
      {/* <div className="text-left w-fit">
        {' '}
        <h2 className="font-bold mb-4">Booking Summary</h2>
      </div> */}
    </div>
  )
}

export default BookingSummary
