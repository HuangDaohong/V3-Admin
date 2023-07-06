<template>
  <div>B组件:{{ props.num }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
  num: {
    type: Number,
    required: true,
    default: 0,
    validator: (val: number) => val >= 0 // 自定义校验规则
  }
})
</script>

<style scoped></style>
