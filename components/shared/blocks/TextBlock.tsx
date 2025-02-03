'use client'

import { CustomPortableTextExtended } from '../CustomPortableTextExtended'

export function TextBlock({ content }) {
  const { headline, text } = content

  const paddingClass = (() => {
    switch (content.padding) {
      case 'large':
        return 'lg:pb-48 pb-12'
      case 'medium':
        return 'lg:pb-[96px] pb-12'
      case 'small':
        return 'lg:pb-[65px] pb-[30px]'
      default:
        return 'lg:pb-48 pb-12'
    }
  })()

  const paddingTopClass = (() => {
    switch (content.paddingTop) {
      case 'large':
        return 'lg:pt-48 pt-12'
      case 'medium':
        return 'lg:pt-[96px] pt-12'
      case 'small':
        return 'lg:pt-[65px] pt-[30px]'
      default:
        return ''
    }
  })()

  return (
    <div
      className={`${paddingClass}  ${paddingTopClass} ${content.backgroundWhite ? 'bg-white' : ''} textSection grid grid-cols-1  pb-0 lg:grid-cols-8 gap-x-8   px-5 lg:px-10  `}
    >
      <span className="col-span-1 lg:col-span-2 translate-y-[2px] ">
        {headline}
      </span>
      <div className="col-span-1  mt-5 lg:mt-0 lg:col-start-3 lg:col-span-6">
        <CustomPortableTextExtended value={text} />
      </div>
    </div>
  )
}

export default TextBlock
