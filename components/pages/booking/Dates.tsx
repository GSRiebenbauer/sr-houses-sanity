//@ts-nocheck
import { useState } from 'react'
import { useBooking } from './BookingContext'
import CloseIcon from '@/components/shared/ui/CloseIcon'
import ImageComponent from '@/components/shared/ImageComponent'
import { motion, AnimatePresence } from 'framer-motion'

const Dates = ({ data }) => {
  const { arrivalDate, departureDate, setArrivalDate, setDepartureDate } =
    useBooking()

  const [showPrices, setShowPrices] = useState(false)

  function updateStyles() {
    ;['.bookingPagination', '.bookingButton', '.navbarLayout'].forEach(
      (selector) => {
        const element = document.querySelector(selector)
        if (element) element.style.display = 'none'
      },
    )
    const interfaceElement = document.querySelector('.bookingInterface')
    if (interfaceElement) interfaceElement.style.overflow = 'scroll'
  }

  function resetStyles() {
    ;['.bookingPagination', '.bookingButton', '.navbarLayout'].forEach(
      (selector) => {
        const element = document.querySelector(selector)
        if (element) element.style.display = ''
      },
    )
    const interfaceElement = document.querySelector('.bookingInterface')
    if (interfaceElement) interfaceElement.style.overflow = 'hidden'
  }

  return (
    <div className="text-[15px] grid grid-cols-2 mx-auto max-w-[393px] w-full gap-x-3 lg:block lg:h-[367px] px-5 lg:px-0 lg:mx-[unset]">
      <span className="font-bold col-span-2">Stay from, until</span>
      <div className="col-span-1 flex flex-col lg:flex-row justify-between border-b border-black lg:min-w-[350px] text-[#808080] mt-3">
        <span>Arrival</span>
        <span>{arrivalDate?.toDateString() || 'choose date'}</span>
      </div>
      <div className="col-span-1 flex flex-col lg:flex-row justify-between border-b border-black lg:min-w-[350px] text-[#808080] mt-3">
        <span>Departure</span>
        <span>{departureDate?.toDateString() || 'choose date'}</span>
      </div>

      <div className="mt-4 flex justify-between col-span-2">
        <span
          className="underline cursor-pointer"
          onClick={() => {
            setShowPrices(!showPrices)
            updateStyles()
          }}
        >
          Prices
        </span>
        {(arrivalDate || departureDate) && (
          <span
            className="cursor-pointer"
            onClick={() => {
              setArrivalDate(null)
              setDepartureDate(null)
            }}
          >
            Reset Dates
          </span>
        )}
      </div>
      {data.additionalText && (
        <div className="col-span-2 hidden lg:flex flex-col gap-1 mt-5 ">
          {data.additionalText.split('\n').map((line, index) => (
            <span key={index}>{line}</span>
          ))}
        </div>
      )}
      <AnimatePresence>
        {showPrices && (
          <motion.div
            key="pricesSection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute pt-24 lg:pt-40 z-[99] top-0 left-0 min-h-screen w-full bg-white pb-48 "
          >
            <div
              className="px-4 lg:px-10 fixed top-10 right-0 cursor-pointer"
              onClick={() => {
                setShowPrices(!showPrices)
                resetStyles()
              }}
            >
              <CloseIcon size={36} />
            </div>
            <div className="px-5 lg:px-10 flex flex-col lg:grid lg:grid-cols-8 gap-x-8 mt-10 mb-20">
              <div className="lg:col-start-1 lg:col-span-1 pr-12">House</div>

              <div className="lg:col-start-2 text-6xl leading-tight lg:col-span-4 pr-12">
                Prices
              </div>
            </div>
            <div className="px-5 lg:px-10 flex flex-col xl:grid xl:grid-cols-8 xl:gap-x-8">
              <div className="lg:col-start-2 lg:col-span-4 xl:pr-12">
                <ImageComponent
                  image={data.image}
                  placeholderSrc={data.image.imageData}
                />
              </div>
              <div className="lg:col-start-6 col-span-3">
                <div className="text-[15px] pt-12 lg:pt-0">
                  {data.pricesList.map((price, index) => (
                    <div
                      key={index}
                      className={`  xl:max-w-[530px] grid grid-cols-2 lg:grid-cols-10 py-2 border-b border-black last:border-none`}
                    >
                      <span
                        className={`${!price.text2 && !price.text3 ? 'col-span-2 lg:col-span-8' : 'col-span-2 lg:col-span-5'}  `}
                      >
                        {price.text1}
                      </span>
                      {price.text2 && (
                        <span className="min-w-[150px] col-span-1 lg:col-span-3 text-left">
                          {price.text2}
                        </span>
                      )}
                      {price.text3 && (
                        <span className="col-span-1 text-wrap lg:col-span-2 text-right">
                          {price.text3}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                {data.additionalText && (
                  <div className="flex flex-col gap-1 mt-5">
                    {data.additionalText.split('\n').map((line, index) => (
                      <span key={index}>{line}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dates
