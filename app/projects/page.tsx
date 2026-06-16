import projectsData from '@/data/projectsData'
import { genPageMetadata } from 'app/seo'
import { getTranslations } from 'next-intl/server'
import Image from '@/components/Image'
import Link from '@/components/Link'
import SpotlightCard from '@/components/SpotlightCard'
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/Motion'
import AnimatedBadge from '@/components/AnimatedBadge'

export const metadata = genPageMetadata({ title: 'Projects' })

export default async function Projects() {
  const t = await getTranslations('common')
  return (
    <>
      <FadeIn className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <AnimatedBadge>{t('menu.projects')}</AnimatedBadge>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-6xl md:leading-tight dark:text-white">
            {t('menu.projects')}
          </h1>
          <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">
            展示我的作品集，探索精选项目和创意实验。
          </p>
        </div>
      </FadeIn>
      <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((d) => (
          <StaggerItem key={d.title}>
            <SpotlightCard className="flex h-full flex-col">
              {d.imgSrc ? (
                <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
                  <Image
                    src={d.imgSrc}
                    alt={d.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    width={640}
                    height={360}
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {d.href ? (
                    <Link
                      href={d.href}
                      className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      aria-label={`Link to ${d.title}`}
                    >
                      {d.title}
                    </Link>
                  ) : (
                    d.title
                  )}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {d.description}
                </p>
                {d.href && (
                  <div className="mt-5 text-sm font-medium">
                    <Link
                      href={d.href}
                      className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-1 transition"
                      aria-label={`Link to ${d.title}`}
                    >
                      Learn more <span aria-hidden>→</span>
                    </Link>
                  </div>
                )}
              </div>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </>
  )
}
