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
    .map(path => pages.find(page => page.path === path))
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
