<script lang="ts" setup>
import { ref } from "vue"

interface Props {
  buttonSize?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  buttonSize: 24
})

const buttonSizeCss = props.buttonSize + "px"
const show = ref(false)
</script>

<template>
  <div class="handle-button" @click="show = true">
    <el-tooltip effect="dark" content="全局配置" placement="bottom">
      <el-icon :size="buttonSizeCss">
        <Setting />
      </el-icon>
    </el-tooltip>
  </div>
  <el-drawer v-model="show" size="300px" :with-header="false">
    <slot />
  </el-drawer>
</template>

<style lang="scss" scoped>
.handle-button {
  padding: 0 10px;
}
</style>

<!-- <script lang="ts" setup>
import { ref } from "vue"

interface Props {
  buttonTop?: number
}

const props = withDefaults(defineProps<Props>(), {
  buttonTop: 350
})

const buttonTopCss = props.buttonTop + "px"
const show = ref(false)
</script>

<template>
  <div class="handle-button" @click="show = true">
    <el-tooltip effect="dark" content="全局配置" placement="left">
      <el-icon :size="24">
        <Setting />
      </el-icon>
    </el-tooltip>
  </div>
  <el-drawer v-model="show" size="300px" :with-header="false">
    <slot />
  </el-drawer>
</template>

<style lang="scss" scoped>
.handle-button {
  top: v-bind(buttonTopCss);
  width: 28px;
  height: 40px;
  padding: 8px 0;
  text-align: center;
  position: fixed;
  right: 0;
  z-index: 999;
  cursor: pointer;
  border-radius: 50% 0 0 50%;
  clip-path: polygon(0 20%, 100% 0, 100% 100%, 0 80%);
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.4));
}
</style> -->
