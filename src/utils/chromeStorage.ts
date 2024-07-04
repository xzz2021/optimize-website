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

  get(keys: string | string[]) {
    return new Promise((resolve, reject) => {
      if (keys.length < 1 || keys == "") {
        reject("获取失败:参数必须是字符串或者数组,且不能为空")
      }
      if (typeof keys == "string") {
        chrome.storage.local.get(keys, res => {
          const r = res[keys]
          resolve(r)
        })
      } else {
        // 如果查询的是数组  则返回包含所有键名的对象  的数组
        chrome.storage.local.get(keys, res => {
          const r: any[] = []
          keys.map(key => {
            r.push({ ...res[key], key })
          })
          resolve(r)
        })
      }
    })
  },
  remove(str: string) {
    if (str.length > 0) {
      chrome.storage.local.remove(str)
    } else {
      console.log("移除失败:参数必须是字符串或者数组,且不能为空")
    }
  },
  clear() {
    chrome.storage.local.clear()
  },
}
