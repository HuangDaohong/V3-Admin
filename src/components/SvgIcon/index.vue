<script lang="ts" setup>
import { computed } from "vue"

interface Props {
  name: string
  prefix?: string
  width?: string | number
  height?: string | number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  prefix: "icon",
  width: "1em",
  height: "1em",
  color: "currentColor"
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg class="svg-icon" aria-hidden="true" :fill="color" :style="{ width, height }">
    <use :href="symbolId" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  // fill: currentColor; //currentColor是css3新增的属性，表示使用当前元素的color属性值
  overflow: hidden;
}
</style>
