import { useBooking } from './BookingContext'

const NameForm = () => {
  const { name, setName } = useBooking()

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <input
        type="text"
        id="name"
        className="border-none text-black placeholder:text-[#808080] text-center min-w-full"
        placeholder="Enter your name"
        value={name}
        autoComplete="off"
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  )
}

export default NameForm
