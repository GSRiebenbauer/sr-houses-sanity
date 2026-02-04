//@ts-nocheck
'use client'
import ImageComponent from '@/components/shared/ImageComponent'
import { usePathname } from 'next/navigation'

const PricesSection = ({ data }) => {
  const path = usePathname()

  // Add safety checks to prevent errors
  if (!data) {
    return null
  }

  const { pricesList, additionalText, image } = data

  console.log(path)

  return (
    <>
      <div
        key="pricesSection"
        className={`${path !== '/prices' && 'hidden'} pt-48 pb-48 `}
      >
        <div className="px-5 lg:px-10 flex flex-col lg:grid lg:grid-cols-8 gap-x-8 mt-10 mb-20">
          <div className="lg:col-start-1 lg:col-span-1 pr-12">House</div>
          <div className="lg:col-start-2 text-6xl leading-tight lg:col-span-4 pr-12">
            Prices
          </div>
        </div>
        <div className="px-5 lg:px-10 flex flex-col xl:grid xl:grid-cols-8 xl:gap-x-8">
          <div className="lg:col-start-2 lg:col-span-4 xl:pr-12">
            {image && (
              <ImageComponent image={image} placeholderSrc={image.imageData} />
            )}
          </div>
          <div className="lg:col-start-6 col-span-3">
            <div className="text-[15px] pt-12 lg:pt-0">
              {pricesList && pricesList.length > 0 ? (
                pricesList.map((price, index) => (
                  <div
                    key={index}
                    className={`xl:max-w-[530px] grid grid-cols-2 lg:grid-cols-10 py-2 border-b border-black last:border-none`}
                  >
                    <span
                      className={`${
                        !price.text2 && !price.text3
                          ? 'col-span-2 lg:col-span-8'
                          : 'col-span-2 lg:col-span-5'
                      }`}
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
                ))
              ) : (
                <div>No prices available</div>
              )}
            </div>
            {additionalText && (
              <div className="flex flex-col gap-1 mt-5 max-w-[530px]">
                {additionalText.split('\n').map((line, index) => (
                  <span key={index}>{line}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PricesSection
