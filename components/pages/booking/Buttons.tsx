import { useBooking } from './BookingContext'
import { requestBooking } from './requestBooking'

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
    if (currentStep === '1') {
      if (!arrivalDate || !departureDate) return true
      const start = new Date(arrivalDate)
      const end = new Date(departureDate)
      const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      if (diffDays <= 4) return true
    }
    if (currentStep === '2' && !name) return true
    if (currentStep === '3') {
      const emailInput = document.getElementById('email')
      if (emailInput instanceof HTMLInputElement && !emailInput.checkValidity())
        return true
    }
    if (currentStep === '4' && guestsNumber === null) return true
    // Step 5 no longer requires a message, so it always returns false
    return false
  }

  const handleNext = async () => {
    if (!isNextDisabled()) {
      if (currentStep === '1' && arrivalDate && departureDate) {
        setCurrentStep('2')
      } else if (currentStep === '2' && name) {
        setCurrentStep('3')
      } else if (currentStep === '3' && email) {
        setCurrentStep('4')
      } else if (currentStep === '4' && guestsNumber !== null) {
        setCurrentStep('5')
      } else if (currentStep === '5') {
        setCurrentStep('6')
      } else if (currentStep === '6') {
        await requestBooking({
          arrivalDate,
          departureDate,
          name,
          email,
          message,
          guestsNumber,
        })
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
        className={`fixed right-5 lg:right-10 bottom-5 lg:top-1/2 lg:translate-y-[-50%] lg:bottom-auto w-fit ${
          isNextDisabled() ? 'text-[#d9d9d9]' : ' !text-black cursor-pointer'
        }`}
        onClick={handleNext}
      >
        <span className="text-4xl ">
          {currentStep === '6' ? (
            <span className="text-base  lg:text-4xl">Request Booking</span>
          ) : currentStep === '7' ? null : (
            <span
              className={`text-base bookingButton lg:text-4xl ${
                isNextDisabled()
                  ? 'text-[#d9d9d9]'
                  : ' !text-black cursor-pointer'
              }`}
            >
              Next
            </span>
          )}
        </span>
      </div>

      <div
        className="w-fit fixed bottom-5 lg:top-1/2 left-5 lg:left-10 lg:bottom-auto lg:-translate-y-1/2 cursor-pointer"
        onClick={handleBack}
      >
        {currentStep !== '1' && currentStep !== '7' && (
          <span className="text-base lg:text-4xl">Back</span>
        )}
      </div>

      <div className="w-fit bookingPagination fixed bottom-5 left-1/2 -translate-x-1/2">
        {currentStep === '7' ? (
          <span className="w-full text-center">
            Thank you, we will get back to you shortly
          </span>
        ) : (
          <span>{currentStep}/7</span>
        )}
      </div>
    </>
  )
}

export default Buttons
