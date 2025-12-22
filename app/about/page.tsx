import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import { useLocale } from 'next-intl'

export const metadata = genPageMetadata({ title: 'About' })
export default function Page() {
  const locale = useLocale() // 'zh' | 'en'
  const author = allAuthors.find((p) => p.slug === `default.${locale || 'zh'}`) as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
