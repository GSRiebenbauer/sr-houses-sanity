'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import ImageComponent from '@/components/shared/ImageComponent'
import LogoIcon from '@/components/shared/ui/LogoIcon'

const ComingSoon = ({ content }) => {
  const [logoSize, setLogoSize] = useState<number>(191)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const offsetX = useTransform(x, [0, windowSize.width || 1], [-10, 10])
  const offsetY = useTransform(y, [0, windowSize.height || 1], [-10, 10])

  useEffect(() => {
    const handleResize = () => {
      setLogoSize(window.innerWidth < 1024 ? 150 : 191)
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleMouseMove = (e) => {
    if (windowSize.width >= 1024) {
      x.set(e.clientX)
      y.set(e.clientY)
    }
  }

  return (
    <>
      <div
        className="mih-h-screen  flex flex-col justify-between h-screen p-5 text-white  lg:p-10"
        onMouseMove={handleMouseMove}
      >
        <div className="flex flex-row w-full justify-between">
          <LogoIcon color="white" size={logoSize} />
          <div className="flex flex-col justify-end uppercase text-right lg:text-[22px] leading-[16px] lg:leading-[20px]">
            <span>Summer</span>
            <span>2025</span>
          </div>
        </div>
        <div className=" fixed bottom-5 lg:bottom-10 left-0 w-full px-5 lg:px-10 flex flex-col text-[18px] leading-[22px] lg:flex-row w-full lg:items-end lg:justify-between">
          <div className="lg:w-1/2">
            We’re excited to share that our new project, SR Houses, is ready to
            welcome you. This seaside retreat, overlooking the Aegean Sea, is a
            place to pause, breathe, and embrace the beauty of simplicity.
          </div>
          <a
            className="mt-5 relative inline-block w-fit after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-current after:transition-width after:duration-300 hover:after:w-full"
            href="mailto:hello@sr-houses.com"
          >
            hello@sr-houses.com
          </a>
        </div>
      </div>
      {windowSize.width >= 1024 ? (
        <motion.div
          className="absolute w-full h-screen z-[-1] top-0 left-0"
          style={{ x: offsetX, y: offsetY }}
        >
          <ImageComponent
            image={content.videoPosterDesktopUrl}
            placeholderSrc={content.videoPosterDesktopData}
            aspectRatioDesktop=""
            aspectRatioMobile=""
            classname="h-screen scale-[1.02]"
          />
        </motion.div>
      ) : (
        <div className="absolute w-full h-screen z-[-1] top-0 left-0">
          <ImageComponent
            image={content.videoPosterDesktopUrl}
            placeholderSrc={content.videoPosterDesktopData}
            aspectRatioDesktop=""
            aspectRatioMobile=""
            classname="h-screen "
          />
        </div>
      )}
    </>
  )
}

export default ComingSoon
