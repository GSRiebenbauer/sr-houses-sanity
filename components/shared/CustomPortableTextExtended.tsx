import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity'
import type { Image } from 'sanity'

import ImageBox from '@/components/shared/ImageBox'
import { TimelineSection } from '@/components/shared/TimelineSection'

export function CustomPortableTextExtended({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock | PortableTextBlock[]
}) {
  const valueArray = Array.isArray(value) ? value : [value]

  const fontSizes =
    'text-[12px] leading-[14px] md:text-[18] md:leading-[21px] lg:text-[15px] lg:leading-[18px] xl:text-[20px] xl:leading-[26px]'

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className="text-base    ">{children}</p>
      },
      serif: ({ children }) => {
        return <p className="text-base font-serif   lg:mx-auto ">{children}</p>
      },
      h2: ({ children }) => {
        return <p className="text-3xl lg:text-4xl  lg:mx-auto  ">{children}</p>
      },
      h3: ({ children }) => {
        return (
          <p className="text-[18px] leading-[20px] md:leading-[30px] md:text-[28px] lg:text-[24px] lg:leading-[25px]  xxl:text-[35px] xxl:leading-[35px]  portableTextParagraph  ">
            {children}
          </p>
        )
      },
    },
    marks: {
      em: ({ children }) => {
        return <em className="font-serif  ">{children}</em>
      },
      link: ({ value, children }) => {
        const { blank, href } = value
        return blank ? (
          <a href={href} target="_blank" rel="noopener">
            {children}
          </a>
        ) : (
          <a href={href}>{children}</a>
        )
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string }
      }) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && <div className="">{value.caption}</div>}
          </div>
        )
      },
      timeline: ({ value }) => {
        const { items } = value || {}
        return <TimelineSection timelines={items} />
      },
    },
  }

  return <PortableText components={components} value={valueArray} />
}
