import React from "react"

// 默认空模板组件用于动态平台挂载
function Tmp(): React.JSX.Element {
  return <></>
}

// 使用 require.context 自动导入所有组件
// @ts-ignore
const importAll = (r: __WebpackModuleApi.RequireContext) => {
  const modules: { [key: string]: () => JSX.Element } = {}
  r.keys().forEach((key: string) => {
    // 跳过当前文件和非 index 文件
    if (key === "./index.tsx" || !key.includes("index")) return

    // 从路径中提取平台名称
    const platformName = key.split("/")[1]
    const component = r(key).default

    if (component) {
      modules[platformName] = component
    }
  })
  return modules
}

// @ts-ignore
const components = importAll(require.context("./", true, /\.tsx$/))

type PlatFormObj = {
  [key: string]: () => JSX.Element
}

export const platFormObj: PlatFormObj = {
  ...components,
  tmp: Tmp,
}
