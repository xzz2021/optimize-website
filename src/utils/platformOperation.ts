import { chromeStorage } from "./chromeStorage"
import { rmNode2Style } from "./dom"
interface platForm {
  name: string
  rmNode: string[]
  status: boolean
}
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

const getPlatform = async (platform: string) => {
  const rawPlatform: platForm = (await chromeStorage.get(platform)) as platForm
  return rawPlatform
}
export const addPlatform = async (url: string) => {
  const newPlatform = url.match(/www\.(.*?)\.com/)
  if (newPlatform && newPlatform[1]) {
    const rawPlatform: platForm = (await chromeStorage.get(newPlatform[1])) as platForm
    if (rawPlatform) return
    chromeStorage.set({ [newPlatform[1]]: { name: newPlatform[1], rmNode: [], status: true } })
  }
}

const addRmNode = async (platform: string, rmNode: string) => {
  const rawPlatform: platForm = await getPlatform(platform)
  if (!rawPlatform) return
  rawPlatform.rmNode = [...new Set([...rawPlatform.rmNode, `.${rmNode}`, `#${rmNode}`])]
  chromeStorage.set({ [platform]: rawPlatform })
}

const deleteRmNode = async (platform: string, rmNode: string) => {
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

export const initStorage = async () => {
  const rawPlatformMap = (await chromeStorage.get("platformMap")) || {}
  chromeStorage.set({ ...platformMap, ...rawPlatformMap })
}

export const implementRmNode = async (platform: string) => {
  const rawPlatform: platForm = await getPlatform(platform)
  const rmNode = rawPlatform.rmNode
  rmNode2Style(rmNode)
}
