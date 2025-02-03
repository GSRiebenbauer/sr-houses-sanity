'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'
import LogoIcon from '@/components/shared/ui/LogoIcon'

interface NavbarProps {
  data: SettingsPayload
}

export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])
  const [logoSize, setLogoSize] = useState<number>(191)

  useEffect(() => {
    const handleResize = () => {
      setLogoSize(window.innerWidth < 1024 ? 150 : 191)
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
    <div className="fixed top-0 w-full flex justify-between items-start px-5 lg:px-10 pt-10">
      <div className="translate-y-[-12px]">Menu</div>
      <div className="z-[60] relative ">
        <Link href="/">
          <LogoIcon size={logoSize} />
        </Link>
      </div>
    </div>
  )
}
