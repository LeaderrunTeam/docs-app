import { defineConfig, } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import MarkdownItPlantuml from 'markdown-it-plantuml'

const config =  defineConfig({
  base: '/openapi/',
  title: 'Open Api Docs',
  description: 'Leaderrun Open Api Docs',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: "/logo.png",
    siteTitle: "<span class='font-extrabold text-gray-900 dark:text-white tracking-tight'>Open Api Docs</span><div class='text-xs text-gray-500 dark:text-white'>Shenzhen Leaderrun Transportation Inc. Open Platform Document Center</div>",
    outline: {
      level: 'deep',
      label: '目录',
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    search: {
      provider: 'local'
    }
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
  ],
  markdown: {
    config(md) {
      md.use(MarkdownItPlantuml)
    },
    math: true,
    image: {
      lazyLoading: true
    }
  },
  vite: {

  },
})
export default withMermaid({
  ...config,
  mermaid: {}
})
