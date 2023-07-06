<template>
  <div>
    <div class="app-container center">
      <el-empty description="Admin 权限可见" style="height: 10vh" />
    </div>
    <hr />
    <A @fn="updateNum" />
    <hr />
    <div>父组件：{{ num1 }}</div>
    <B :num="num1" />
    <input ref="input" :value="num1" />
    <ul>
      <li v-for="item in list" ref="itemRefs" :key="item">
        {{ item }}
      </li>
    </ul>

    <p>Using text interpolation: {{ rawHtml }}</p>
    <p>Using v-html directive: <span v-html="rawHtml" /></p>
    <a :href="url">This is a link1----</a><br />
    <a :[attributeName]="url" target="_blank">This is a link2----</a><br />
    <a :href="url" target="_blank" rel="noopener noreferrer">This is a link3----</a>

    <p>
      Count is: {{ state.count }}, double is: {{ double }}
      <button @click="increment">Increment</button>
    </p>
  </div>
</template>
<script setup lang="ts">
import A from "./adminComs/A.vue"
import B from "./adminComs/B.vue"
import { ref, onMounted, watchEffect, reactive, computed, nextTick } from "vue"

const num1 = ref(0)
const updateNum = (num: number) => {
  num1.value = num
}

const input = ref()
// onMounted(() => {
//   input.value.focus()
// })
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  }
})

const list = ref([1, 2, 3, 4, 5])
const itemRefs = ref([])
onMounted(() => console.log(itemRefs.value))

const rawHtml = ref('<span style="color: red">This should be red.</span>')

const url = ref("https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api")
const attributeName = ref("href")

const state = reactive({ count: 0 })
const double = computed(() => state.count * 2)
const increment = () => {
  state.count++

  nextTick(() => {
    console.log("count is now: " + state.count)
  })
}
</script>
<style lang="scss" scoped>
.center {
  // height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
