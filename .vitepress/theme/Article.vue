<script setup lang="ts">
import Date from './Date.vue'
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

import { data as posts } from './posts.data.js'

const { frontmatter: data, page } = useData()

const route = useRoute()

function findCurrentIndex() {
  return posts.findIndex((p) => p.url === route.path)
}



const nextPost = computed(() => posts[findCurrentIndex() - 1])
const prevPost = computed(() => posts[findCurrentIndex() + 1])
</script>

<template>
  <article class="xl:divide-y xl:divide-gray-200 dark:xl:divide-slate-200/5 prose dark:prose-invert">
    <header class="pt-6 xl:pb-10 space-y-1 text-center grid grid-cols-3"
      style="grid-template-columns: 100px auto 100px;">

      <div v-if="nextPost" class="py-8">
        <h2 class="text-xs tracking-wide uppercase text-gray-500 dark:text-white">
          Previous doc
        </h2>
        <div class="link">
          <a class="not-prose" :href="nextPost.url">{{ nextPost.title }}</a>
        </div>
      </div>
      <div v-else></div>

      <div>
        <h1
          class="text-3xl leading-9 font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          {{ data.title }}
        </h1>
        <Date :date="page.lastUpdated || data.date" />
      </div>

      <div v-if="prevPost" class="py-8">
        <h2 class="text-xs tracking-wide uppercase text-gray-500 dark:text-white">
          Next Doc
        </h2>
        <div class="link">
          <a class="not-prose" :href="prevPost.url">{{ prevPost.title }}</a>
        </div>
      </div>
      <div v-else></div>
    </header>
    <!-- <div class="pb-16 xl:pb-20">
      <div class="divide-y divide-gray-200 dark:divide-slate-200/5 xl:pb-0 xl:col-span-3 xl:row-span-2">
        <Content class="prose dark:prose-invert max-w-none pt-10 pb-8" />
      </div>
    </div> -->
  </article>
</template>
