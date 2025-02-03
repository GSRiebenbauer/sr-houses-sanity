//@ts-nocheck
import { useState } from 'react'
import { useBooking } from './BookingContext'
import CloseIcon from '@/components/shared/ui/CloseIcon'
import ImageComponent from '@/components/shared/ImageComponent'

const Dates = ({ data }) => {
  const { arrivalDate, departureDate } = useBooking()

  const [showPrices, setShowPrices] = useState(false)

  return (
    <div className="text-[15px]  grid grid-cols-2 mx-auto max-w-[393px] w-full gap-x-3 lg:block lg:mt-[10%] px-5 lg:px-0 lg:mx-[unset]">
      <span className="font-bold col-span-2">Stay from, until</span>
      <div className="col-span-1 flex flex-col lg:flex-row justify-between border-b border-black lg:min-w-[350px] text-[#808080] mt-3">
        <span>Arrival</span>
        <span>{arrivalDate?.toDateString() || 'choose date'}</span>
      </div>
      <div className="col-span-1 flex flex-col lg:flex-row justify-between border-b border-black lg:min-w-[350px] text-[#808080] mt-3">
        <span>Departure</span>
        <span>{departureDate?.toDateString() || 'choose date'}</span>
      </div>
      {/* <div className="col-span-1 text-[#0000005A] font-bold  flex flex-col lg:flex-row justify-between border-b border-black lg:min-w-[350px] text-[#808080] mt-3">
        <span>Arrival</span>
        <span>
          {arrivalDate
            ? new Intl.DateTimeFormat('en-GB').format(arrivalDate)
            : 'choose date'}
        </span>
      </div>
      <div className="col-span-1  text-[#0000005A] font-bold flex flex-col lg:flex-row justify-between border-b border-black lg:min-w-[350px] text-[#808080] mt-3">
        <span>Departure</span>
        <span>
          {departureDate
            ? new Intl.DateTimeFormat('en-GB').format(departureDate)
            : 'choose date'}
        </span>
      </div> */}

      <div className="mt-4">
        <span
          className="underline cursor-pointer"
          onClick={() => setShowPrices(!showPrices)}
        >
          Prices
        </span>
      </div>
      {showPrices && (
        <div className="absolute z-20 top-0 left-0 min-h-screen w-full bg-white pb-20">
          <div
            className="p-4 lg:p-8 cursor-pointer"
            onClick={() => setShowPrices(!showPrices)}
          >
            <CloseIcon size={36} />
          </div>
          <div className="px-5 lg:px-10  flex flex-col lg:grid  lg:grid-cols-8 gap-x-8 mt-10 mb-20">
            <div className="lg:col-start-1 lg:col-span-1 pr-12">House</div>

            <div className="lg:col-start-2 text-6xl leading-tight lg:col-span-4 pr-12">
              Prices
            </div>
          </div>
          <div className="px-5 lg:px-10  flex flex-col xl:grid  xl:grid-cols-8  xl:gap-x-8">
            <div className="lg:col-start-2 lg:col-span-4 xl:pr-12">
              <ImageComponent
                image={data.image}
                placeholderSrc={data.image.imageData}
              />
            </div>
            <div className=" lg:col-start-6 col-span-3">
              <div className="text-[15px] pt-12 lg:pt-0">
                {data.pricesList.map((price, index) => (
                  <div
                    key={index}
                    className="xl:max-w-[530px] grid grid-cols-2 lg:grid-cols-10 py-2 border-b border-black last:border-none"
                  >
                    <span className="col-span-2 lg:col-span-5">
                      {price.text1}
                    </span>
                    <span className="min-w-[150px] col-span-1 lg:col-span-3 text-left">
                      {price.text2}
                    </span>
                    <span className=" col-span-1 lg:col-span-2 text-right">
                      {price.text3}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dates
