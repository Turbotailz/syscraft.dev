import type { ContentNavigationItem } from '@nuxt/content'

const ADMIN_PATHS = [
  '/en/starter-server',
  '/en/getting-players',
  '/en/server-software',
  '/en/recommended-plugins',
  '/en/server-security'
]

const HOST_PATHS = [
  '/en/server-hosting',
  '/en/server-performance'
]

const NAV_TITLES: Record<string, string> = {
  '/en/starter-server': 'Starter Server',
  '/en/getting-players': 'Getting Players',
  '/en/server-software': 'Server Software',
  '/en/recommended-plugins': 'Recommended Plugins',
  '/en/server-security': 'Server Security',
  '/en/server-hosting': 'Choosing a Host',
  '/en/server-performance': 'Server Performance'
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
  '/en/starter-server': 'i-lucide-rocket',
  '/en/getting-players': 'i-lucide-users',
  '/en/server-software': 'i-lucide-boxes',
  '/en/recommended-plugins': 'i-lucide-puzzle',
  '/en/server-security': 'i-lucide-shield-check',
  '/en/server-hosting': 'i-lucide-cloud',
  '/en/server-performance': 'i-lucide-gauge'
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
      path: '/en/starter-server',
      children: pick(ADMIN_PATHS)
    },
    {
      title: 'Host',
      path: '/en/server-hosting',
      children: pick(HOST_PATHS)
    }
  ]
}
