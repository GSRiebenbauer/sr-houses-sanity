'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'
import LogoIcon from '@/components/shared/ui/LogoIcon'
import PlusIconMenu from '@/components/shared/ui/PlusIconMenu'
import { usePathname } from 'next/navigation'

interface NavbarProps {
  data: SettingsPayload
}

export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])
  const [logoSize, setLogoSize] = useState<number>(220)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const path = usePathname()

  useEffect(() => {
    if (path === '/booking') {
      document.body.style.overflow = 'hidden'
      document.body.style.backgroundColor = 'white'

      setIsScrolled(true)
      return () => {
        document.body.style.overflow = ''
        document.body.style.backgroundColor = ''
      }
    }
  }, [path])

  useEffect(() => {
    if (path === '/') {
      const handleScroll = () => {
        setIsScrolled(window.scrollY >= window.innerHeight)
      }
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    } else {
      setIsScrolled(true)
    }
  }, [path])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.classList.toggle('fixed')
  }
  const closeMenu = () => {
    setIsMenuOpen(false)
    if (document.body.classList.contains('fixed')) {
      document.body.classList.remove('fixed')
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setLogoSize(window.innerWidth < 1024 ? 150 : 220)
    }

    // Set the initial size on mount
    handleResize()

    // Add resize event listener
    window.addEventListener('resize', handleResize)

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <div
        className={` navbarLayout fixed z-[40] top-0 w-full flex justify-between items-start px-5 lg:px-10 pt-10`}
      >
        <div className=" relative ">
          <Link href="/">
            <LogoIcon
              color={isMenuOpen || isScrolled ? 'black' : 'white'}
              size={logoSize}
            />
          </Link>
        </div>
        <div
          onClick={toggleMenu}
          className={`z-40 lg:hidden menuButtons translate-x-[10px] translate-y-[-8px]`}
        >
          <PlusIconMenu
            size={43}
            rotation={isMenuOpen ? 45 : 0}
            color={isMenuOpen || isScrolled ? 'black' : 'white'}
          />
        </div>
        <div
          className={`text-${isScrolled ? 'black' : 'white'} transition-all hidden menuButtons lg:flex text-[16px] flex-row space-x-10`}
        >
          <Link href="/house">House</Link>
          <Link href="/booking">Book</Link>
          <Link href="/prices">Prices</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed text-black h-screen bg-white/30 backdrop-blur-[45px] flex flex-col top-0 left-0 w-full z-[30]  p-5">
          <div className="flex flex-col text-[35px] leading-[35px] mt-32">
            <Link onClick={toggleMenu} href="/house">
              House
            </Link>
            <Link onClick={toggleMenu} href="/booking">
              Book
            </Link>
            <Link onClick={toggleMenu} href="/prices">
              Prices
            </Link>
            <Link onClick={toggleMenu} href="/contact">
              Contact
            </Link>

            <a href="https://www.instagram.com/studioriebenbauer/">Instagram</a>
          </div>
          <div className="flex flex-col text-[35px] leading-[35px] mt-12">
            <a href="http://sr-world.co">SR World</a>
            <a href="https://www.sr-products.co/">SR Products</a>
          </div>
          <div className="flex flex-col text-[22px] leading-[22px] mt-20">
            <Link onClick={toggleMenu} href="/imprint">
              Imprint
            </Link>
            <Link onClick={toggleMenu} href="/privacy-policy">
              Privacy Policy
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
