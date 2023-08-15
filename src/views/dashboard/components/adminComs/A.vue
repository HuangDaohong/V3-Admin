<script setup lang="ts">
import { reactive, ref } from "vue"
const num = reactive({
  value: 0
})
const emit = defineEmits(["fn"])

const clickBtn = () => {
  num.value++
  emit("fn", num.value)
}

const show = ref(true)
</script>
<template>
  <div class="app-container contain">
    <el-button @click="show = !show">Transitiond动画</el-button>
    <Transition name="fade-transform">
      <div v-if="show">
        <div>
          <p>A组件：{{ num.value }}</p>
          <el-button @click="clickBtn">按钮+1</el-button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.contain {
  border: 1px solid rgb(17, 17, 17);
}
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
// .slide-fade-enter-active {
//   transition: all 0.3s ease-out;
// }

// .slide-fade-leave-active {
//   transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
// }

// .slide-fade-enter-from,
// .slide-fade-leave-to {
//   transform: translateX(20px);
//   opacity: 0;
// }
</style>
