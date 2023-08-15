<script setup lang="ts">
import { computed, ref } from "vue"
import { YwzChart, monthConfig } from ".."
interface Props {
  show: boolean
}
const props = defineProps<Props>()
const emits = defineEmits(["update:show"])

const visible = computed({
  get: () => {
    return props.show
  },
  set: (val) => {
    emits("update:show", val)
  }
})
const options = ref({})
type key = "at" | "td" | "slp"
const list = ref([
  { value: "at", label: "温度", unit: "°C" },
  { value: "td", label: "露点温度", unit: "°C" },
  { value: "slp", label: "海平面气压", unit: "hPa" }
])
const value = ref("at")
const getConfig = async () => {
  // 替换为接口
  const res = {
    code: 1,
    message: "success",
    data: {
      td: [
        {
          datetime: "2022-07-06",
          max: 21.7,
          min: 18.5,
          avg: 19.945833444595337
        },
        {
          datetime: "2022-07-25",
          max: 19.9,
          min: 18,
          avg: 18.78333346048991
        },
        {
          datetime: "2022-07-26",
          max: 22.1,
          min: 18.2,
          avg: 20.62352954640108
        },
        {
          datetime: "2022-07-27",
          max: 23.2,
          min: 18.2,
          avg: 21.46666696336534
        }
      ],
      at: [
        {
          datetime: "2022-07-06",
          max: 27.4,
          min: 20.5,
          avg: 23.28750006357829
        },
        {
          datetime: "2022-07-25",
          max: 24,
          min: 18.6,
          avg: 20.608333428700764
        },
        {
          datetime: "2022-07-26",
          max: 26.4,
          min: 18.5,
          avg: 22.46470563551959
        },
        {
          datetime: "2022-07-27",
          max: 30.2,
          min: 18.7,
          avg: 24.961111386617024
        }
      ],
      slp: [
        {
          datetime: "2022-07-06",
          max: 1010.3,
          min: 1008.3,
          avg: 1009.3708318074545
        },
        {
          datetime: "2022-07-25",
          max: 1009.8,
          min: 1008.5,
          avg: 1009.0916646321615
        },
        {
          datetime: "2022-07-26",
          max: 1010.8,
          min: 1009.5,
          avg: 1010.0352926815258
        },
        {
          datetime: "2022-07-27",
          max: 1012.3,
          min: 1010.9,
          avg: 1011.588890923394
        }
      ]
    },
    timestamp: 1661312761304,
    executeTime: 435
  }

  if (res.message === "success") {
    const data = res.data
    const item = list.value.find((_) => _.value === value.value)
    console.log(item)
    const date = data[value.value as key].map((i) => i.datetime)
    const min = data[value.value as key].map((i) => i.min)
    const max = data[value.value as key].map((i) => i.max)
    const avg = data[value.value as key].map((i) => Math.round(i.avg))
    options.value = monthConfig(date, min, max, avg, item?.unit, item?.label)
  }
}
getConfig()
</script>
<template>
  <el-dialog v-model="visible" width="80%" top="2vh">
    <el-select v-model="value" class="m-2" placeholder="Select" size="small" @change="getConfig">
      <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <YwzChart :option="options" height="800px" />
  </el-dialog>
</template>
<style scoped></style>
