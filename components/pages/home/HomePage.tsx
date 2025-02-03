import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import type { HomePagePayload } from '@/types'
import HomePageContent from './HomePageContent'
import HeroSection from './HeroSection'
import ComingSoon from './ComingSoon'

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
      <HeroSection content={heroSection} />
      <HomePageContent content={data?.contentBlocks} /> 
    </div>
  )
}

export default HomePage
