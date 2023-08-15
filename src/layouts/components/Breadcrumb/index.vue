<script lang="ts" setup>
import { ref, watch } from "vue"
import { type RouteLocationMatched, useRoute, useRouter } from "vue-router"
import { compile } from "path-to-regexp"
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/store/modules/settings"

const route = useRoute()
const router = useRouter()
const settingsStore = useSettingsStore()
const { showBreadIcon } = storeToRefs(settingsStore)

/** 定义响应式数据 breadcrumbs，用于存储面包屑导航信息 */
const breadcrumbs = ref<RouteLocationMatched[]>([])

/** 获取面包屑导航信息 */
const getBreadcrumb = () => {
  console.log(route)
  breadcrumbs.value = route.matched.filter((item) => item.meta?.title && item.meta?.breadcrumb !== false)
}

/** 编译路由路径 */
const pathCompile = (path: string) => {
  const toPath = compile(path)
  return toPath(route.params)
}

/** 处理面包屑导航点击事件 */
const handleLink = (item: RouteLocationMatched) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect as string)
    return
  }
  router.push(pathCompile(path))
}

/** 监听路由变化，更新面包屑导航信息 */
watch(
  () => route.path,
  (path) => {
    if (path.startsWith("/redirect/")) return
    getBreadcrumb()
  }
)

/** 初始化面包屑导航信息 */
getBreadcrumb()
</script>

<template>
  <el-breadcrumb class="app-breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
      <span v-if="item.redirect === 'noRedirect' || index === breadcrumbs.length - 1" class="no-redirect">
        <!-- 图标elIcon-->
        <div class="lastChild">
          <SvgIcon v-if="showBreadIcon && item.meta.svgIcon" :name="item.meta.svgIcon" class="el-icon" />
          <component v-else-if="showBreadIcon && item.meta.elIcon" :is="item.meta.elIcon" class="el-icon" />
          <span>{{ item.meta.title }}</span>
        </div>
      </span>
      <a v-else @click.prevent="handleLink(item)">
        <!-- 图标elIcon-->
        <SvgIcon v-if="showBreadIcon && item.meta.svgIcon" :name="item.meta.svgIcon" class="el-icon" />
        <component v-else-if="showBreadIcon && item.meta.elIcon" :is="item.meta.elIcon" class="el-icon" />
        <span>{{ item.meta.title }}</span>
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__item,
.el-breadcrumb__inner a {
  font-weight: 400;
  @include flexCenter;
}
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: var(--v3-navigationbar-height);
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  &:last-child .el-breadcrumb__inner {
    font-size: 26px;
  }
}
.el-icon,
.el-icon2 {
  font-size: 16px;
  width: 16px;
  margin-right: 2px;
}

.lastChild {
  @include flexCenter;
}
</style>
