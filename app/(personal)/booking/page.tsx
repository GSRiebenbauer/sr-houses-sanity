import React from 'react'
import type { Metadata, ResolvingMetadata } from 'next'
import { toPlainText } from 'next-sanity'
import BookingPageContent from '@/components/pages/booking/BookingPageContent'

import { loadBooking, loadSettings } from '@/sanity/loader/loadQuery'

// import { loadContactPage } from '@/sanity/loader/loadQuery'
// import { ContactPageContent } from '@/components/pages/contact/ContactPageContent'

// type Props = {
//   params: { slug: string }
// }

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   const { data: page } = await loadContactPage()

//   return {
//     title: page?.title,
//     description: page?.overview
//       ? toPlainText(page.overview)
//       : (await parent).description,
//   }
// }

export default async function BookingPage() {
  const initial = await loadSettings()

  const initialBooking = await loadBooking()

  // const response = await loadContactPage()
  // const contactData = response?.data ?? null

  return (
    <div>
      <BookingPageContent bookings={initialBooking} data={initial.data} />
      {/* <ContactPageContent data={contactData} /> */}
    </div>
  )
}
