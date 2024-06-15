export const appendStyle = (cssContent: string) => {
  const style = document.createElement("style")
  style.textContent = cssContent
  const head = document.querySelector("head") as HTMLHeadElement
  head.appendChild(style)
}

export const rmNode2Style = (rmNode: string[]) => {
  if (!rmNode.length) return
  const style = rmNode.join(",") + "{display: none !important;}"
  appendStyle(style)
}
