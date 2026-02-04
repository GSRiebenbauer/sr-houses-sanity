'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ImageComponent from '@/components/shared/ImageComponent'
import { CustomPortableTextExtended } from '@/components/shared/CustomPortableTextExtended'
import PlusIcon from '../ui/PlusIcon'
import CloseIcon from '../ui/CloseIcon'

const ContentWithOverlay = ({ content }) => {
  const { headline, text, overlayTab, images } = content
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  const handleToggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible)
  }

  const paddingClass = (() => {
    switch (content.padding) {
      case 'large':
        return 'lg:pb-48 pb-12'
      case 'medium':
        return 'lg:pb-[96px] pb-12'
      case 'small':
        return 'lg:pb-[65px] pb-[30px]'
      default:
        return 'lg:pb-[25px] pb-[15px]'
    }
  })()

  const paddingTopClass = (() => {
    switch (content.paddingTop) {
      case 'large':
        return 'lg:pt-48 pt-12'
      case 'medium':
        return 'lg:pt-[96px] pt-12'
      case 'small':
        return 'lg:pt-[65px] pt-[30px]'
      default:
        return ''
    }
  })()

  useEffect(() => {
    if (isOverlayVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOverlayVisible])

  return (
    <div
      className={`${paddingClass}  ${paddingTopClass} content-with-overlay flex flex-col lg:grid lg:grid-cols-8 px-5 lg:px-10 relative`}
    >
      <div className="lg:col-span-4 lg:grid lg:grid-cols-4">
        <div className="images-container col-start-2 col-span-2">
          {images && images.length > 0 && (
            <div className="image-wrapper">
              <ImageComponent
                image={images[0]}
                placeholderSrc={images[0].imageData}
                aspectRatioDesktop=""
                aspectRatioMobile=""
                classname=""
              />
              <div className="text-[11px] leading-[14px] mt-[2px] items-baseline flex justify-between">
                <div>
                  {content.imageDescription_1.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
                <div className="text-[11px] leading-[14px] mt-[2px] items-baseline">
                  {content.imageDescription_2}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-4 flex flex-col justify-end mt-10 lg:mt-0">
          {headline && <h2 className="headline">{headline}</h2>}
          <div className="mb-4">
            {text && <CustomPortableTextExtended value={text} />}
          </div>
          <div className="p-1 cursor-pointer" onClick={handleToggleOverlay}>
            <PlusIcon size={36} />
          </div>
        </div>
      </div>
      <div className="images-container hidden lg:block col-span-3 mt-[50%]">
        {images[1] && (
          <div className="image-wrapper">
            <ImageComponent
              image={images[1]}
              placeholderSrc={images[1].imageData}
              aspectRatioDesktop=""
              aspectRatioMobile=""
              classname="content-image max-h-[90vh]"
            />
          </div>
        )}
      </div>

      {/* AnimatePresence ensures smooth animations when the overlay mounts/unmounts */}
      <AnimatePresence>
        {overlayTab && isOverlayVisible && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overlay-tab fixed top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto pb-20"
          >
            <div
              className="px-3 lg:px-10  fixed right-0 top-10 flex justify-end"
              onClick={handleToggleOverlay}
            >
              <CloseIcon size={36} className="cursor-pointer" />
            </div>
            <div className="textSection mt-24 lg:mt-28 grid grid-cols-1 pb-0 lg:grid-cols-8 gap-x-8 px-5 lg:px-10">
              <div className="col-span-1 lg:col-span-2">
                {overlayTab.headline && (
                  <h3 className="overlay-headline">{overlayTab.headline}</h3>
                )}
              </div>
              <div className="col-span-1 mt-5 lg:mt-0 lg:col-start-3 lg:col-span-6">
                {overlayTab.text && (
                  <CustomPortableTextExtended value={overlayTab.text} />
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 items-end pb-0 lg:grid-cols-8 gap-x-8 px-5 lg:px-10 mt-5 lg:mt-0">
              <div className="col-span-4">
                <div className="grid grid-cols-4">
                  <span className="col-span-4 lg:col-span-2">Locations</span>
                  {overlayTab.locations && overlayTab.locations.length > 0 && (
                    <ul className="locations-list col-span-4 lg:col-span-2">
                      {overlayTab.locations.map((location, index) => (
                        <li
                          key={location._key}
                          className="grid grid-cols-2 location-item"
                        >
                          <div className="location-name">
                            {' '}
                            <span className="w-[35px] inline-block">
                              {index + 1}
                            </span>
                            {location.name}
                          </div>
                          <div className="location-time">{location.time}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="col-span-4 w-[70%] mx-auto mt-5 lg:mt-0">
                {overlayTab.overlayImage && (
                  <ImageComponent
                    image={overlayTab.overlayImage}
                    placeholderSrc={overlayTab.overlayImage.imageData}
                    aspectRatioDesktop=""
                    aspectRatioMobile=""
                    classname="overlay-image"
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ContentWithOverlay
