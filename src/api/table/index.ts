import { request } from "@/utils/service"
import type * as Table from "./types/table"
// import { shuffleArr } from "@/utils"

/** 增 */
export function createTableDataApi(data: Table.CreateTableRequestData) {
  return request({
    url: "table",
    method: "post",
    data
  })
}

/** 删 */
export function deleteTableDataApi(id: string) {
  return request({
    url: `table/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateTableDataApi(data: Table.UpdateTableRequestData) {
  return request({
    url: "table",
    method: "put",
    data
  })
}

/** 查 */
export function getTableDataApi(params: Table.GetTableRequestData) {
  return request<Table.GetTableResponseData>({
    url: "table",
    method: "get",
    params
  })
}

// const tableData: Table.GetTableData[] = [
//   {
//     id: "41000020000808728X",
//     username: "Paul Hall",
//     phone: "18754858463",
//     email: "u.feudonr@vtcrd.mr",
//     roles: "admin",
//     status: false,
//     createTime: "2015-09-14 18:18:39"
//   },
//   {
//     id: "220000201004268744",
//     username: "Brian Jackson",
//     phone: "16462631843",
//     email: "k.nbekesc@qmp.pa",
//     roles: "editor",
//     status: true,
//     createTime: "1981-02-07 07:11:12"
//   },
//   {
//     id: "340000202301244388",
//     username: "William Hernandez",
//     phone: "15881694717",
//     email: "y.eizpurfk@vilckzpxx.aq",
//     roles: "editor",
//     status: true,
//     createTime: "2009-02-22 09:00:55"
//   },
//   {
//     id: "130000201406087733",
//     username: "Larry Thompson",
//     phone: "16608168967",
//     email: "g.wwqpxgeyw@coawbbbewn.za",
//     roles: "admin",
//     status: true,
//     createTime: "1996-06-23 08:24:58"
//   },
//   {
//     id: "330000197302196300",
//     username: "Maria Martinez",
//     phone: "15497637471",
//     email: "c.scjfxgq@cditdxdy.gt",
//     roles: "admin",
//     status: false,
//     createTime: "2012-06-18 01:04:21"
//   },
//   {
//     id: "350000199109120382",
//     username: "Mark Hall",
//     phone: "16731559113",
//     email: "d.nuanf@tewhgrmqm.pe",
//     roles: "admin",
//     status: false,
//     createTime: "2010-12-26 16:23:57"
//   },
//   {
//     id: "45000019860627615X",
//     username: "Susan Hall",
//     phone: "17177150487",
//     email: "d.qwt@vlxvscto.sl",
//     roles: "editor",
//     status: false,
//     createTime: "2007-05-26 00:32:57"
//   },
//   {
//     id: "130000199812205838",
//     username: "Betty Allen",
//     phone: "17085184145",
//     email: "g.bbwsvxxd@pbvnplwo.tw",
//     roles: "admin",
//     status: false,
//     createTime: "1994-01-28 00:20:43"
//   },
//   {
//     id: "140000200210266286",
//     username: "Jason Thomas",
//     phone: "16678187432",
//     email: "b.hclydjqe@efn.af",
//     roles: "editor",
//     status: false,
//     createTime: "2013-02-10 04:34:50"
//   },
//   {
//     id: "460000199204055211",
//     username: "William Robinson",
//     phone: "18988481275",
//     email: "o.xqi@xuwrwgjl.sk",
//     roles: "admin",
//     status: false,
//     createTime: "1981-05-20 23:00:31"
//   }
// ]

// export function getTableDataApi1(params: Table.GetTableRequestData) {
//   return new Promise((resolve) => {
//     console.log(params)
//     setTimeout(
//       () => {
//         resolve({
//           code: 0,
//           data: {
//             list: shuffleArr(tableData),
//             total: 201
//           },
//           message: "获取成功"
//         })
//       },
//       Math.random() * 1000 + 100
//     )
//   })
// }
