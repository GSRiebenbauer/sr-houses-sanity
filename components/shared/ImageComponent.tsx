import React, { useState, useEffect, useRef } from 'react'
import { urlForImage } from '@/sanity/lib/utils'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const ImageComponent = ({
  image,
  placeholderSrc,
  aspectRatioDesktop,
  aspectRatioMobile,
  classname = '',
}) => {
  const [imgIsLoading, setImgIsLoading] = useState(true)
  const imgRef = useRef(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      setImgIsLoading(false)
    }
  }, [inView])

  return (
    <div
      className={`relative aspect-${aspectRatioMobile}  ${classname}  lg:aspect-${aspectRatioDesktop}  `}
    >
      <motion.img
        initial={{ opacity: 1 }}
        // animate={{ opacity: imgIsLoading ? 1 : 0, }}
        // transition={{ opacity: { delay: 0.1, duration: 0.4 } }}
        src={placeholderSrc?.metadata?.lqip || placeholderSrc?.lqip}
        alt="Loading..."
        width={
          placeholderSrc?.metadata?.dimensions.width ||
          placeholderSrc?.dimensions.width
        }
        height={
          placeholderSrc?.metadata?.dimensions.height ||
          placeholderSrc?.dimensions.height
        }
        loading="lazy"
        className={`${classname}  absolute h-full w-full `}
        ref={ref}
      />
      <picture>
        <source
          media="(min-width: 1440px)"
          srcSet={`${urlForImage(image)?.width(1600).url()} 1600w,
             ${urlForImage(image)?.width(1920).url()} 1920w,
             ${urlForImage(image)?.width(2560).url()} 2560w`}
          sizes="(min-width: 1440px) 1390px, 100vw"
        />
        <source
          media="(min-width: 1024px)"
          srcSet={`${urlForImage(image)?.width(1024).url()} 1024w,
             ${urlForImage(image)?.width(1200).url()} 1200w,
             ${urlForImage(image)?.width(1400).url()} 1400w`}
          sizes="(min-width: 1024px) calc((100vw - 50px) / 12 * 3), 100vw"
        />

        <motion.img
          ref={imgRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: imgIsLoading ? 0 : 1 }}
          // transition={{ opacity: { delay: 0.1, duration: 0.4 } }}
          src={urlForImage(image)?.width(1920).url()}
          width={
            placeholderSrc?.metadata?.dimensions.width ||
            placeholderSrc?.dimensions.width
          }
          height={
            placeholderSrc?.metadata?.dimensions.height ||
            placeholderSrc?.dimensions.height
          }
          alt="alt text"
          className={` w-full h-full object-cover relative ${classname} ${imgIsLoading}`}
          loading="lazy"
        />
      </picture>
    </div>
  )
}

export default ImageComponent
