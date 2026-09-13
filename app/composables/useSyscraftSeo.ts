import type { UseSeoMetaInput } from '@unhead/vue'

export const SITE_URL = 'https://syscraft.dev'

export function canonicalUrl(path: string) {
  if (path === '/') {
    return `${SITE_URL}/`
  }
  return `${SITE_URL}${path.replace(/\/$/, '')}/`
}

export function useSyscraftSeo(opts: {
  title: string
  description?: string
  path?: string
  titleTemplate?: string | null
  eyebrow?: string
  ogType?: 'website' | 'article'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  noIndex?: boolean
}) {
  const route = useRoute()
  const { seo } = useAppConfig()
  const path = opts.path ?? route.path
  const url = canonicalUrl(path)
  const description = opts.description || ''
  const siteName = seo?.siteName || 'Syscraft'

  const meta: UseSeoMetaInput = {
    title: opts.title,
    description,
    ogTitle: opts.title,
    ogDescription: description,
    ogUrl: url,
    ogType: opts.ogType || 'website',
    ogSiteName: siteName,
    ogLocale: 'en_AU',
    twitterCard: 'summary_large_image',
    twitterTitle: opts.title,
    twitterDescription: description
  }

  if (opts.titleTemplate !== undefined) {
    meta.titleTemplate = opts.titleTemplate
  }

  if (opts.noIndex) {
    meta.robots = 'noindex, nofollow'
  }

  useSeoMeta(meta)

  useHead({
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'theme-color', content: '#0ea5e9' }
    ]
  })

  if (opts.jsonLd) {
    const payload = Array.isArray(opts.jsonLd)
      ? { '@context': 'https://schema.org', '@graph': opts.jsonLd }
      : opts.jsonLd
    useHead({
      script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify(payload)
      }]
    })
  }

  defineOgImage('Syscraft', {
    title: opts.title,
    description,
    eyebrow: opts.eyebrow ?? siteName
  }, {
    alt: opts.title === siteName
      ? 'Syscraft — Minecraft server community wiki'
      : `${opts.title} — Syscraft`,
    width: 1200,
    height: 630
  })
}
