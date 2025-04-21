import tailwind from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography'

export default {
  plugins: [
    tailwind({
      darkMode: ['class'],
      content: ['./.vitepress/theme/**/*.vue'],
      plugins: [tailwindTypography()]
    }),
  ]
}
