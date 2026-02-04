//@ts-nocheck
'use client'

import { useEffect, useState, useRef } from 'react'
import StartIcon from '@/components/shared/ui/StartIcon'
import { motion, useAnimation } from 'framer-motion'
import LogoIcon from '@/components/shared/ui/LogoIcon'

export default function HeroSection({ content }) {
  const {
    videoMobile = '',
    video = '',
    videoPosterMobileUrl = '',
    videoPosterDesktopUrl = '',
  } = content ?? {}
  const [isMobile, setIsMobile] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const [videoPoster, setVideoPoster] = useState('')
  const videoRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const topCurtainControls = useAnimation()
  const bottomCurtainControls = useAnimation()
  const [logoSize, setLogoSize] = useState(220)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  const handlePlayPause = () => {
    const logoIcons = document.querySelectorAll('.logoIcon')
    const startIcons = document.querySelectorAll('.startIcon')
    const animationContainer = document.querySelectorAll('.animationContainer')

    if (!videoRef.current) return
    if (videoRef.current.paused) videoRef.current.play()

    logoIcons.forEach((icon) => (icon.style.display = 'none'))
    startIcons.forEach((icon) => (icon.style.display = 'none'))

    setTimeout(() => {
      animationContainer.forEach((icon) => (icon.style.display = 'none'))
    }, 4000)

    topCurtainControls.start({
      y: '-100%',
      transition: { ease: 'easeIn', duration: 4 },
    })

    bottomCurtainControls.start({
      y: '100%',
      transition: { ease: 'easeIn', duration: 4 },
    })
  }

  useEffect(() => {
    const handleResize = () => {
      setLogoSize(window.innerWidth < 1024 ? 150 : 220)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      setVideoUrl(mobile ? videoMobile : video)
      setVideoPoster(mobile ? videoPosterMobileUrl : videoPosterDesktopUrl)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [videoMobile, video, videoPosterMobileUrl, videoPosterDesktopUrl])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const reloadCount = sessionStorage.getItem('reloadCount')
    if (reloadCount) {
      const newCount = parseInt(reloadCount, 10) + 1
      sessionStorage.setItem('reloadCount', newCount.toString())
      console.log(`Page reloaded ${newCount} times in the same window`)
      setIsFirstLoad(false)
    } else {
      sessionStorage.setItem('reloadCount', '1')
      console.log('Page loaded for the first time in this window')
      setIsFirstLoad(true)
    }
  }, [])

  return (
    <>
      {isFirstLoad && (
        <div className="fixed logoIcon top-10 left-5 lg:left-10 z-[60]">
          <LogoIcon color="black" size={logoSize} />
        </div>
      )}

      {isFirstLoad && (
        <div className="fixed animationContainer z-50 inset-0 bg-transparent flex items-center justify-center overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 w-full h-[49vh] bg-[#C3BBAF]"
            initial={{ y: 0 }}
            animate={topCurtainControls}
          />
          <motion.div
            className="absolute right-0 bottom-0 w-full h-[49vh] bg-[#C3BBAF]"
            initial={{ y: 0 }}
            animate={bottomCurtainControls}
          />
        </div>
      )}

      <div className="h-screen  relative">
        {isFirstLoad && (
          <div
            onClick={handlePlayPause}
            className="fixed top-0 startIcon left-0 w-full h-full z-50"
            style={{ cursor: 'none' }}
          >
            <div
              className={`${cursorPosition.x === 0 ? 'opacity-0' : ' opacity-100'}  absolute`}
              style={{
                transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
              }}
            >
              <StartIcon />
            </div>
          </div>
        )}
        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-screen object-cover"
            poster={videoPoster}
          />
        )}
      </div>
    </>
  )
}
