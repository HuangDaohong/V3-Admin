<template>
  <div class="app-container">
    <h3>Admin 权限可见</h3>
    <img src="./logo.png" alt="logo" width="300" />
    <p>鼠标位置：{{ x }} {{ y }}</p>
    <el-button @click="capture">截屏</el-button>
    <!-- 清除截屏 -->
    <el-button @click="image = ''">删除</el-button>
    <img :src="image" alt="截屏" v-show="image" />
    <SvgIcon name="ikun" width="100px" height="100px" />

    <p>父：{{ num1 }}</p>
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
import { onMounted, onUnmounted } from "vue"
import html2canvas from "html2canvas"
import A from "./adminComs/A.vue"
import B from "./adminComs/B.vue"
import { ref, watchEffect } from "vue"

const num1 = ref(0)
const updateNum = (num: number) => {
  num1.value = num
}
const input = ref()
// 鼠标位置
const x = ref(0)
const y = ref(0)
const updateMouse = (e: MouseEvent) => {
  x.value = e.pageX
  y.value = e.pageY
}
// 监听鼠标移动事件
onMounted(() => {
  window.addEventListener("mousemove", updateMouse)
})
onUnmounted(() => {
  window.removeEventListener("mousemove", updateMouse)
})

const image = ref("")
const capture = async () => {
  const canvas = await html2canvas(document.body, {
    scale: 0.4
  })
  image.value = canvas.toDataURL()

  // const baseIm = canvas.toDataURL("image/jpeg")
  // console.log(baseIm, "获取到的base64格式")
}

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
