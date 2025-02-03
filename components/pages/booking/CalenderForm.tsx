//@ts-nocheck
import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useBooking } from './BookingContext'

const bookedDates = ['2025-01-10', '2025-01-15']

const CalenderForm = () => {
  const {
    arrivalDate,
    setArrivalDate,
    departureDate,
    setDepartureDate,
    error,
    setError,
    currentDate,
    setCurrentDate,
  } = useBooking()

  const isDateBooked = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return bookedDates.includes(dateString)
  }

  const isRangeBooked = (start: Date, end: Date) => {
    let current = new Date(start)
    while (current <= end) {
      if (isDateBooked(current)) return true
      current.setDate(current.getDate() + 1)
    }
    return false
  }

  const handleDayClick = (date: Date) => {
    setError('')
    if (!arrivalDate) {
      if (isDateBooked(date)) {
        setError('Selected date is booked.')
        return
      }
      setArrivalDate(date)
      setDepartureDate(null)
    } else if (!departureDate) {
      if (date < arrivalDate) {
        if (isDateBooked(date)) {
          setError('Selected date is booked.')
          return
        }
        setArrivalDate(date)
        setDepartureDate(null)
      } else {
        if (isRangeBooked(arrivalDate, date)) {
          setError('Your selection includes booked dates.')
          return
        }
        setDepartureDate(date)
      }
    } else {
      if (isDateBooked(date)) {
        setError('Selected date is booked.')
        return
      }
      setArrivalDate(date)
      setDepartureDate(null)
    }
  }

  useEffect(() => {
    if (arrivalDate && departureDate) {
      const diff = Math.ceil(
        (departureDate.getTime() - arrivalDate.getTime()) / (1000 * 3600 * 24),
      )
      if (diff < 5) {
        setError('Minimum booking is 5 days.')
      }
    }
  }, [arrivalDate, departureDate])

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0]
      if (bookedDates.includes(dateString)) {
        return 'booked'
      }
      if (
        arrivalDate &&
        !departureDate &&
        date.getTime() === arrivalDate.getTime()
      ) {
        return 'selected first last'
      }
      if (arrivalDate && departureDate) {
        const arrivalTime = arrivalDate.getTime()
        const departureTime = departureDate.getTime()
        if (date.getTime() === arrivalTime) {
          return 'selected first'
        }
        if (date.getTime() === departureTime) {
          return 'selected last'
        }
        if (date > arrivalDate && date < departureDate) {
          return 'selected'
        }
      }
    }
    return null
  }

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0]
      if (bookedDates.includes(dateString)) {
        return <div className="dot"></div>
      }
    }
    return null
  }

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      return isDateBooked(date)
    }
    return false
  }

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    setCurrentDate(nextMonth)
  }

  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentDate)
    prevMonth.setMonth(prevMonth.getMonth() - 1)
    setCurrentDate(prevMonth)
  }
  const locale = 'en-US'

  return (
    <div className="text-[15px] flex flex-col items-center lg:mt-[10%] px-5 lg:px-0 ">
      <div className="flex w-full max-w-[350px] mb-3">
        <span className="font-bold">
          {currentDate.toLocaleString(locale, {
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>
      <Calendar
        onClickDay={handleDayClick}
        tileClassName={tileClassName}
        tileContent={tileContent}
        tileDisabled={tileDisabled}
        activeStartDate={currentDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setCurrentDate(activeStartDate || new Date())
        }
        nextLabel={null}
        prevLabel={null}
        showNavigation={false}
        value={null}
      />
      <div className="flex items-center justify-between w-full max-w-[350px] mb-4 mt-4">
        <span
          onClick={handlePreviousMonth}
          className="custom-nav-button cursor-pointer underline"
        >
          Previous Month
        </span>

        <span
          onClick={handleNextMonth}
          className="custom-nav-button cursor-pointer underline"
        >
          Next Month
        </span>
      </div>
      {/* {arrivalDate && !departureDate && (
        <span>Arrival: {arrivalDate.toDateString()}</span>
      )} */}
      {/* {arrivalDate && departureDate && (
        <span>
          Selected: {arrivalDate.toDateString()} -{' '}
          {departureDate.toDateString()}
        </span>
      )} */}
      {error && (
        <p className="w-full" style={{ color: 'black' }}>
          {error}
        </p>
      )}
    </div>
  )
}

export default CalenderForm
