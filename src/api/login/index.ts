import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 获取登录验证码 */
export function getLoginCodeApi() {
  return request<Login.LoginCodeResponseData>({
    url: "login/code",
    method: "get"
  })
}

/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "users/login",
    method: "post",
    data
  })
}
// export function loginApi(data: Login.LoginRequestData) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         code: 0,
//         data: {
//           token: "token-admin",
//           data
//         },
//         message: "登录成功"
//       })
//     }, 100)
//   })
// }

/** 获取用户详情 */
export function getUserInfoApi() {
  return request<Login.UserInfoResponseData>({
    url: "users/info",
    method: "get"
  })
}

// export function getUserInfoApi() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         code: 0,
//         data: {
//           username: "admin",
//           roles: ["admin"]
//         },
//         message: "获取成功"
//       })
//     }, 100)
//   })
// }
