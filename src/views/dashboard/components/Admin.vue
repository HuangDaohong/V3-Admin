<template>
  <div class="app-container">
    <h3>Admin 权限可见</h3>
    <SvgIcon name="ikun" width="100px" height="100px" />

    <div>父：{{ num1 }}</div>
    <el-input ref="input" :value="num1" style="width: 200px" />

    <A @fn="updateNum" />

    <B :num="num1" />

    <!-- <ul>
      <li v-for="item in list" ref="itemRefs" :key="item">
        {{ item }}
      </li>
    </ul> -->

    <!-- <a :href="url">This is a link1----</a><br />
    <a :href="url" target="_blank" rel="noopener noreferrer">This is a link3----</a> -->
  </div>
</template>
<script setup lang="ts">
import A from "./adminComs/A.vue"
import B from "./adminComs/B.vue"
import { ref, watchEffect } from "vue"

const num1 = ref(0)
const updateNum = (num: number) => {
  num1.value = num
}
const input = ref()

watchEffect(() => {
  if (input.value) {
    input.value.focus()
  }
})

// const list = ref([1, 2, 3])
// const itemRefs = ref([])
// onMounted(() => console.log("itemRefs", itemRefs.value))

// const url = ref("https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api")
</script>
<style lang="scss" scoped></style>
