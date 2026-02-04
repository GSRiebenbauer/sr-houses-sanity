import type { PagePayload, SettingsPayload } from '@/types'
import type { QueryResponseInitial } from '@sanity/react-loader'
import PageContent from './PageContent'
import PricesSection from './PricesSection'

export interface PageProps {
  data: PagePayload | null
  settings?: QueryResponseInitial<SettingsPayload | null>
}

export function Page({ data, settings }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title } = data ?? {}

  return (
    <>
      {' '}
      <div className={`page-${data?.slug} min-h-screen `}>
        <PricesSection data={settings?.data} />

        {data?.contentBlocks && <PageContent content={data?.contentBlocks} />}
      </div>
    </>
  )
}

export default Page
