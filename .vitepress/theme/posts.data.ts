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

export default createContentLoader('apis/*.md', {
  excerpt: true,
  transform(raw): ApiDoc[] {
    return raw
      .map(({ url, frontmatter }) => {
        return {
          title: frontmatter.title,
          url,
          date: frontmatter.date,
          description: frontmatter.description,
          sequence: frontmatter.sequence
        }
      })
      .sort((a, b) => a.sequence - b.sequence)
  }
})
