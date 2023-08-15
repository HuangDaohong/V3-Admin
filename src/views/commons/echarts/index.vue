<script setup lang="ts">
import { ref } from "vue"
import JDay from "@/components/ThreeLinePic/src/DMonth.vue"
// import { YwzChart, dayConfig, monthConfig } from "@/components/ThreeLinePic"
// const options = dayConfig()
// const options = monthConfig()
const show = ref(true)
</script>
<template>
  <div class="EchartsPage">
    <!-- <YwzChart :option="options" height="800px" /> -->
    <JDay v-model:show="show" />
  </div>
</template>
<style scoped></style>
