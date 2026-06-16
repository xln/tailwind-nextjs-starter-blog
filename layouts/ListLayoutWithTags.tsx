'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import { useTranslations } from 'next-intl'
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/Motion'
import AnimatedBadge from '@/components/AnimatedBadge'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const t = useTranslations('common')
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <nav className="mt-10 flex items-center justify-between">
      {!prevPage && (
        <span className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 opacity-50 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white">
          ← {t('page.prev')}
        </span>
      )}
      {prevPage && (
        <Link
          href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
          rel="prev"
          className="hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-300 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        >
          ← {t('page.prev')}
        </Link>
      )}
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {currentPage} {t('page.of')} {totalPages}
      </span>
      {!nextPage && (
        <span className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 opacity-50 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white">
          {t('page.next')} →
        </span>
      )}
      {nextPage && (
        <Link
          href={`/${basePath}/page/${currentPage + 1}`}
          rel="next"
          className="hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-300 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        >
          {t('page.next')} →
        </Link>
      )}
    </nav>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const t = useTranslations('common')
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <FadeIn>
        <div className="pt-6 pb-6">
          <AnimatedBadge>{title}</AnimatedBadge>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-6xl md:leading-tight dark:text-white">
            {title}
          </h1>
        </div>
      </FadeIn>
      <div className="flex gap-10">
        <aside className="hidden h-fit max-h-[80vh] w-[260px] flex-shrink-0 overflow-auto rounded-2xl border border-gray-200 bg-white/70 p-5 shadow-sm sm:block dark:border-gray-800 dark:bg-gray-900/60">
          {pathname.startsWith('/blog') ? (
            <span className="bg-primary-500/10 text-primary-600 dark:text-primary-300 inline-flex items-center rounded-full px-3 py-1 text-sm font-bold uppercase">
              {t('all_posts')}
            </span>
          ) : (
            <Link
              href={`/blog`}
              className="hover:text-primary-600 dark:hover:text-primary-300 inline-flex items-center rounded-full px-3 py-1 text-sm font-bold text-gray-700 uppercase transition dark:text-gray-300"
            >
              {t('all_posts')}
            </Link>
          )}
          <ul className="mt-4 space-y-2">
            {sortedTags.map((tag) => {
              const isActive = decodeURI(pathname.split('/tags/')[1]) === slug(tag)
              return (
                <li key={tag}>
                  {isActive ? (
                    <span className="bg-primary-500/10 text-primary-600 dark:text-primary-300 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold uppercase">
                      {`${tag} (${tagCounts[tag]})`}
                    </span>
                  ) : (
                    <Link
                      href={`/tags/${slug(tag)}`}
                      className="hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-300 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-gray-600 uppercase transition dark:text-gray-300"
                      aria-label={`View posts tagged ${tag}`}
                    >
                      {`${tag} (${tagCounts[tag]})`}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </aside>
        <StaggerGroup className="min-w-0 flex-1">
          <ul className="space-y-8 pt-2">
            {!displayPosts.length && (
              <li className="py-10 text-center text-gray-500 dark:text-gray-400">
                No posts found.
              </li>
            )}
            {displayPosts.map((post) => {
              const { path, date, title: postTitle, summary, tags } = post
              return (
                <li key={path} className="group">
                  <StaggerItem>
                    <article className="space-y-3 rounded-2xl p-4 transition hover:bg-white/50 dark:hover:bg-gray-900/60">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                        </dd>
                      </dl>
                      <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                          <Link
                            href={`/${path}`}
                            className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-900 transition dark:text-gray-100"
                          >
                            {postTitle}
                          </Link>
                        </h2>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                        </div>
                      </div>
                      <p className="prose max-w-none text-gray-600 dark:text-gray-300">{summary}</p>
                      <div className="text-sm font-medium">
                        <Link
                          href={`/${path}`}
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-1 transition"
                          aria-label={`Read more: "${postTitle}"`}
                        >
                          Read more <span className="transition group-hover:translate-x-1">→</span>
                        </Link>
                      </div>
                    </article>
                  </StaggerItem>
                </li>
              )
            })}
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </StaggerGroup>
      </div>
    </>
  )
}
