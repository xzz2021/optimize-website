import $ from "jquery"
export const allowCopy = async () => {
  //   一键复制代码
}

export const styleCss = `body{
  overflow: auto !important;
}
._23ISFX-wrap{
  z-index: -22 !important;
}
.index .main {
    width: 100%;
}
`

export const beautifyPage = () => {
  //内容扩大居中
  $("#__next ._3VRLsv ._gp-ck").css("width", "100%")
  $("#__next ._3VRLsv ._2OwGUo").css("display", "none")
  // 找到属性aria-label="3rd-ad"的元素,并移除
  const adElement = $(`[aria-label="3rd-ad"]`)
  adElement.remove()
}
