<script lang="ts" setup>
import { computed } from "vue"

interface Props {
  prefix?: string
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  prefix: "icon"
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor; //currentColor是css3新增的属性，表示使用当前元素的color属性值
  overflow: hidden;
}
</style>
