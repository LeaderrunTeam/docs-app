<script setup lang="ts">
import { data as posts } from './posts.data.js'
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div class="divide-y divide-gray-200 dark:divide-slate-200/5">
    <div class="pt-6 pb-8 space-y-2 md:space-y-5">
      <h1
        class="text-3xl leading-9 font-extrabold text-gray-900 dark:text-gray-200 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        {{ frontmatter.title }}
      </h1>

      <p class="text-lg leading-7 text-gray-500 dark:text-gray-200">
        {{ frontmatter.subtext }}
      </p>
    </div>
    <ul class="not-prose divide-y divide-gray-200 dark:divide-slate-200/5">
      <li class="not-prose py-12" v-for="{ title, url, description, tags } of posts">
        <article class="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
          <div class="space-y-5 xl:col-span-3">
            <div class="space-y-6">
              <div class="flex">
                <h2 class="not-prose text-2xl leading-8 font-bold tracking-tight">
                  <a class="not-prose text-gray-800 dark:text-gray-100" :href="url">{{ title }}</a>
                </h2>
                <div class="ml-3 flex items-center">
                  <div v-for="tag in tags" class="mr-2">
                    <Badge :type="tag.type" :text="tag.text" />
                  </div>
                </div>
              </div>
              <div v-if="description" class="max-w-none text-gray-500 dark:text-gray-300" v-html="description"></div>
            </div>
            <div class="text-base leading-6 font-medium">
              <a class="not-prose link" aria-label="read more" :href="url">Read more →</a>
            </div>
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>
