import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

// Define the context types
interface BookingContextType {
  arrivalDate: Date | null
  setArrivalDate: Dispatch<SetStateAction<Date | null>>
  departureDate: Date | null
  setDepartureDate: Dispatch<SetStateAction<Date | null>>
  error: string
  setError: Dispatch<SetStateAction<string>>
  currentDate: Date
  setCurrentDate: Dispatch<SetStateAction<Date>>
  currentStep: string
  setCurrentStep: Dispatch<SetStateAction<string>>
  name: string
  setName: Dispatch<SetStateAction<string>>
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  message: string
  setMessage: Dispatch<SetStateAction<string>>
  guestsNumber: number | null
  setGuestsNumber: Dispatch<SetStateAction<number | null>>
}

// Create the context with the proper type or null as the default value
const BookingContext = createContext<BookingContextType | null>(null)

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null)
  const [departureDate, setDepartureDate] = useState<Date | null>(null)
  const [error, setError] = useState<string>('')
  const [currentDate, setCurrentDate] = useState<Date>(
    new Date(new Date().getFullYear(), 6, 1),
  )
  const [currentStep, setCurrentStep] = useState<string>('1')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [guestsNumber, setGuestsNumber] = useState<number | null>(null)

  return (
    <BookingContext.Provider
      value={{
        arrivalDate,
        setArrivalDate,
        departureDate,
        setDepartureDate,
        error,
        setError,
        currentDate,
        setCurrentDate,
        currentStep,
        setCurrentStep,
        name,
        setName,
        email,
        setEmail,
        message,
        setMessage,
        guestsNumber,
        setGuestsNumber,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
