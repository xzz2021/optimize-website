import { chromeStorage } from "./chromeStorage"
import { rmNode2Style } from "./dom"
export interface platForm {
  name: string
  rmNode: string[]
  status: boolean
  key: string
}

// 关键信息
/*
 * 所有平台数据 单独以平台域名为键进行存储
 *
 * 汇总平台信息  以platformNameArr为键进行存储
 *
 */

export const isOpen = async (platform: string) => {
  const res: platForm = (await chromeStorage.get(platform)) as platForm
  if (res) {
    return res.status
  }
  return false
}

export const toggle = async (platform: string) => {
  const res: platForm = (await chromeStorage.get(platform)) as platForm
  if (res) {
    chromeStorage.set({ platform: { ...res, status: !res.status } })
  }
}

//  获取汇总平台信息
export const getPlatformNameArr = async () => {
  const platformNameArr = ((await chromeStorage.get("platformNameArr")) as string[]) || []
  return platformNameArr
}

//  分别获取所有平台信息 生成数组
export const getPlatformArr = async () => {
  const platformNameArr = await getPlatformNameArr()
  const rawPlatform = (await chromeStorage.get(platformNameArr)) as platForm[]
  return rawPlatform
}

//  获取单个平台
const getPlatform = async (platform: string) => {
  const rawPlatform: platForm = (await chromeStorage.get(platform)) as platForm
  return rawPlatform
}

/*?
 **
 *添加平台
 */
export const addPlatform = async (newPlatform: string) => {
  const rawPlatform: platForm = (await chromeStorage.get(newPlatform)) as platForm
  if (rawPlatform) return
  //  先存储当前 平台 详细
  chromeStorage.set({ newPlatform: { name: newPlatform, rmNode: [], status: true } })
  //  再更新所有平台名称数组
  const platformNameArr = await getPlatformNameArr()
  platformNameArr.push(newPlatform)
  chromeStorage.set(platformNameArr)
}

//  添加单个节点
export const addRmNode = async (platform: string, rmNode: string) => {
  const rawPlatform: platForm = await getPlatform(platform)
  if (!rawPlatform) return
  rawPlatform.rmNode = [...new Set([...rawPlatform.rmNode, rmNode])]
  chromeStorage.set({ [platform]: rawPlatform })
}

//  删除单个节点
export const deleteRmNode = async (platform: string, rmNode: string) => {
  const rawPlatform: platForm = await getPlatform(platform)
  if (!rawPlatform) return
  let RawNode = rawPlatform.rmNode
  rawPlatform.rmNode = RawNode.filter(item => !item.includes(rmNode))
  chromeStorage.set({ [platform]: rawPlatform })
}

const platformMap = {
  zhihu: { name: "知乎", rmNode: [], status: true },
  bilibili: { name: "哔哩哔哩", rmNode: [], status: true },
  csdn: { name: "CSDN", rmNode: [], status: true },
  juejin: { name: "掘金", rmNode: [], status: true },
  jianshu: { name: "简书", rmNode: [], status: true },
}

//  初始化 所有平台  节点 信息
export const initStorage = async () => {
  const rawPlatformMap = (await chromeStorage.get("platformMap")) || {}
  const allPlatform = { ...platformMap, ...rawPlatformMap }
  //   设置所有平台的相关信息
  chromeStorage.set({ platformMap: allPlatform })
  // 获取所有平台 英文 名称组成的数组
  //  ["知乎", "哔哩哔哩", "CSDN", "掘金", "简书"]
  const platformNameArr = Object.keys(allPlatform).map(item => item)
  chromeStorage.set({ platformNameArr })
}

//  合并所有平台信息
export const combineStorage = async (jsonMap: any) => {
  jsonMap.map(async (item: any) => {
    const curPlatform = await getPlatform(item.key)
    curPlatform.rmNode = [...new Set([...curPlatform.rmNode, ...item.rmNode])]
    chromeStorage.set({ [item.key]: curPlatform })
  })
}

export const implementRmNode = async (platform: string) => {
  const rawPlatform: platForm = await getPlatform(platform)
  const rmNode = rawPlatform.rmNode
  rmNode2Style(rmNode)
}
