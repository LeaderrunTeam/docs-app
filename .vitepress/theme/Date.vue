<script setup lang="ts">
import dayjs from 'dayjs'
import { onMounted, shallowRef } from 'vue';
const props = defineProps<{ date: string | number }>()
const date = shallowRef<string>('')
onMounted(() => {
  date.value = dayjs(props.date).format("YYYY-MM-DD")
})

</script>

<template>
  <dl>
    <dt class="sr-only">Published on</dt>
    <dd class="text-base leading-6 font-medium text-gray-500 dark:text-gray-300">
      <span>{{ date }}</span>
    </dd>
  </dl>
</template>
