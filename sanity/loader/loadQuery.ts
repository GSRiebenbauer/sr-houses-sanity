import 'server-only'

import * as queryStore from '@sanity/react-loader'
import { draftMode } from 'next/headers'

import { client } from '@/sanity/lib/client'
import {
  homePageQuery,
  pagesBySlugQuery,
  projectBySlugQuery,
  settingsQuery,
  bookingQuery,
} from '@/sanity/lib/queries'
import { token } from '@/sanity/lib/token'
import {
  HomePagePayload,
  PagePayload,
  ProjectPayload,
  BookingPayload,
  SettingsPayload,
} from '@/types'

const serverClient = client.withConfig({
  token,
  // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
  stega: process.env.VERCEL_ENV === 'preview',
})

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient)

/**
 * Helper to get draft mode status (async in Next.js 15+)
 */
async function isDraftModeEnabled(): Promise<boolean> {
  return (await draftMode()).isEnabled
}

/**
 * Async loadQuery wrapper for Next.js 15+
 */
export async function loadQuery<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: {
    perspective?: 'previewDrafts' | 'published'
    next?: { tags?: string[]; revalidate?: number }
  } = {},
): Promise<queryStore.QueryResponseInitial<T>> {
  const isDraft = await isDraftModeEnabled()
  const perspective = options.perspective ?? (isDraft ? 'previewDrafts' : 'published')

  return queryStore.loadQuery<T>(query, params, {
    ...options,
    next: {
      revalidate: 0, // Always fetch fresh data
      ...(options.next || {}),
    },
    perspective,
    // Enable stega if in Draft Mode, to enable overlays when outside Sanity Studio
    stega: isDraft,
  })
}

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

export function loadSettings() {
  return loadQuery<SettingsPayload>(
    settingsQuery,
    {},
    { next: { tags: ['settings', 'home', 'page', 'project'] } },
  )
}

export function loadBooking() {
  return loadQuery<BookingPayload | null>(
    bookingQuery,
    {},
    { next: { tags: ['booking', 'home'] } },
  )
}

export function loadHomePage() {
  return loadQuery<HomePagePayload | null>(
    homePageQuery,
    {},
    { next: { tags: ['home', 'project'] } },
  )
}

export function loadProject(slug: string) {
  return loadQuery<ProjectPayload | null>(
    projectBySlugQuery,
    { slug },
    { next: { tags: [`project:${slug}`, 'project'] } },
  )
}

export function loadPage(slug: string) {
  return loadQuery<PagePayload | null>(
    pagesBySlugQuery,
    { slug },
    { next: { tags: [`page:${slug}`, 'page'] } },
  )
}
