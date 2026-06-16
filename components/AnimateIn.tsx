'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

interface AnimateInProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function AnimateIn({ children, delay = 0, className = '' }: AnimateInProps) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface AnimateBubbleProps {
  children: ReactNode
  className?: string
}

export function AnimateBubble({ children, className = '' }: AnimateBubbleProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {children}
    </motion.div>
  )
}
