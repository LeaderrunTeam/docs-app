import type { Theme } from 'vitepress'
import './style.css'
import Layout from './Layout.vue'
import Tooltip from './components/Tooltip.vue'
import DefaultTheme from 'vitepress/theme'
export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    app.component('Tip', Tooltip)

    // router.onBeforeRouteChange = to => {
    //       const mainEl = document.querySelector('.VPContent .container');
    //       console.log(mainEl);
    // }

  }
}satisfies Theme
