<script lang="ts" setup>
import { h } from "vue"
import { useTheme } from "@/hooks/useTheme"
import { resetConfigLayout } from "@/utils"
import { ElNotification } from "element-plus"
// 将 Element Plus 的语言设置为中文
import zhCn from "element-plus/es/locale/lang/zh-cn"

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()

// ElNotification({
//   title: "Hello",
//   type: "success",
//   message: h(
//     "a",
//     { style: "color: teal", target: "_blank", href: "https://github.com/un-pany/v3-admin-vite" },
//     "小项目获取 star 不易，如果你喜欢这个项目的话，欢迎点击这里支持一个 star ！这是作者持续维护的唯一动力（小声：毕竟是免费的）"
//   ),
//   duration: 0,
//   position: "bottom-right"
// })

ElNotification({
  title: "welcome",
  type: "success",
  message: h(
    "span",
    {
      style: "color: teal; cursor: pointer;",
      onClick: resetConfigLayout
    },
    "welcome, click here to reset the layout!"
  ),
  duration: 4000,
  position: "bottom-right",
  offset: 0
})
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <router-view />
  </ElConfigProvider>
</template>
