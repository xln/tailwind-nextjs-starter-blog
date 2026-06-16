import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { AnimateIn, AnimateBubble } from '@/components/AnimateIn'
import AnimatedBadge from '@/components/AnimatedBadge'
import { getTranslations } from 'next-intl/server'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default async function AuthorLayout({ children, content }: Props) {
  const t = await getTranslations('common')
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <>
      <AnimateIn className="pb-8">
        <div className="pt-6 pb-2">
          <AnimatedBadge>{t('menu.about')}</AnimatedBadge>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-6xl md:leading-tight dark:text-white">
          {t('menu.about')}
        </h1>
      </AnimateIn>
      <div className="items-start gap-10 md:grid md:grid-cols-3 md:gap-x-8">
        <AnimateIn delay={0.1} className="flex flex-col items-center pt-6">
          <AnimateBubble className="ring-primary-500/10 rounded-full ring-4 ring-offset-4 ring-offset-white dark:ring-offset-gray-950">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full object-cover"
              />
            )}
          </AnimateBubble>
          <h3 className="pt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h3>
          <div className="mt-1 text-gray-500 dark:text-gray-400">{occupation}</div>
          <div className="text-gray-500 dark:text-gray-400">{company}</div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <SocialIcon kind="mail" href={`mailto:${email}`} />
            <SocialIcon kind="github" href={github} />
            <SocialIcon kind="linkedin" href={linkedin} />
            <SocialIcon kind="x" href={twitter} />
            <SocialIcon kind="bluesky" href={bluesky} />
          </div>
        </AnimateIn>
        <AnimateIn
          delay={0.2}
          className="prose dark:prose-invert max-w-none pt-6 pb-8 md:col-span-2"
        >
          {children}
        </AnimateIn>
      </div>
    </>
  )
}
