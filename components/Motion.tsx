'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import { type ReactNode } from 'react'

type FadeInProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  delay?: number
  y?: number
}

export function FadeIn({ children, delay = 0, y = 24, ...rest }: FadeInProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

type StaggerProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  stagger?: number
}

export function StaggerGroup({ children, stagger = 0.08, ...rest }: StaggerProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: 0.04 } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

type StaggerItemProps = HTMLMotionProps<'div'> & {
  children: ReactNode
}

export function StaggerItem({ children, ...rest }: StaggerItemProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

type TiltProps = {
  children: ReactNode
  className?: string
  intensity?: number
}

export function Tilt({ children, intensity = 8, className = '' }: TiltProps) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      whileHover={{ rotateX: -intensity / 4, rotateY: intensity / 4, y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}
