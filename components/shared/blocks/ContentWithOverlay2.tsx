'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ImageComponent from '@/components/shared/ImageComponent'
import { CustomPortableTextExtended } from '@/components/shared/CustomPortableTextExtended'
import PlusIcon from '../ui/PlusIcon'
import CloseIcon from '../ui/CloseIcon'

const ContentWithOverlay2 = ({ content }) => {
  const { headline, text, overlayTab, image } = content
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  const handleToggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible)
  }

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

  return (
    <div
      className={`${paddingClass}  ${paddingTopClass} content-with-overlay-2  flex flex-col relative px-5 lg:px-10 `}
    >
      <div className="lg:grid lg:grid-cols-8">
        <div className="lg:col-span-4">
          <div className="lg:px-20 mb-5 lg:mb-0">
            {/* Main Image */}
            {image && (
              <ImageComponent
                image={image}
                placeholderSrc={image.imageData}
                aspectRatioDesktop=""
                aspectRatioMobile=""
                classname="main-image max-h-[90vh]"
              />
            )}
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-end">
          <div>
            {/* Main Headline */}
            {headline && (
              <h2 className="headline mb-4 lg:mb-0 text-6xl leading-tight">
                {headline}
              </h2>
            )}
            <div className=" mb-10  lg:mt-5" onClick={handleToggleOverlay}>
              <PlusIcon size={36} />
            </div>
          </div>

          {/* Main Text */}
          {text && <CustomPortableTextExtended value={text} />}
        </div>
      </div>

      {/* Overlay Tab Section */}
      {overlayTab && isOverlayVisible && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overlay-tab fixed top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto pb-20"
        >
          <div className="flex justify-start fixed top-10 right-0 px-3 z-50  lg:px-10">
            <div onClick={handleToggleOverlay}>
              <CloseIcon
                size={36}
                className="translate-x-[-2px] cursor-pointer"
              />
            </div>
          </div>
          <div className="flex mt-24 lg:mt-40 flex-col lg:grid lg:grid-cols-8 gap-x-8 px-5 lg:px-10 ">
            <div className="lg:col-span-1">
              {/* Overlay Headline */}
              {overlayTab.headline && (
                <h3 className="overlay-headline ">{overlayTab.headline}</h3>
              )}
            </div>
            <div className="lg:col-span-2">
              {/* Overlay Text */}
              {overlayTab.text && (
                <CustomPortableTextExtended value={overlayTab.text} />
              )}
              {/* Overlay Image */}
              {overlayTab.image && (
                <ImageComponent
                  image={overlayTab.image}
                  placeholderSrc={overlayTab.image.imageData}
                  aspectRatioDesktop=""
                  aspectRatioMobile=""
                  classname="overlay-image  "
                />
              )}
            </div>
            <div className="lg:col-span-3 lg:col-start-6  ">
              {/* Overlay List */}
              {overlayTab.list && overlayTab.list.length > 0 && (
                <ul className="overlay-list pt-12 lg:pt-0 ">
                  {overlayTab.list.map((item, index) => (
                    <li
                      key={index}
                      className="!grid grid-cols-3 border-b border-black py-2 first:pt-0 last:border-b-0"
                    >
                      {item.text1 && (
                        <p className="text1 col-span-1">
                          {item.text1.split('\n').map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </p>
                      )}
                      {item.text2 && (
                        <p className="text2 col-span-2">
                          {item.text2.split('\n').map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ContentWithOverlay2
