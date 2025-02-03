//@ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/shared/Header'
import type { HomePagePayload } from '@/types'
import { ContentLayout } from './ContentLayout'
import Loader from './Loader'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HeroSection({ content }) {
  const {
    videoMobile = '',
    video = '',
    videoPosterMobileUrl = '',
    videoPosterDesktopUrl = '',
  } = content ?? {}
  const [isMobile, setIsMobile] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [videoPoster, setVideoPoster] = useState<string | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading completion after 3 seconds
    const timer = setTimeout(() => setLoading(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setVideoUrl(videoMobile)
        setVideoPoster(videoPosterMobileUrl)
      } else {
        setVideoUrl(video)
        setVideoPoster(videoPosterDesktopUrl)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [videoMobile, video, videoPosterMobileUrl, videoPosterDesktopUrl])

  return (
    <div className="bg-[transparent] h-screen lg:mb-48 mb-12">
      {loading && <Loader />}

      {videoUrl && (
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full video h-screen object-cover"
          poster={videoPoster}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}

export default HeroSection
