'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { useTranslations } from 'next-intl'

const Header = () => {
  const t = useTranslations('common')
  let headerClass =
    'flex w-full items-center justify-between gap-4 py-6 backdrop-blur dark:bg-gray-950/70'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800/60'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center gap-3">
        <Logo />
        {typeof siteMetadata.headerTitle === 'string' && (
          <span className="hover:text-primary-600 dark:hover:text-primary-300 hidden text-xl font-semibold tracking-tight text-gray-900 transition sm:block dark:text-white">
            {siteMetadata.headerTitle}
          </span>
        )}
      </Link>
      <div className="flex items-center gap-1 sm:gap-3">
        <nav className="no-scrollbar hidden max-w-md items-center gap-1 overflow-x-auto sm:flex md:gap-2">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-300 rounded-full px-3 py-2 text-sm font-medium text-gray-700 transition dark:text-gray-200"
              >
                {t(`menu.${link.title}`)}
              </Link>
            ))}
        </nav>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
