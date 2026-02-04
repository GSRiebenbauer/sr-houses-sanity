'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ImageComponent from '@/components/shared/ImageComponent'
import { CustomPortableTextExtended } from '@/components/shared/CustomPortableTextExtended'
import PlusIcon from '../ui/PlusIcon'
import CloseIcon from '../ui/CloseIcon'

const InfoBlock = ({ content }) => {
  const { headline, text, image, list } = content

  const paddingClass = (() => {
    switch (content.padding) {
      case 'large':
        return 'lg:pb-48 pb-12'
      case 'medium':
        return 'lg:pb-[96px] pb-12'
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
      className={`${paddingClass} ${paddingTopClass} ${content.backgroundWhite ? 'bg-white' : ''}  infoBlock flex flex-col `}
    >
      <div className="flex flex-col lg:grid lg:grid-cols-8 gap-x-8 px-5 lg:px-10">
        <div className="lg:col-span-1">
          {/*  Headline */}
          {headline && <h3 className="overlay-headline ">{headline}</h3>}
        </div>
        <div className="lg:col-span-2">
          {/*  Text */}
          {text && <CustomPortableTextExtended value={text} />}
          {/*  Image */}
          {image && (
            <ImageComponent
              image={image}
              placeholderSrc={image.imageData}
              aspectRatioDesktop=""
              aspectRatioMobile=""
              classname="overlay-image "
            />
          )}
        </div>
        <div className="lg:col-span-3 lg:col-start-6">
          {/*  List */}
          {list && list.length > 0 && (
            <ul className="overlay-list pt-12 lg:pt-0">
              {list.map((item, index) => (
                <li
                  key={index}
                  className="!grid grid-cols-3 border-b border-black py-2 first:pt-0 last:border-b-0"
                >
                  {item.text1 && (
                    <p className="text1 col-span-1">
                      {item.text1.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  )}
                  {item.text2 && (
                    <p className="text2 col-span-2">
                      {item.text2.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoBlock
