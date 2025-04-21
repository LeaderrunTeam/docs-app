<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import Home from './Home.vue'
import Article from './Article.vue'
import NotFound from './NotFound.vue'
const { page, frontmatter } = useData()
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-before>
      <div class="antialiased">
        <main class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
          <Home v-if="frontmatter.index" />
          <NotFound v-else-if="page.isNotFound" />
          <Article v-else />
        </main>
      </div>
    </template>
  </Layout>
</template>
