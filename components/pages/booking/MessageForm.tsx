import { useBooking } from './BookingContext'

const MessageForm = () => {
  const { message, setMessage } = useBooking()

  return (
    <div className="w-full flex flex-col items-center translate-y-[28px] justify-center">
      <textarea
        id="message"
        className="border-none text-black placeholder:text-[#808080] text-center resize-none"
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        autoComplete="off"
        cols={50}
      />
    </div>
  )
}

export default MessageForm
