export const chromeStorage = {
  set(obj: { [key: string]: any }) {
    return new Promise((resolve, reject) => {
      if (Object.prototype.toString.call(obj) !== "[object Object]" && JSON.stringify(obj) === "{}") {
        reject("设定失败:参数必须是object且不能为空")
      } else {
        let tip = ""
        for (const key in obj) {
          chrome.storage.local.set({ [key]: obj[key] }, () => {
            tip += `${key}设定成功,值为${JSON.stringify(obj[key])}
            `
          })
        }
        resolve(tip)
      }
    })
  },

  get(str: string) {
    return new Promise((resolve, reject) => {
      if (str.length < 1 || str == "") {
        reject("获取失败:参数必须是字符串或者数组,且不能为空")
      }
      if (typeof str == "string") {
        chrome.storage.local.get(str, res => {
          const r = res[str]
          resolve(r)
        })
      }
    })
  },
  remove(strORarr: string) {
    if (strORarr.length > 0) {
      chrome.storage.local.remove(strORarr)
    } else {
      console.log("移除失败:参数必须是字符串或者数组,且不能为空")
    }
  },
  clear() {
    chrome.storage.local.clear()
  },
}
