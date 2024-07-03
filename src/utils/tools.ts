export const getTime = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  return `${year}${month}${day}${hours}${minutes}${seconds}`
}

export const exportJson = (data: object) => {
  // 2. 将 JSON 数据转换为字符串
  const jsonString = JSON.stringify(data, null, 2)

  // 3. 创建 Blob 对象
  const blob = new Blob([jsonString], { type: "application/json" })

  // 4. 创建 URL 对象
  const url = URL.createObjectURL(blob)

  // 5. 创建下载链接并触发下载
  const a = document.createElement("a")
  a.href = url
  // 获取年月日时分秒 作为文件名
  const fileName = getTime()
  a.download = `${fileName}.json` // 指定下载的文件名
  document.body.appendChild(a) // 将链接添加到 DOM
  a.click() // 模拟点击
  document.body.removeChild(a) // 点击后移除链接
  URL.revokeObjectURL(url) // 释放 URL 对象
}

export const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time * 1000))
