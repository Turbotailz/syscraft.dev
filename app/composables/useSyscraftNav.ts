import type { ContentNavigationItem } from '@nuxt/content'

const ADMIN_PATHS = [
  '/starter-server',
  '/getting-players',
  '/server-software',
  '/recommended-plugins',
  '/server-security'
]

const HOST_PATHS = [
  '/server-hosting',
  '/server-performance'
]

const NAV_TITLES: Record<string, string> = {
  '/starter-server': 'Starter Server',
  '/getting-players': 'Getting Players',
  '/server-software': 'Server Software',
  '/recommended-plugins': 'Recommended Plugins',
  '/server-security': 'Server Security',
  '/server-hosting': 'Choosing a Host',
  '/server-performance': 'Server Performance'
}

export const GUIDE_SECTIONS = [
  {
    title: 'Admin',
    description: 'Stand up a server, pick software, and keep players around.',
    paths: ADMIN_PATHS
  },
  {
    title: 'Host',
    description: 'Choose hardware and keep TPS stable.',
    paths: HOST_PATHS
  }
] as const

export const GUIDE_ICONS: Record<string, string> = {
  '/starter-server': 'i-lucide-rocket',
  '/getting-players': 'i-lucide-users',
  '/server-software': 'i-lucide-boxes',
  '/recommended-plugins': 'i-lucide-puzzle',
  '/server-security': 'i-lucide-shield-check',
  '/server-hosting': 'i-lucide-cloud',
  '/server-performance': 'i-lucide-gauge'
}

export function navTitleFor(path: string, fallback?: string) {
  return NAV_TITLES[path] || fallback || path
}

function flattenPages(items: ContentNavigationItem[]): ContentNavigationItem[] {
  const out: ContentNavigationItem[] = []
  for (const item of items) {
    if (item.children?.length) {
      out.push(...flattenPages(item.children))
    } else if (item.path) {
      out.push(item)
    }
  }
  return out
}

export function groupDocsNavigation(items: ContentNavigationItem[] | null | undefined): ContentNavigationItem[] {
  const pages = flattenPages(items || [])
  const pick = (paths: string[]) => paths
    .map((path) => {
      const page = pages.find(item => item.path === path)
      if (!page) {
        return undefined
      }
      return {
        ...page,
        title: NAV_TITLES[path] || page.title
      }
    })
    .filter((page): page is ContentNavigationItem => Boolean(page))

  return [
    {
      title: 'Admin',
      path: '/starter-server',
      children: pick(ADMIN_PATHS)
    },
    {
      title: 'Host',
      path: '/server-hosting',
      children: pick(HOST_PATHS)
    }
  ]
}
