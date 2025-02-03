import { useBooking } from './BookingContext'

const Buttons = () => {
  const {
    arrivalDate,
    departureDate,
    name,
    email,
    message,
    currentStep,
    setCurrentStep,
    guestsNumber,
  } = useBooking()

  const isNextDisabled = () => {
    if (currentStep === '1' && (!arrivalDate || !departureDate)) return true
    if (currentStep === '2' && !name) return true
    if (currentStep === '3') {
      const emailInput = document.getElementById(
        'email',
      ) as HTMLInputElement | null
      if (emailInput && !emailInput.checkValidity()) return true
    }
    if (currentStep === '4' && guestsNumber === null) return true
    if (currentStep === '5' && !message) return true
    return false
  }

  const handleNext = () => {
    if (!isNextDisabled()) {
      if (currentStep === '1' && arrivalDate && departureDate) {
        setCurrentStep('2')
      } else if (currentStep === '2' && name) {
        setCurrentStep('3')
      } else if (currentStep === '3' && email) {
        setCurrentStep('4')
      } else if (currentStep === '4' && guestsNumber !== null) {
        setCurrentStep('5')
      } else if (currentStep === '5' && message) {
        setCurrentStep('6')
      } else if (currentStep === '6') {
        setCurrentStep('7')
      }
    }
  }

  const handleBack = () => {
    if (currentStep !== '1') {
      setCurrentStep((prev) => (parseInt(prev) - 1).toString())
    }
  }

  return (
    <>
      <div
        className={`absolute right-5 lg:right-10 bottom-5 lg:top-1/2 lg:translate-y-[-50%] lg:bottom-auto w-fit ${
          isNextDisabled() ? 'text-[#d9d9d9]' : ' !text-black cursor-pointer'
        }`}
        onClick={handleNext}
      >
        <span className="text-4xl ">
          {currentStep === '6' ? (
            <span className="text-base lg:text-4xl">Request Booking</span>
          ) : currentStep === '7' ? null : (
            <span
              className={`text-base lg:text-4xl ${
                isNextDisabled()
                  ? 'text-[#d9d9d9]'
                  : ' !text-black cursor-pointer'
              }  `}
            >
              Next
            </span>
          )}
        </span>
      </div>

      <div
        className="w-fit absolute bottom-5 lg:top-1/2 left-5 lg:left-10 lg:bottom-auto lg:-translate-y-1/2 cursor-pointer"
        onClick={handleBack}
      >
        {currentStep !== '1' && currentStep !== '7' && (
          <span className="text-base lg:text-4xl ">Back</span>
        )}
      </div>

      <div className="w-fit absolute bottom-5 left-1/2 -translate-x-1/2">
        {currentStep === '7' ? (
          <span>Thanks, we will get back to you</span>
        ) : (
          <span>{currentStep}/7</span>
        )}
      </div>
    </>
  )
}

export default Buttons
