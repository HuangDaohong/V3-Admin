import { ref, watchEffect } from "vue"
import { getActiveThemeName, setActiveThemeName } from "@/utils/cache/local-storage"

const DEFAULT_THEME_NAME = "normal"
type DefaultThemeName = typeof DEFAULT_THEME_NAME

/** 注册的主题名称, 其中 DefaultThemeName 是必填的 */
export type ThemeName = DefaultThemeName | "dark" | "dark-blue" | "OS"

interface ThemeList {
  title: string
  name: ThemeName
}

/** 主题列表 */
const themeList: ThemeList[] = [
  {
    title: "浅色",
    name: DEFAULT_THEME_NAME
  },
  {
    title: "黑暗",
    name: "dark"
  },
  {
    title: "深蓝",
    name: "dark-blue"
  },
  {
    title: "跟随系统",
    name: "OS"
  }
]

/** 正在应用的主题名称 */
const activeThemeName = ref<ThemeName>(getActiveThemeName() || DEFAULT_THEME_NAME)

/** 设置主题 */
const setTheme = (value: ThemeName) => {
  activeThemeName.value = value
}

/** 在 html 根元素上挂载 class */
const setHtmlRootClassName = (value: ThemeName) => {
  document.documentElement.className = value
}

// 查询当前系统主题颜色
const match: MediaQueryList = matchMedia("(prefers-color-scheme: dark)")

/** 跟随系统主题 */
const followSystemTheme = () => {
  let value = activeThemeName.value
  value = match.matches ? "dark" : DEFAULT_THEME_NAME
  setHtmlRootClassName(value)
  setActiveThemeName("OS")
}

/** 初始化 */
const initTheme = () => {
  watchEffect(() => {
    if (activeThemeName.value === "OS") {
      followSystemTheme()
      match.addEventListener("change", followSystemTheme)
    } else {
      setHtmlRootClassName(activeThemeName.value)
      setActiveThemeName(activeThemeName.value)
      match.removeEventListener("change", followSystemTheme)
    }
  })
}

/** 主题 hook */
export function useTheme() {
  return { themeList, activeThemeName, initTheme, setTheme }
}
