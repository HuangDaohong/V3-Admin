<template>
  <div class="app-container contain">
    <div>B组件:{{ props.num }}</div>
    <div class="container">可拖拽的div</div>
    <hr />
    <el-button type="primary" @click="getMediaDevices">获取摄像头和麦克风</el-button>
    <el-button type="primary" @click="closeMediaDevices">关闭</el-button>
    <br />
    <video id="video" autoplay ref="localVideoRef" controls />
    <video id="remoteVideo" autoplay ref="remoteVideoRef" />
    <br />
    <el-button type="primary" @click="createRtcConnection">创建RTC</el-button>
    <!-- 将本地视频流添加到RTC连接中 -->
    <el-button type="primary" @click="addLocalStreamToRtcConnection">添加本地视频流</el-button>
    <el-button type="primary" @click="createOffer">创建offer</el-button>
    <br />
    <textarea id="offer" cols="30" rows="5" ref="textRef" />
    <br />
    <el-button type="primary" @click="setRemoteDes">设置远程描述</el-button>
    <el-button type="primary" @click="createAnswer">创建answer</el-button>
    <el-button type="primary" @click="addCandidate">添加候选</el-button>
  </div>
</template>

<!-- https://www.bilibili.com/video/BV1W14y1Y7fQ/?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click&vd_source=eac7ee3e188e81d32edf392ab1aa352c -->
<script setup lang="ts">
import { ref } from "vue"
const props = defineProps({
  num: {
    type: Number,
    required: true,
    default: 0,
    validator: (val: number) => val >= 0 // 自定义校验规则
  }
})

const localVideoRef = ref<HTMLVideoElement | null>(null)
const remoteVideoRef = ref<HTMLVideoElement | null>(null)
const localStreamRef = ref<MediaStream | null>(null)

const getMediaDevices = () => {
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true
    })
    .then((stream) => {
      console.log(stream)
      localVideoRef.value!.srcObject = stream
      localStreamRef.value = stream
    })
    .catch((err) => {
      console.log(err)
    })
}

const closeMediaDevices = () => {
  const stream = localVideoRef.value!.srcObject as MediaStream
  const tracks = stream.getTracks()
  tracks.forEach((track) => {
    track.stop()
  })
  localVideoRef.value!.srcObject = null
}

const pc = ref<RTCPeerConnection | null>(null)
// 创建RTC
const createRtcConnection = () => {
  const _pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302"
      }
    ]
  })
  pc.value = _pc
  console.log("pc创建成功", pc.value)
  pc.value!.onicecandidate = (e) => {
    console.log("onicecandidate", e)
    if (e.candidate) {
      console.log("发送ICE候选到对方", e.candidate)
    }
  }

  pc.value!.ontrack = (e) => {
    console.log("ontrack", e)
    remoteVideoRef.value!.srcObject = e.streams[0]
  }
}

// 创建offer，发送给对方，对方通过setRemoteDescription设置远端描述
const createOffer = () => {
  pc.value!.createOffer({
    offerToReceiveAudio: true,
    offerToReceiveVideo: true
  }).then((sdp) => {
    console.log("createOffer", sdp)
    pc.value!.setLocalDescription(sdp) // 将sdp设置为本地描述
  })
}

const textRef = ref<HTMLTextAreaElement | null>(null)
const setRemoteDes = () => {
  const remote_sdp = textRef.value!.value
  const _sdp = new RTCSessionDescription(JSON.parse(remote_sdp))
  pc.value!.setRemoteDescription(_sdp)
  console.log("设置远程描述成功", remote_sdp)
}

const createAnswer = () => {
  pc.value!.createAnswer().then((sdp) => {
    console.log("createAnswer", sdp)
    pc.value!.setLocalDescription(sdp)
  })
}

const addCandidate = () => {
  const candidate = textRef.value!.value
  const _candidate = new RTCIceCandidate(JSON.parse(candidate))
  pc.value!.addIceCandidate(_candidate)
  console.log("添加ICE候选成功", candidate)
}

const addLocalStreamToRtcConnection = () => {
  const stream = localVideoRef.value!.srcObject as MediaStream
  // 将本地视频流添加到RTC连接中
  stream.getTracks().forEach((track) => {
    pc.value!.addTrack(track, stream)
  })
  console.log("添加本地视频流成功")
}
</script>

<style scoped lang="scss">
.container {
  @include flexCenter;
  color: red;
  width: 300px;
  height: 100px;
  border: 1px solid red;
  overflow: auto;
  // resize: horizontal;
  // resize: vertical;
  resize: both;
}
.contain {
  border: 1px solid rgb(17, 17, 17);
}

#video {
  width: 300px;
  height: 200px;
}
</style>
