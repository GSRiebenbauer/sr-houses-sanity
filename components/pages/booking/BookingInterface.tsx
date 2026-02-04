//@ts-nocheck
import { BookingProvider, useBooking } from './BookingContext'
import { AnimatePresence, motion } from 'framer-motion'
import Dates from './Dates'
import Buttons from './Buttons'
import CalenderForm from './CalenderForm'
import NameForm from './NameForm'
import EmailForm from './EmailForm'
import MessageForm from './MessageForm'
import GuestsForm from './GuestsForm'
import BookingSummary from './BookingSummary'
import ThankYou from './ThankYou'

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const BookingInterface = ({ data, bookings }) => {
  const { currentStep } = useBooking()

  return (
    <div className="bookingInterface max-h-screen bg-white flex flex-col gap-x-20 justify-center  lg:flex-row overflow-hidden relative">
      <AnimatePresence mode="wait">
        {currentStep === '1' && (
          <motion.div
            key="1"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="w-full h-screen flex flex-col lg:flex-row justify-center lg:items-center translate-y-[-25px] gap-x-20"
          >
            <CalenderForm bookings={bookings.data} />
            <Dates data={data} />
          </motion.div>
        )}
        {currentStep === '2' && (
          <motion.div
            key="2"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="w-full h-screen flex"
          >
            <NameForm />
          </motion.div>
        )}
        {currentStep === '3' && (
          <motion.div
            key="3"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="w-full h-screen flex"
          >
            <EmailForm />
          </motion.div>
        )}
        {currentStep === '4' && (
          <motion.div
            key="4"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="w-full h-screen flex"
          >
            <GuestsForm />
          </motion.div>
        )}
        {currentStep === '5' && (
          <motion.div
            key="5"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="w-full h-screen flex"
          >
            <MessageForm />
          </motion.div>
        )}
        {currentStep === '6' && (
          <motion.div
            key="6"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="w-full h-screen flex"
          >
            <BookingSummary />
          </motion.div>
        )}
        {currentStep === '7' && (
          <motion.div
            key="7"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="w-full h-screen flex"
          >
            <ThankYou />
          </motion.div>
        )}
      </AnimatePresence>
      <Buttons />
    </div>
  )
}

export default BookingInterface
