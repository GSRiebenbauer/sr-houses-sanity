import { useBooking } from './BookingContext'
import { useRouter } from 'next/navigation'

const ThankYou = () => {
  const { arrivalDate, departureDate, name, email, message, guestsNumber } =
    useBooking()
  const router = useRouter()

  return (
    <div
      onClick={() => router.push('/')}
      className="w-full flex flex-col items-center justify-center p-4 cursor-pointer rounded-lg"
    >
      <div>
        <span className="text-6xl mb-4">Sent</span>
      </div>
    </div>
  )
}

export default ThankYou
