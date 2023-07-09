<script setup lang="ts">
import { reactive, ref } from 'vue'
const num = reactive({
  value: 0
})
const emit = defineEmits(['fn'])

const clickBtn = () => {
  num.value++
  emit('fn', num.value)
}

const show = ref(true)
</script>
<template>
  <button @click="show = !show">Toggle_Transition</button>
  <Transition name="slide-fade">
    <div v-if="show">
      <div>
        <button @click="clickBtn">按钮+1</button>
        <div>A：{{ num.value }}</div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
