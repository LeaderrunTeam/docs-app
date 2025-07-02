import { defineConfig, } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import MarkdownItPlantuml from 'markdown-it-plantuml'

const config =  defineConfig({
  base: '/openapi/',
  title: 'Open Api Docs',
  description: 'Leaderrun Open Api Docs',
  cleanUrls: true,
  ignoreDeadLinks: true,
  lastUpdated: true,
  themeConfig: {
    logo: "https://logistics.leaderrun.com/static/logo/logo.png",
    siteTitle: "<span class='font-extrabold text-gray-900 dark:text-gray-200 tracking-tight'>Open Api Docs</span><div class='sub-title text-xs text-gray-500 dark:text-gray-200'>Shenzhen Leaderrun Transportation Inc. Open Platform Document Center</div>",
    outline: {
      level: 'deep',
      label: '页面导航',
    },
    footer: {message: 'Copyright © 2005 - present 深圳市立航货运股份有限公司', copyright: '<a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备11067407号-1 粤公网安备 44030802000646号</a>'},
    lastUpdated: {
      text: '最后更新于',
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
        href: 'https://logistics.leaderrun.com/static/logo/favicon.ico'
      }
    ]
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
