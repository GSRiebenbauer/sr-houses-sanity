'use client'

import { CustomPortableTextExtended } from '@/components/shared/CustomPortableTextExtended'

const BannerSection = ({ data }) => {
  return (
    <>
      {!data.disableBanner && (
        <div className="absolute bottom-[150px] px-5 lg:px-10 bannerSection z-30 text-white">
          <CustomPortableTextExtended value={data.bannerText} />
        </div>
      )}
    </>
  )
}

export default BannerSection
