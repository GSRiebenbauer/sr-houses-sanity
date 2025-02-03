import { useBooking } from './BookingContext'

const GuestsForm = () => {
  const { guestsNumber, setGuestsNumber } = useBooking()

  const handleSelect = (value: number) => {
    setGuestsNumber(value)
  }

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4">
      <span className="text-lg font-medium">Adults and children</span>
      <div className="w-full overflow-x-scroll">
        <div className="grid grid-cols-8 justify-items-center	 sm:flex sm:justify-center sm:space-x-2 px-5 lg:px-0 ">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              className={`col-span-2 w-12 h-12 shrink-0 rounded-full border-none hover:bg-black hover:text-white ${
                guestsNumber === number ? 'bg-black text-white' : 'text-black'
              } flex items-center justify-center`}
              onClick={() => handleSelect(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GuestsForm
