<script setup lang="ts">
import { computed, ref } from "vue"
import { YwzChart, dayConfig } from ".."
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
const getConfig = async () => {
  // 替换为接口
  const res = {
    code: 1,
    message: "success",
    data: {
      // 温度
      at: [26.4, 33.4],
      // 露点温度
      td: [24, 24.3],
      // 海平面气压
      slp: [1003.5, 1005.4],
      odate: ["2021-11-29T13:00:00.000+00:00", "2021-11-29T19:00:00.000+00:00"]
    },
    timestamp: 1661312609982,
    executeTime: 5
  }

  if (res.message === "success") {
    options.value = dayConfig(
      res.data.odate.map((i) => i.split(".")[0].replace(/T/, " ")),
      res.data.at,
      res.data.td,
      res.data.slp
    )
  }
}
getConfig()
</script>
<template>
  <el-dialog v-model="visible" width="80%" top="2vh">
    <YwzChart :option="options" height="800px" />
  </el-dialog>
</template>
<style scoped></style>
