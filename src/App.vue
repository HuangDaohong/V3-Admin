<script lang="ts" setup>
import { h } from "vue"
import { useTheme } from "@/hooks/useTheme"
import { resetConfigLayout } from "@/utils"
import { ElNotification } from "element-plus"
// 将 Element Plus 的语言设置为中文
import zhCn from "element-plus/lib/locale/lang/zh-cn"

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()

ElNotification({
  title: "提示",
  type: "warning",
  message: h(
    "span",
    {
      style: "color: teal; cursor: pointer;",
      onClick: resetConfigLayout
    },
    "由于平台 4.1.0 版本新增了多种布局模式，如果出现白屏情况，点击这里或手动前往控制台清理 LocalStorage 缓存数据后刷新页面即可！"
  ),
  duration: 2000,
  position: "bottom-right",
  offset: 0
})
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <router-view />
  </ElConfigProvider>
</template>
