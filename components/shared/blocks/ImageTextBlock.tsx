'use client'

import ImageComponent from '@/components/shared/ImageComponent'
import { CustomPortableTextExtended } from '@/components/shared/CustomPortableTextExtended'
import PlusIcon from '../ui/PlusIcon'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ImageTextBlock = ({ content }) => {
  const { headline, text, image, swap, text1, text2, text3 } = content
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1280)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const toggleOpen = () => {
    setIsOpen(!isOpen)
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

  return (
    <div
      className={`${paddingClass}  ${paddingTopClass} ${content.backgroundWhite ? 'bg-white' : ''} imageTextBlock flex flex-col relative px-5 lg:px-10 `}
    >
      {swap ? (
        <div className="lg:grid lg:grid-cols-8">
          <div className="lg:col-span-4">
            <div className="lg:px-20">
              {/* Main Image */}
              {image && (
                <ImageComponent
                  image={image}
                  placeholderSrc={image.imageData}
                  aspectRatioDesktop=""
                  aspectRatioMobile=""
                  classname="main-image"
                />
              )}
            </div>
          </div>

          <div className="lg:col-span-4 lg:pr-20 flex flex-col justify-end">
            <div>
              {/* Main Headline */}
              {headline && (
                <h2 className="headline mt-5 lg:mt-0  text-6xl leading-tight ">
                  {headline.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h2>
              )}
              <div className="xl:hidden" onClick={toggleOpen}>
                <PlusIcon color={'black'} size={36} />
              </div>
            </div>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="flex gap-5 flex-col mt-5 xl:grid xl:gap-0 xl:grid-cols-3">
                <div className="flex">
                  {text1 && <CustomPortableTextExtended value={text1} />}
                </div>
                <div className="flex">
                  {text2 && <CustomPortableTextExtended value={text2} />}
                </div>
                <div className="flex">
                  {text3 && <CustomPortableTextExtended value={text3} />}
                </div>
              </div>
            </motion.div>

            {/* Main Text */}
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-3 mt-10">
                {text && <CustomPortableTextExtended value={text} />}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-8">
          <div className="lg:col-span-4 lg:pl-20 flex flex-col justify-end">
            <div>
              {/* Main Headline */}
              {headline && (
                <h2 className="headline mt-5 lg:mt-0  text-6xl leading-tight">
                  {headline.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h2>
              )}
              <div className="lg:hidden" onClick={toggleOpen}>
                <PlusIcon color={'black'} size={36} />
              </div>
            </div>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="flex gap-5 flex-col mt-5 xl:grid xl:gap-0 xl:grid-cols-3">
                <div className="flex">
                  {text1 && <CustomPortableTextExtended value={text1} />}
                </div>
                <div className="flex">
                  {text2 && <CustomPortableTextExtended value={text2} />}
                </div>
                <div className="flex">
                  {text3 && <CustomPortableTextExtended value={text3} />}
                </div>
              </div>
            </motion.div>

            {/* Main Text */}

            <div className="grid grid-cols-1 lg:grid-cols-3 ">
              <div className="lg:col-span-3 mt-10">
                {text && <CustomPortableTextExtended value={text} />}
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="lg:px-20 mt-5 lg:mt-0">
              {/* Main Image */}
              {image && (
                <ImageComponent
                  image={image}
                  placeholderSrc={image.imageData}
                  aspectRatioDesktop=""
                  aspectRatioMobile=""
                  classname="main-image"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageTextBlock
