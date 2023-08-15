import dayjs from "dayjs"
import { removeConfigLayout } from "@/utils/cache/local-storage"

/** 格式化时间 */
export const formatDateTime = (time: string | number | Date) => {
  return time ? dayjs(new Date(time)).format("YYYY-MM-DD HH:mm:ss") : "N/A"
}

/** 用 JS 获取全局 css 变量 */
export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = ""
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
  } catch (error) {
    console.error(error)
  }
  return cssVariableValue
}

/** 用 JS 设置全局 CSS 变量 */
export const setCssVariableValue = (cssVariableName: string, cssVariableValue: string) => {
  try {
    document.documentElement.style.setProperty(cssVariableName, cssVariableValue)
  } catch (error) {
    console.error(error)
  }
}

/** 重置项目配置 */
export const resetConfigLayout = () => {
  removeConfigLayout()
  location.reload()
}

/** 打乱数组 */
export const shuffleArr = <T>(arr: T[]) => {
  return arr.sort(() => Math.random() - 0.5)
}

/** 时区 */
function getTimeShiqu(value: any, data: number) {
  const time = new Date(value) //获取时间
  // 获取时间偏移量 getTimezoneOffset 获取格林威治时间   *60000是到毫秒
  const dataOffset = new Date(value).getTimezoneOffset() * 60000
  // 获取格林威治时间
  const utc = time.getTime() + dataOffset // 两个时间戳
  // 拿格林威治时间去反推指定地区时间
  const newTime = utc + 3600000 * data //
  const times = new Date(newTime)
  return times
}
//时间转换 "2023-08-09T01:47:55Z" 转换成 2023-08-09 09:47:55
export function format(value: any, type: string = "yyyy-MM-dd hh:mm:ss") {
  if (!value) {
    return ""
  }
  const D = getTimeShiqu(value, 8)
  const y = D.getFullYear()
  const M = D.getMonth() + 1 < 10 ? `0${D.getMonth() + 1}` : D.getMonth() + 1
  const d = D.getDate() < 10 ? `0${D.getDate()}` : D.getDate()
  const h = D.getHours() < 10 ? `0${D.getHours()}` : D.getHours()
  const m = D.getMinutes() < 10 ? `0${D.getMinutes()}` : D.getMinutes()
  const s = D.getSeconds() < 10 ? `0${D.getSeconds()}` : D.getSeconds()
  if (type == "MM-dd") {
    return `${M}-${d}`
  } else if (type == "MM-dd hh:mm") {
    return `${M}-${d} ${h}:${m}`
  } else if (type == "MM月dd日") {
    return `${M}月${d}日`
  } else if (type == "MM/dd/hh") {
    return `${M}/${d} ${h}:${m}`
  } else if (type == "hh:mm") {
    return `${h}:${m}`
  } else if (type == "hh:mm:ss") {
    return ` ${h}:${m}:${s}`
  } else if (type == "h") {
    return `${h}`
  } else if (type == "hh") {
    return `${h}:00`
  } else if (type == "yyyy-MM-dd") {
    return `${y}-${M}-${d}`
  } else if (type == "yyyy-MM-dd hh:mm") {
    return `${y}-${M}-${d} ${h}:${m}`
  } else if (type == "yyyy-MM-dd hh:mm:ss") {
    return `${y}-${M}-${d} ${h}:${m}:${s}`
  } else if (type == "yyyy/MM/dd") {
    return `${y}/${M}/${d}`
  } else if (type == "YYYY年MM月DD日 HH:mm:ss") {
    return `${y}年${M}月${d}日 ${h}:${m}:${s}`
  }
}

/**
 * 隐藏字符串中间，展示后4
 * @param str
 * @returns
 */
export function hiddenText1(str: string) {
  if (str.length <= 8) {
    return str // 如果字符串长度小于等于8，则返回原字符串
  }
  const firstFour = str.slice(0, 4) // 获取前四位
  const lastFour = str.slice(-4) // 获取后四位
  const hideChars = "*".repeat(str.length - 8) // 生成隐藏字符 "*"
  return `${firstFour}${hideChars}${lastFour}` // 组合字符串
}
