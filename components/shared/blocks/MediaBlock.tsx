// @ts-nocheck
'use client'

import { useRef, useState, useEffect } from 'react'
import ImageComponent from '@/components/shared/ImageComponent'
import PlayIcon from '../ui/PlayIcon'

export function MediaBlock({ content }) {
  const {
    layout,
    images,
    videoSrc1,
    videoSrc2,
    soundOrVideo1,
    soundOrVideo2,
    text1,
    text2,
  } = content

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

  const mediaSettings = [
    { videoSrc: videoSrc1, isVideo: soundOrVideo1, text: text1 },
    { videoSrc: videoSrc2, isVideo: soundOrVideo2, text: text2 },
  ]

  const audioRefs = useRef([])
  const videoRefs = useRef([])
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null)

  const handlePlay = (index, isVideo) => {
    const refArray = isVideo ? videoRefs : audioRefs
    if (refArray.current[index]) {
      if (currentPlayingIndex !== null && currentPlayingIndex !== index) {
        const currentRefArray = isVideo ? videoRefs : audioRefs
        if (currentRefArray.current[currentPlayingIndex]) {
          currentRefArray.current[currentPlayingIndex].pause()
          currentRefArray.current[currentPlayingIndex].currentTime = 0
        }
      }
      refArray.current[index].play()
      setCurrentPlayingIndex(index)
    }
  }

  const handlePause = (index, isVideo) => {
    const refArray = isVideo ? videoRefs : audioRefs
    if (refArray.current[index]) {
      refArray.current[index].pause()
      setCurrentPlayingIndex(null)
    }
  }

  const togglePlayPause = (index, isVideo) => {
    const refArray = isVideo ? videoRefs : audioRefs
    if (refArray.current[index]) {
      if (refArray.current[index].paused) {
        handlePlay(index, isVideo)
      } else {
        handlePause(index, isVideo)
      }
    }
  }

  useEffect(() => {
    return () => {
      audioRefs.current.forEach((audio) => {
        if (audio) {
          audio.pause()
        }
      })
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause()
        }
      })
    }
  }, [])

  return (
    <div>
      <div
        className={`${paddingClass}  ${paddingTopClass} ${content.backgroundWhite ? 'bg-white' : ''} media-block flex flex-col gap-y-5 lg:gap-y-0 lg:grid lg:grid-cols-8 gap-x-8 px-5 lg:px-10`}
      >
        {images.map((image, index) => {
          const media = mediaSettings[index] || {}
          const isVideo = media.isVideo
          const isSound = media.isVideo === false

          return (
            <div
              key={image._key}
              className={`
                ${index === 0 ? 'lg:col-start-3' : ''}
                ${index === 1 ? 'lg:col-start-6 lg:mt-40' : ''}
                lg:col-span-2
                layout-2-image-${index}
                relative
              `}
              onMouseEnter={() => {
                if (isVideo && videoRefs.current[index]) {
                  handlePlay(index, true)
                } else if (isSound && audioRefs.current[index]) {
                  handlePlay(index, false)
                }
              }}
              onMouseLeave={() => {
                if (isVideo && videoRefs.current[index]) {
                  handlePause(index, true)
                } else if (isSound && audioRefs.current[index]) {
                  handlePause(index, false)
                }
              }}
            >
              {isVideo ? (
                <>
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={media.videoSrc}
                    className="w-full h-auto object-cover aspect-[3/4]"
                  />
                  <button
                    className={`mt-1 cursor-pointer flex flex-row text-[12px] items-baseline gap-x-1  ${
                      currentPlayingIndex === index ? '' : 'playing'
                    }`}
                    aria-label={media.text}
                    onClick={() => togglePlayPause(index, true)}
                  >
                    <PlayIcon size={10} />
                    {currentPlayingIndex === index ? 'Pause' : media.text}
                  </button>
                </>
              ) : (
                <>
                  <ImageComponent
                    image={image}
                    placeholderSrc={image.imageData}
                    aspectRatioDesktop=""
                    aspectRatioMobile=""
                    classname=""
                  />
                  <button
                    className={`mt-1 cursor-pointer flex flex-row items-baseline text-[12px] gap-x-1  ${
                      currentPlayingIndex === index ? '' : ''
                    }`}
                    aria-label={media.text}
                    onClick={() => togglePlayPause(index, false)}
                  >
                    <PlayIcon size={10} />
                    {currentPlayingIndex === index ? 'Pause' : media.text}
                  </button>
                  {isSound && media.videoSrc && (
                    <audio
                      ref={(el) => (audioRefs.current[index] = el)}
                      src={media.videoSrc}
                      preload="auto"
                      onEnded={() => setCurrentPlayingIndex(null)}
                    />
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MediaBlock
