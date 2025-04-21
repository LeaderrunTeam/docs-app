import './style.css'
import Layout from './Layout.vue'
import Tooltip from './components/Tooltip.vue'
export default {
  Layout,
  enhanceApp({ app }) {
    app.component('Tip', Tooltip)
}
}
