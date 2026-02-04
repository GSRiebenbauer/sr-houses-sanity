'use client'

import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import LogoIcon from '@/components/shared/ui/LogoIcon'

const Loader = () => {
  const curtainControlsLeft = useAnimation()
  const curtainControlsRight = useAnimation()
  const [logoSize, setLogoSize] = useState<number>()

  // Define variants for the opening animation
  const curtainVariants = {
    openLeft: {
      y: '-100%',
      transition: {
        duration: 2, // 2 seconds for opening
        ease: 'easeInOut',
      },
    },
    openRight: {
      y: '100%',
      transition: {
        duration: 2, // 2 seconds for opening
        ease: 'easeInOut',
      },
    },
  }

  useEffect(() => {
    const sequence = async () => {
      // Step 1: Set initial height to 50vh
      await Promise.all([
        curtainControlsLeft.start({
          height: '50vh',
          transition: { duration: 0.5 }, // 0.5 seconds for initial height
        }),
        curtainControlsRight.start({
          height: '50vh',
          transition: { duration: 0.5 },
        }),
      ])

      // Step 2: Wait for 1 second before changing height
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Step 3: Change height to 48vh
      await Promise.all([
        curtainControlsLeft.start({
          height: '48vh',
          transition: { duration: 0.5 }, // 0.5 seconds for height change
        }),
        curtainControlsRight.start({
          height: '48vh',
          transition: { duration: 0.5 },
        }),
      ])

      // Step 4: Start the opening animation
      await Promise.all([
        curtainControlsLeft.start('openLeft'),
        curtainControlsRight.start('openRight'),
      ])
    }

    sequence()
  }, [curtainControlsLeft, curtainControlsRight])

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
    <div className="fixed inset-0 bg-transparent flex items-center justify-center overflow-hidden ">
      <div className="fixed top-10 right-5 lg:right-10 z-[60]">
        <LogoIcon size={logoSize} />
      </div>
      {/* up Curtain */}
      <motion.div
        className="absolute left-0 top-0 w-full bg-[#C3BBAF] z-50"
        initial={{ height: '50vh' }}
        animate={curtainControlsLeft}
        variants={curtainVariants}
      />

      {/* down Curtain */}
      <motion.div
        className="absolute right-0 bottom-0 w-full bg-[#C3BBAF] z-50"
        initial={{ height: '50vh' }}
        animate={curtainControlsRight}
        variants={curtainVariants}
      />
    </div>
  )
}

export default Loader
