'use client'

import TextBlock from '@/components/shared/blocks/TextBlock'
import ImageBlock from '@/components/shared/blocks/ImageBlock'
import ContentWithOverlay from '@/components/shared/blocks/ContentWithOverlay'
import ContentWithOverlay2 from '@/components/shared/blocks/ContentWithOverlay2'
import InfoBlock from '@/components/shared/blocks/InfoBlock'
import ImageTextBlock from '@/components/shared/blocks/ImageTextBlock'
import MediaBlock from '@/components/shared/blocks/MediaBlock'
import CtaBlock from '@/components/shared/blocks/CtaBlock'

const HomePageContent = ({ content }) => {
  return (
    <div>
      {content.map((block) => {
        if (block._type === 'textBlock') {
          return <TextBlock key={block._key} content={block} />
        } else if (block._type === 'imageBlock') {
          return <ImageBlock key={block._key} content={block} />
        } else if (block._type === 'contentWithOverlay') {
          return <ContentWithOverlay key={block._key} content={block} />
        } else if (block._type === 'contentWithOverlay2') {
          return <ContentWithOverlay2 key={block._key} content={block} />
        } else if (block._type === 'infoBlock') {
          return <InfoBlock key={block._key} content={block} />
        } else if (block._type === 'imageTextBlock') {
          return <ImageTextBlock key={block._key} content={block} />
        } else if (block._type === 'mediaBlock') {
          return <MediaBlock key={block._key} content={block} />
        } else if (block._type === 'CTABlock') {
          return <CtaBlock key={block._key} content={block} />
        }
        return null
      })}
    </div>
  )
}

export default HomePageContent
