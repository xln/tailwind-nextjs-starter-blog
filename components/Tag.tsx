'use client'

import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="border-primary-500/30 bg-primary-500/5 text-primary-700 hover:border-primary-500 hover:bg-primary-500/10 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition hover:-translate-y-0.5"
    >
      <span className="text-primary-500/70 dark:text-primary-400/70 mr-1">#</span>
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
