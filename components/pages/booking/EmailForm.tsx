import { useBooking } from './BookingContext'
import { useEffect, useState } from 'react'

const EmailForm = () => {
  const { email, setEmail } = useBooking()
  const [isValidEmail, setIsValidEmail] = useState(false)

  useEffect(() => {
    const emailInput = document.getElementById(
      'email',
    ) as HTMLInputElement | null
    if (emailInput) {
      setIsValidEmail(emailInput.checkValidity())
    }
  }, [email])

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <input
        type="email"
        id="email"
        className="border-none text-black placeholder:text-[#808080] text-center min-w-full"
        placeholder="Enter your email"
        value={email}
        autoComplete="off"
        pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  )
}

export default EmailForm
