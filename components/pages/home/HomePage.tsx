import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import type { HomePagePayload } from '@/types'
import HomePageContent from './HomePageContent'
import HeroSection from './HeroSection'
import ComingSoon from './ComingSoon'
import { useEffect } from 'react'
import BannerSection from './BannerSection'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  const {
    overview = [],
    showcaseProjects = [],
    title = '',
    video,
    videoMobile,
    videoPosterMobileUrl,
    videoPosterDesktopUrl,
  } = data ?? {}

  const heroSection = {
    video,
    videoMobile,
    videoPosterDesktopUrl,
    videoPosterMobileUrl,
  }

  return (
    <div className="overflow-hidden">
      <BannerSection data={data} />
      {/* <ComingSoon content={data} /> */}
      {/* <HeroSection content={heroSection} /> */}
      <HomePageContent content={data?.contentBlocks} />
    </div>
  )
}

export default HomePage
