import Link from 'next/link'
import React from 'react'

const CtaBlock = ({ content }) => {
  const paddingClass = (() => {
    switch (content.padding) {
      case 'large':
        return 'lg:pb-48 pb-12'
      case 'medium':
        return 'lg:pb-32 pb-12'
      case 'small':
        return 'lg:pb-[65px] pb-[30px]'
      default:
        return 'lg:pb-[25px] pb-[15px]'
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
      className={`${paddingClass} ${content.backgroundWhite ? 'bg-white' : ''} flex items-center justify-center px-5 lg:px-10`}
    >
      <Link
        className="text-3xl lg:text-4xl underline hover:no-underline"
        href={content.link}
      >
        {content.headline}
      </Link>
    </div>
  )
}

export default CtaBlock
