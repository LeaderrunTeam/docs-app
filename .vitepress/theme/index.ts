import type { Theme } from 'vitepress'
import './style.css'
import Layout from './Layout.vue'
import Tooltip from './components/Tooltip.vue'
import Download from './components/Download.vue'
import DefaultTheme from 'vitepress/theme'
export default {
  ...DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)

    ctx.app.component('Tip', Tooltip)
    ctx.app.component('Download', Download)
    ctx.app.mixin({
      mounted() {
         document.querySelector('.content-container .main')?.remove()
      }
    })

  }
} satisfies Theme
