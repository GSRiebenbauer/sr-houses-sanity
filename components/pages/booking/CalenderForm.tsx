//@ts-nocheck
import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useBooking } from './BookingContext'
import SendEmailButton from './SendEmailButton'

const normalizeDate = (date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

const CalenderForm = ({ bookings }) => {
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

  console.log(bookings)
  const staticBookedDates = [{ start: '2025-01-10', end: '2025-01-15' }]
  const dynamicBookedDates = bookings
    ? bookings
        .filter((b) => b.status !== 'canceled')
        .map((b) => ({ start: b.from, end: b.to }))
    : []
  const allBookedDates = [...staticBookedDates, ...dynamicBookedDates]

  const isDateBooked = (date) => {
    const normalizedDate = normalizeDate(date)
    return allBookedDates.some(({ start, end }) => {
      const startDate = normalizeDate(start)
      const endDate = normalizeDate(end)
      return normalizedDate >= startDate && normalizedDate <= endDate
    })
  }

  const isRangeBooked = (start, end) => {
    let current = normalizeDate(start)
    const endNorm = normalizeDate(end)
    while (current <= endNorm) {
      if (isDateBooked(current)) return true
      current.setDate(current.getDate() + 1)
    }
    return false
  }

  const handleDayClick = (date) => {
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
        setError('Minimum booking is 5 nights.')
      }
    }
  }, [arrivalDate, departureDate])

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (isDateBooked(date)) {
        return 'booked'
      }
      if (
        arrivalDate &&
        !departureDate &&
        normalizeDate(date).getTime() === normalizeDate(arrivalDate).getTime()
      ) {
        return 'selected first last'
      }
      if (arrivalDate && departureDate) {
        const arrivalTime = normalizeDate(arrivalDate).getTime()
        const departureTime = normalizeDate(departureDate).getTime()
        const currentTime = normalizeDate(date).getTime()
        if (currentTime === arrivalTime) {
          return 'selected first'
        }
        if (currentTime === departureTime) {
          return 'selected last'
        }
        if (currentTime > arrivalTime && currentTime < departureTime) {
          return 'selected'
        }
      }
    }
    return null
  }

  const tileContent = ({ date, view }) => {
    if (view === 'month' && isDateBooked(date)) {
      return <div className="dot"></div>
    }
    return null
  }

  const tileDisabled = ({ date, view }) => {
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

  const minDate = new Date(2025, 6, 1)
  const disabled = currentDate <= minDate

  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentDate)
    prevMonth.setMonth(prevMonth.getMonth() - 1)
    if (prevMonth < minDate) return
    setCurrentDate(prevMonth)
  }

  const locale = 'en-US'

  const weekendClassName = ({ date }) => {
    if (date.getDay() === 0 || date.getDay() === 6) {
      return 'custom-weekend'
    }
    return null
  }

  return (
    <div className="text-[15px] flex flex-col items-center  px-5 lg:px-0 ">
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
        showNeighboringMonth={false}
      />
      <div className="flex items-center justify-between w-full max-w-[350px] mb-4 mt-4">
        <span
          onClick={handlePreviousMonth}
          className={`custom-nav-button underline ${disabled ? 'opacity-0 pointer-events-none' : 'cursor-pointer '}`}
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
      {error && (
        <p className="w-full" style={{ color: 'black' }}>
          {error}
        </p>
      )}
    </div>
  )
}

export default CalenderForm
