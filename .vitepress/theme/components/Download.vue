<template>
    <span @click="doDownload" style="color: var(--vp-c-indigo-1); cursor: pointer;">
        <slot />
    </span>
</template>
<script lang="ts" setup>
    const props = defineProps({
        url: {
            type: String,
            requried: true
        },
        filename: {
            type: String
        }
    })


    function doDownload() {
        let path = props.url + '?t=' + (new Date().getTime())
        if (props.filename) {
            path += '&filename=' + props.filename
        }
        window.open('https://logistics.leaderrun.com/api/download' + path)
    }
</script>