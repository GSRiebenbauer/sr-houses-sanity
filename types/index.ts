import type { PortableTextBlock } from 'next-sanity'
import type { Image } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  video?: string
  videoMobile?: string
  videoPosterMobileUrl?: string
  videoPosterDesktopUrl?: string
  overview?: PortableTextBlock[]
  showcaseProjects?: ShowcaseProject[]
  title?: string
  contentBlocks?: []
}

export interface BookingPayload {
  from?: string
  to?: string
  name?: string
  bookingSummary?: string
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  contentBlocks?: []
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
}

export interface ProjectPayload {
  client?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  duration?: {
    start?: string
    end?: string
  }
  overview?: PortableTextBlock[]
  site?: string
  slug: string
  tags?: string[]
  title?: string
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}
