'use client'

import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { useCallback, useRef, type ReactNode, type MouseEvent } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
}

export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const maskImage = useMotionTemplate`radial-gradient(180px circle at ${mouseX}px ${mouseY}px, rgb(0 0 0 / 0.5), transparent 75%)`

  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white/60 shadow-sm transition-shadow hover:shadow-xl dark:border-gray-700/70 dark:bg-gray-900/50 ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background:
            'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(236,72,153,0.14) 40%, rgba(59,130,246,0.14) 80%)',
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default SpotlightCard
