'use client'

import ImageComponent from '@/components/shared/ImageComponent'

export function ImageBlock({ content }) {
  const { layout, images } = content

  const paddingClass = (() => {
    switch (content.padding) {
      case 'large':
        return 'lg:mb-48 mb-12'
      case 'medium':
        return 'lg:mb-[96px] mb-12'
      case 'small':
        return 'lg:mb-[65px] mb-[30px]'
      default:
        return ''
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
    <div>
      {layout === 'layout1' && (
        <div
          className={`${paddingClass}  ${paddingTopClass} ${content.backgroundWhite ? 'bg-white' : ''} image-block flex flex-col lg:grid lg:grid-cols-8 gap-y-8 gap-x-8 px-5 lg:px-10`}
        >
          {images.map((image, index) => (
            <div
              key={image._key}
              className={`${
                index === 0 ? 'lg:col-start-3' : ''
              } lg:col-span-3 layout-1-image-${index}`}
            >
              <ImageComponent
                image={image}
                placeholderSrc={image.imageData}
                aspectRatioDesktop=""
                aspectRatioMobile=""
                classname="max-h-[90vh]"
              />
            </div>
          ))}
        </div>
      )}

      {layout === 'layout2' && (
        <div
          className={`${paddingClass} ${paddingTopClass} ${content.backgroundWhite ? 'bg-white' : ''}  image-block flex flex-col lg:grid lg:grid-cols-8 gap-x-8 px-5 lg:px-10`}
        >
          {images.map((image, index) => (
            <div
              key={image._key}
              className={`${index === 0 ? 'lg:col-start-3' : ''} ${
                index === 1 ? 'lg:col-start-6 lg:mt-40' : ''
              } lg:col-span-2 layout-2-image-${index}`}
            >
              <ImageComponent
                image={image}
                placeholderSrc={image.imageData}
                aspectRatioDesktop=""
                aspectRatioMobile=""
                classname="max-h-[90vh]"
              />
            </div>
          ))}
        </div>
      )}

      {layout === 'layout3' && (
        <div
          className={` ${paddingClass} ${paddingTopClass} ${content.backgroundWhite ? 'bg-white' : ''} image-block flex flex-col lg:grid lg:grid-cols-8 gap-x-8 px-5 lg:px-10`}
        >
          {images.map((image, index) => (
            <div
              key={image._key}
              className={`lg:col-span-6 layout-2-image-${index}`}
            >
              <ImageComponent
                image={image}
                placeholderSrc={image.imageData}
                aspectRatioDesktop=""
                aspectRatioMobile=""
                classname="max-h-[90vh]"
              />
            </div>
          ))}
        </div>
      )}

      {layout === 'layout4' && (
        <div
          className={` ${paddingClass} ${paddingTopClass} ${content.backgroundWhite ? 'bg-white' : ''} image-block flex flex-col lg:grid lg:grid-cols-8 lg:h-[90vh] `}
        >
          {images.map((image, index) => (
            <div
              key={image._key}
              className={`${
                images.length === 1 ? 'lg:col-span-8' : 'lg:col-span-4'
              } h-[90vh] layout-4-image-${index}`}
            >
              <ImageComponent
                image={image}
                placeholderSrc={image.imageData}
                aspectRatioDesktop=""
                aspectRatioMobile=""
                classname=" h-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageBlock
