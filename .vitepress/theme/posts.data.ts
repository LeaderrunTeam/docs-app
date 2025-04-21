import { createContentLoader } from 'vitepress'

interface ApiDoc {
  title: string
  url: string
  date: string
  sequence: number
  description: string | undefined
}

declare const data: ApiDoc[]
export { data }
export default createContentLoader('docs/*.md', {
  excerpt: true,
  transform(raw): ApiDoc[] {


    return raw
      .map((data) => {
        return {
          title: data.frontmatter.title,
          url: '/openapi' + data.url,
          date: data.frontmatter.date,
          description: data.frontmatter.description,
          sequence: data.frontmatter.sequence
        }
      })
      .sort((a, b) => a.sequence - b.sequence)
  }
})
