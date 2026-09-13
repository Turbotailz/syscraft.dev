export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://syscraft.dev'
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3
        }
      }
    },
    experimental: {
      sqliteConnector: 'native'
    }
  },

  experimental: {
    asyncContext: true
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    },
    cloudflare: {
      nodeCompat: true
    }
  },

  routeRules: {
    '/en/starter-server/': { redirect: '/en/starter-server' },
    '/en/getting-players/': { redirect: '/en/getting-players' },
    '/en/server-software/': { redirect: '/en/server-software' },
    '/en/recommended-plugins/': { redirect: '/en/recommended-plugins' },
    '/en/server-security/': { redirect: '/en/server-security' },
    '/en/server-hosting/': { redirect: '/en/server-hosting' },
    '/en/server-performance/': { redirect: '/en/server-performance' }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  llms: {
    domain: 'https://syscraft.dev',
    title: 'Syscraft',
    description: 'Guides for Minecraft server admins, developers, and hosts.',
    full: {
      title: 'Syscraft wiki',
      description: 'Community guides for creating, maintaining, and growing Minecraft servers.'
    },
    sections: [
      {
        title: 'Guides',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/en/%' }
        ]
      }
    ]
  },

  ogImage: {
    zeroRuntime: true
  }
})
