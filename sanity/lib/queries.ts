import { groq } from 'next-sanity'

export const bookingQuery = groq`
*[_type == "booking"]{
  status,
  from,
  to
}
`

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    bannerText,
    disableBanner,
    video,
    videoMobile,
    videoPosterMobileUrl,
    videoPosterDesktopUrl,
    "videoPosterDesktopData": videoPosterDesktopUrl.asset->metadata,
    "videoPosterMobileData": videoPosterMobileUrl.asset->metadata,
    contentBlocks[]{
      _type,
      _key,
      // TextBlock query
      _type == "textBlock" => {
      backgroundWhite,
      paddingTop,
      padding,
      headline,
      text
      },
      // CTA BLock query
      _type == "CTABlock" => {
      backgroundWhite,
      paddingTop,
      padding,
      headline,
      link,
      },
      // ImageBlock query
      _type == "imageBlock" => {
      backgroundWhite,
      padding,
      paddingTop,
        layout,
        images[]{
          _key,
          asset,
          "imageData": asset->metadata
        }
      },
      // ContentWithOverlay query
        _type == "contentWithOverlay" => {
        padding,
        paddingTop,
        images[]{
          _key,
          asset,
          "imageData": asset->metadata
        },
        imageDescription_1,
        imageDescription_2,
        imageLink_1,
        imageLink_2,
        headline,
        overlayTab{
          headline,
          locations,
          overlayImage{
            asset,
            "imageData": asset->metadata
          },
          text
        },
        text
      },
      // ContentWithOverlay2 query
      _type == "contentWithOverlay2" => {
      padding,
      paddingTop,
        image{
          asset,
          "imageData": asset->metadata
        },
        headline,
        overlayTab{
          headline,
          list,
          image{
            asset,
            "imageData": asset->metadata
          },
          text
        },
        text
      },
      // MediaBlock query
      _type == "mediaBlock" => {
        padding,
        paddingTop,
        backgroundWhite,
        images[]{
          _key,
          asset,
          "imageData": asset->metadata
        },
        videoSrc1,
        soundOrVideo1,
        videoPoster1,
        videoPoster2,
        "videoPoster2Url": videoPoster2.asset->url,
        "videoPoster1Url": videoPoster1.asset->url,
        soundOrVideo2,
        videoSrc2,
        text2,
        text1,
      },
      // InfoBlock query
      _type == "infoBlock" => {
        padding,
        paddingTop,
        backgroundWhite,
        headline,
        text,
        image{
          asset,
          "imageData": asset->metadata
        },
        list[]{
          text1,
          text2
        }
      },
      // ImageTextBlock query
      _type == "imageTextBlock" => {
        padding,
        paddingTop,
        backgroundWhite,
        swap,
        headline,
        image{
          asset,
          "imageData": asset->metadata
        },
        text,
        text1,
        text2,
        text3
      }
    },
    title,
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
    contentBlocks[]{
      _type,
      _key,
      // TextBlock query
      _type == "textBlock" => {
      backgroundWhite,
      paddingTop,
      padding,
      headline,
      text
      },
      // CTA BLock query
      _type == "CTABlock" => {
      backgroundWhite,
      paddingTop,
      padding,
      headline,
      link,
      },
      // ImageBlock query
      _type == "imageBlock" => {
      backgroundWhite,
      padding,
      paddingTop,
        layout,
        images[]{
          _key,
          asset,
          "imageData": asset->metadata
        }
      },
      // ContentWithOverlay query
        _type == "contentWithOverlay" => {
        padding,
        paddingTop,
        images[]{
          _key,
          asset,
          "imageData": asset->metadata
        },
        imageDescription_1,
        imageDescription_2,
        imageLink_1,
        imageLink_2,
        headline,
        overlayTab{
          headline,
          locations,
          overlayImage{
            asset,
            "imageData": asset->metadata
          },
          text
        },
        text
      },
      // ContentWithOverlay2 query
      _type == "contentWithOverlay2" => {
      padding,
      paddingTop,
        image{
          asset,
          "imageData": asset->metadata
        },
        headline,
        overlayTab{
          headline,
          list,
          image{
            asset,
            "imageData": asset->metadata
          },
          text
        },
        text
      },
      // MediaBlock query
      _type == "mediaBlock" => {
        padding,
        paddingTop,
        backgroundWhite,
        images[]{
          _key,
          asset,
          "imageData": asset->metadata
        },
        videoSrc1,
        soundOrVideo1,
        soundOrVideo2,
        videoSrc2,
        text2,
        text1,
      },
      // InfoBlock query
      _type == "infoBlock" => {
        padding,
        paddingTop,
        backgroundWhite,
        headline,
        text,
        image{
          asset,
          "imageData": asset->metadata
        },
        list[]{
          text1,
          text2
        }
      },
      // ImageTextBlock query
      _type == "imageTextBlock" => {
        padding,
        paddingTop,
        backgroundWhite,
        swap,
        headline,
        image{
          asset,
          "imageData": asset->metadata
        },
        text,
        text1,
        text2,
        text3
      }
    },
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
   
    additionalText,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    image{
          asset,
          "imageData": asset->metadata
    },
    pricesList[]{
      text1,
      text2,
      text3
    }
  }
`
