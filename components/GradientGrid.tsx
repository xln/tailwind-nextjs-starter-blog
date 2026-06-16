'use client'

import { motion, useReducedMotion } from 'motion/react'
import { type ReactNode } from 'react'

interface GradientGridProps {
  children: ReactNode
  className?: string
}

export function GradientGrid({ children, className = '' }: GradientGridProps) {
  const reduce = useReducedMotion()
  return (
    <div className={`relative isolate overflow-hidden rounded-3xl ${className}`}>
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        animate={
          reduce
            ? undefined
            : {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }
        }
        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
        style={{
          backgroundImage:
            'linear-gradient(120deg, rgba(139,92,246,0.18), rgba(236,72,153,0.14), rgba(59,130,246,0.18), rgba(16,185,129,0.14), rgba(139,92,246,0.18))',
          backgroundSize: '200% 200%',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />
      {children}
    </div>
  )
}

export default GradientGrid
