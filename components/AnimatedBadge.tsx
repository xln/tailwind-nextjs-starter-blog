'use client'

import { motion, useReducedMotion } from 'motion/react'
import { type ReactNode } from 'react'

interface AnimatedBadgeProps {
  children: ReactNode
  className?: string
}

export function AnimatedBadge({ children, className = '' }: AnimatedBadgeProps) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      className={
        'border-primary-500/30 bg-primary-500/10 text-primary-700 dark:text-primary-300 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ' +
        className
      }
      initial={reduce ? false : { opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative flex h-2 w-2">
        <motion.span
          aria-hidden
          className="bg-primary-500 absolute inline-flex h-full w-full rounded-full opacity-70"
          animate={reduce ? undefined : { scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <span className="bg-primary-500 relative inline-flex h-2 w-2 rounded-full" />
      </span>
      {children}
    </motion.span>
  )
}

export default AnimatedBadge
