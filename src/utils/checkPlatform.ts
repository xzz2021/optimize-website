import { chromeStorage } from "./chromeStorage"

// zhihu: { name: '知乎', status: true }
interface platForm {
  name: string
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

const platformArr = [
  { zhihu: { name: "知乎", status: true } },
  { bilibili: { name: "哔哩哔哩", status: true } },
  { csdn: { name: "CSDN", status: true } },
  { juejin: { name: "掘金", status: true } },
  { jianshu: { name: "简书", status: true } },
]
const platFormArrSize = platformArr.length

export const initStorage = async () => {
  const size = (await chromeStorage.get("platFormArrSize")) || 0
  if (size == platFormArrSize) return
  // platformArr.map(item => chromeStorage.set(item))
  chromeStorage.set({ ...platformArr })
  chromeStorage.set({ platFormArrSize })
}
