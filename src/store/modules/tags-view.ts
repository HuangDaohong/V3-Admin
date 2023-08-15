import { ref } from "vue"
import { defineStore } from "pinia"
// import { useSettingsStore } from "./settings"
import { type RouteLocationNormalized } from "vue-router"
// import { getVisitedViews, setVisitedViews, getCachedViews, setCachedViews } from "@/utils/cache/local-storage"

export type TagView = Partial<RouteLocationNormalized>

export const useTagsViewStore = defineStore(
  "tags-view",
  () => {
    //注释的不用了，现在用的是vuex-persistedstate
    // cacheTagsView表示是否缓存标签栏数据
    // const { cacheTagsView } = useSettingsStore()
    // const visitedViews = ref<TagView[]>(cacheTagsView ? getVisitedViews() : [])
    // const cachedViews = ref<string[]>(cacheTagsView ? getCachedViews() : [])
    const visitedViews = ref<TagView[]>([])
    const cachedViews = ref<string[]>([])

    /** 缓存标签栏数据 */
    // watchEffect(() => {
    //   setVisitedViews(visitedViews.value)
    //   setCachedViews(cachedViews.value)
    // })

    //#region add
    const addVisitedView = (view: TagView) => {
      // 检查是否已经存在相同的 visitedView
      const index = visitedViews.value.findIndex((v) => v.path === view.path)
      if (index !== -1) {
        // 防止 query 参数丢失
        visitedViews.value[index].fullPath !== view.fullPath && (visitedViews.value[index] = { ...view })
      } else {
        // 添加新的 visitedView
        visitedViews.value.push({ ...view })
      }
    }

    const addCachedView = (view: TagView) => {
      if (typeof view.name !== "string") return
      if (cachedViews.value.includes(view.name)) return
      if (view.meta?.keepAlive) cachedViews.value.push(view.name)
    }
    //#endregion

    //#region del
    const delVisitedView = (view: TagView) => {
      const index = visitedViews.value.findIndex((v) => v.path === view.path)
      if (index !== -1) visitedViews.value.splice(index, 1)
    }

    const delCachedView = (view: TagView) => {
      if (typeof view.name !== "string") return
      const index = cachedViews.value.indexOf(view.name)
      if (index !== -1) cachedViews.value.splice(index, 1)
    }
    //#endregion

    //#region delOthers
    const delOthersVisitedViews = (view: TagView) => {
      visitedViews.value = visitedViews.value.filter((v) => {
        return v.meta?.affix || v.path === view.path
      })
    }

    const delOthersCachedViews = (view: TagView) => {
      if (typeof view.name !== "string") return
      const index = cachedViews.value.indexOf(view.name)
      if (index !== -1) {
        cachedViews.value = cachedViews.value.slice(index, index + 1)
      } else {
        // 如果 index = -1, 没有缓存的 tags
        cachedViews.value = []
      }
    }
    //#endregion

    //#region delAll
    const delAllVisitedViews = () => {
      // 保留固定的 tags
      visitedViews.value = visitedViews.value.filter((tag) => tag.meta?.affix)
    }

    const delAllCachedViews = () => {
      cachedViews.value = []
    }
    //#endregion

    //#region delLeft,保留固定的 tags
    const delLeftVisitedViews = (view: TagView) => {
      const index = visitedViews.value.findIndex((v) => v.path === view.path)
      if (index > 0) {
        // 保留固定的 tags
        const affixTags = visitedViews.value.filter((tag) => tag.meta?.affix)
        visitedViews.value = affixTags.concat(visitedViews.value.slice(index, visitedViews.value.length))
      } else {
        delAllVisitedViews()
      }
    }

    const delLeftCachedViews = (view: TagView) => {
      if (typeof view.name !== "string") return
      const index = cachedViews.value.indexOf(view.name)
      if (index > 0) {
        cachedViews.value = cachedViews.value.slice(index, cachedViews.value.length)
      } else {
        delAllCachedViews()
      }
    }
    // #endregion

    //#region delRight
    const delRightVisitedViews = (view: TagView) => {
      const index = visitedViews.value.findIndex((v) => v.path === view.path)
      if (index >= 0 && index < visitedViews.value.length - 1) {
        visitedViews.value = visitedViews.value.slice(0, index + 1)
      }
    }

    const delRightCachedViews = (view: TagView) => {
      if (typeof view.name !== "string") return
      const index = cachedViews.value.indexOf(view.name)
      if (index >= 0 && index < cachedViews.value.length - 1) {
        cachedViews.value = cachedViews.value.slice(0, index + 1)
      }
    }
    //#endregion
    return {
      visitedViews,
      cachedViews,
      addVisitedView,
      addCachedView,
      delVisitedView,
      delCachedView,
      delOthersVisitedViews,
      delOthersCachedViews,
      delAllVisitedViews,
      delAllCachedViews,
      delLeftVisitedViews,
      delRightVisitedViews,
      delLeftCachedViews,
      delRightCachedViews
    }
  },
  {
    persist: {
      key: "vue3-tags-view",
      storage: window.localStorage
    }
  }
)
