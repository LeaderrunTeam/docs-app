import type { Theme } from 'vitepress'
import './style.css'
import Layout from './Layout.vue'
import Tooltip from './components/Tooltip.vue'
import DefaultTheme from 'vitepress/theme'
export default {
  ...DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    ctx.app.component('Tip', Tooltip)
    DefaultTheme.enhanceApp(ctx)
  }
}satisfies Theme
