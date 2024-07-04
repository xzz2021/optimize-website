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

export const resetPlatform = async (curPlatform: platForm) => {
  chromeStorage.set({ [curPlatform.key]: curPlatform })
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
  console.log("🚀 ~ file: platformOperation.ts:43 ~ rawPlatform:", rawPlatform)
  return rawPlatform || []
}

//  获取单个平台
const getPlatform = async (platform: string) => {
  const rawPlatform: platForm = (await chromeStorage.get(platform)) as platForm
  return rawPlatform || {}
}

/*?
 **
 *添加平台
 */
export const addPlatform = async (newPlatform: string, cnName: string) => {
  const existPlatform: platForm = (await chromeStorage.get(newPlatform)) as platForm
  if (existPlatform) return
  //  先存储当前 平台 详细
  chromeStorage.set({ [newPlatform]: { name: cnName, rmNode: [], status: true, key: newPlatform } })
  //  再更新所有平台名称数组
  addPlatformName(newPlatform)
}

// 新增平台名称时 相应数组添加对应的名称
const addPlatformName = async (newPlatform: string) => {
  const platformNameArr = await getPlatformNameArr()
  const newData = [...platformNameArr, newPlatform]
  chromeStorage.set({ platformNameArr: newData })
}

//  删除单个平台
export const deletePlatform = async (platformName: string) => {
  // 获取原始 平台数组数据
  const platformNameArr = await getPlatformNameArr()
  const newArr = platformNameArr.filter(item => item !== platformName)
  chromeStorage.set({ platformNameArr: newArr })
  chromeStorage.remove(platformName)
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

const platformMap = [
  { name: "知乎", rmNode: [], status: true, key: "zhihu" },
  { name: "哔哩哔哩", rmNode: [], status: true, key: "bilibili" },
  { name: "CSDN", rmNode: [], status: true, key: "csdn" },
  { name: "掘金", rmNode: [], status: true, key: "juejin" },
  { name: "简书", rmNode: [], status: true, key: "jianshu" },
]

//  初始化 所有平台  节点 信息
export const initStorage = async () => {
  let platformNameArr = await getPlatformNameArr()
  //  如果是[] 则是第一次启动，初始化所有平台信息
  if (platformNameArr.length) return
  console.log("🚀 ~ file: platformOperation.ts:112 ~只要初次使用插件才会看到此次初始化提示 platformNameArr:", platformNameArr)
  platformNameArr = platformMap.map(item => item.key)
  chromeStorage.set({ platformNameArr: platformNameArr })
  platformMap.map(async item => {
    chromeStorage.set({ [item.key]: item })
  })
}

export const combineStorage = async (jsonMap: platForm[]) => {
  //  不知道为什么 数组循环后item内部的key顺序 会被改变
  for (const item of jsonMap) {
    let curPlatform = await getPlatform(item.key)
    if (JSON.stringify(curPlatform) === "{}") {
      // curPlatform = sortObjectKeys(item)
      curPlatform = item
      await addPlatformName(item.key)
    } else {
      curPlatform.rmNode = [...new Set([...curPlatform.rmNode, ...item.rmNode])]
    }
    await chromeStorage.set({ [item.key]: curPlatform })
  }
}

export const implementRmNode = async (platform: string) => {
  const rawPlatform: platForm = await getPlatform(platform)
  const rmNode = rawPlatform.rmNode
  rmNode2Style(rmNode)
}
