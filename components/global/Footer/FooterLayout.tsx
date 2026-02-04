'use client'
import type { PortableTextBlock } from 'next-sanity'
import { CustomPortableText } from '@/components//shared/CustomPortableText'
import type { SettingsPayload } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface FooterProps {
  data: SettingsPayload
}

export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])
  const path = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Only apply scroll logic on home page
    if (path !== '/') {
      setIsScrolled(false)
      return
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 25)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [path])

  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight, // 100vh
      behavior: 'smooth',
    })
  }

  return (
    <>
      <div
        onClick={handleScrollDown}
        className={`${path === '/' ? (isScrolled ? 'hidden' : '') : 'hidden'} transition-all cursor-pointer lg:hidden fixed bottom-[100px] left-0 text-white px-5`}
        style={{
          animation: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      >
        Scroll down ↓
      </div>
      <footer
        className={`${path === '/booking' ? 'hidden' : 'lg:block'} hidden `}
      >
        <section
          className={`
          ${
            path === '/'
              ? `text-${isScrolled ? 'black translate-y-[0px]' : 'white translate-y-[-50px]'}`
              : 'text-black translate-y-[0px]'
          } 
          transition-all fixed bottom-0 z-40 left-0 grid w-full grid-cols-12 items-end px-5 pb-7 lg:px-10
        `}
        >
          <a
            className="col-span-2"
            href="https://www.instagram.com/studioriebenbauer/"
          >
            Instagram
          </a>
          <div
            onClick={handleScrollDown}
            className={`col-span-2 ${path === '/' ? (isScrolled ? 'hidden' : '') : 'hidden'} transition-all cursor-pointer`}
            style={{
              animation: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          >
            Scroll down ↓
          </div>
          <div className="col-span-2 col-start-9 flex flex-col">
            <a href="http://sr-world.co">SR World</a>
            <a href="https://www.sr-products.co/">SR Products</a>
          </div>
          <div className="col-span-2 col-start-11 flex justify-end space-x-12">
            <Link href="/imprint">Imprint</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </section>
      </footer>
    </>
  )
}
