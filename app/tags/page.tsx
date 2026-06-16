import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { getTranslations } from 'next-intl/server'
import { genPageMetadata } from 'app/seo'
import AnimatedBadge from '@/components/AnimatedBadge'
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/Motion'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const t = await getTranslations('common')
  const maxCount = sortedTags.length > 0 ? tagCounts[sortedTags[0]] : 1
  return (
    <FadeIn>
      <div className="flex flex-col items-start md:flex-row md:items-center md:justify-start md:gap-10">
        <div className="pt-6 pb-8">
          <AnimatedBadge>{t('menu.tags')}</AnimatedBadge>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-6xl md:leading-tight dark:text-white">
            {t('menu.tags')}
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            浏览所有标签，按主题快速查找你感兴趣的内容。
          </p>
        </div>
      </div>
      {tagKeys.length === 0 ? (
        <p className="py-10 text-center text-gray-500 dark:text-gray-400">No tags found.</p>
      ) : (
        <StaggerGroup className="mt-8 flex flex-wrap gap-3">
          {sortedTags.map((tag) => {
            const weight = 0.85 + (tagCounts[tag] / maxCount) * 0.5
            return (
              <StaggerItem key={tag}>
                <Link
                  href={`/tags/${slug(tag)}`}
                  className="group hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-300 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-200"
                  style={{ fontSize: `${weight}rem` }}
                  aria-label={`View posts tagged ${tag}`}
                >
                  <span className="text-primary-500 group-hover:text-primary-600 dark:text-primary-400 transition">
                    #
                  </span>
                  <span>{tag}</span>
                  <span className="group-hover:bg-primary-500/10 group-hover:text-primary-700 dark:group-hover:text-primary-300 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 transition dark:bg-gray-800 dark:text-gray-400">
                    {tagCounts[tag]}
                  </span>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      )}
      {/* Tag 组件保留以备将来使用 */}
      <div className="hidden">
        <Tag text="" />
      </div>
    </FadeIn>
  )
}
