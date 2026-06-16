'use client'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { useTranslations } from 'next-intl'
import { FadeIn, StaggerGroup, StaggerItem, Tilt } from '@/components/Motion'
import AnimatedBadge from '@/components/AnimatedBadge'
import GradientGrid from '@/components/GradientGrid'

const MAX_DISPLAY = 5

interface BlogPost {
  slug: string
  date: string
  title: string
  summary?: string
  tags: string[]
}

export default function Home({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations('common')
  return (
    <>
      <GradientGrid className="mt-6 mb-12 md:mt-10">
        <FadeIn className="mx-auto max-w-4xl px-6 py-16 text-center md:py-24">
          <AnimatedBadge>{t('latest')}</AnimatedBadge>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl md:leading-tight dark:text-white">
            {`${siteMetadata.title}`}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            {siteMetadata.description}
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/blog"
              className="hover:bg-primary-600 focus-visible:outline-primary-500 dark:hover:bg-primary-400 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-white dark:text-gray-900"
            >
              {t('all_posts')} →
            </Link>
            <Link
              href="/projects"
              className="hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-300 rounded-full border border-gray-300 bg-white/70 px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:scale-[1.02] dark:border-gray-700 dark:bg-gray-900/60 dark:text-white"
            >
              {t('menu.projects')}
            </Link>
          </div>
        </FadeIn>
      </GradientGrid>

      <StaggerGroup className="divide-y divide-gray-200 dark:divide-gray-700">
        <ul className="space-y-10 divide-y divide-gray-200 pt-6 dark:divide-gray-700">
          {!posts.length && (
            <li className="py-10 text-center text-gray-500 dark:text-gray-400">No posts found.</li>
          )}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="pt-10 first:pt-0">
                <StaggerItem>
                  <Tilt className="group rounded-2xl p-4 transition hover:bg-white/60 dark:hover:bg-gray-900/60">
                    <article>
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="mt-2">
                        <h2 className="text-2xl font-bold tracking-tight transition-colors">
                          <Link
                            href={`/blog/${slug}`}
                            className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-900 transition dark:text-gray-100"
                          >
                            {title}
                          </Link>
                        </h2>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <p className="prose mt-4 max-w-none text-gray-600 dark:text-gray-300">
                        {summary}
                      </p>
                      <div className="mt-4 text-base font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-1 transition"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more <span className="transition group-hover:translate-x-1">→</span>
                        </Link>
                      </div>
                    </article>
                  </Tilt>
                </StaggerItem>
              </li>
            )
          })}
        </ul>
      </StaggerGroup>

      {posts.length > MAX_DISPLAY && (
        <div className="mt-10 flex justify-end">
          <Link
            href="/blog"
            className="hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-300 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm transition hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            aria-label={t('all_posts')}
          >
            {t('all_posts')} →
          </Link>
        </div>
      )}

      {siteMetadata.newsletter?.provider && (
        <div className="mt-10 flex items-center justify-center">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
