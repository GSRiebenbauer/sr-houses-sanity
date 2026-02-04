import type { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'

import { Page } from '@/components/pages/page/Page'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadPage, loadSettings } from '@/sanity/loader/loadQuery'
const PagePreview = dynamic(() => import('@/components/pages/page/PagePreview'))

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params
  const { data: page } = await loadPage(slug)

  return {
    title: page?.title,
    description: page?.overview
      ? toPlainText(page.overview)
      : (await parent).description,
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('page')
}

export default async function PageSlugRoute({ params }: Props) {
  const { slug } = await params
  const initial = await loadPage(slug)
  const settings = await loadSettings()

  if ((await draftMode()).isEnabled) {
    return <PagePreview params={{ slug }} initial={initial} settings={settings} />
  }

  if (!initial.data) {
    notFound()
  }

  return <Page settings={settings} data={initial.data} />
}
