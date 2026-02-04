'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { pagesBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { PagePayload, SettingsPayload } from '@/types'

import Page from './Page'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<PagePayload | null>
  settings?: QueryResponseInitial<SettingsPayload | null>
}

export default function PagePreview(props: Props) {
  const { params, initial, settings } = props
  const { data } = useQuery<PagePayload | null>(pagesBySlugQuery, params, {
    initial,
  })

  return <Page data={data!} settings={settings} />
}
