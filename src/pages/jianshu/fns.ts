import { appendStyle } from "@/utils/dom"
import $ from "jquery"
import { sleep } from "@/utils/tools"
export const allowCopy = async () => {
  //   一键复制代码
}

const styleCss = `body{
  overflow: auto !important;
}
._23ISFX-wrap{
  z-index: -22 !important;
}
`
appendStyle(styleCss)

const beautifyPage = () => {
  //内容扩大居中
  $("#__next ._3VRLsv ._gp-ck").css("width", "100%")
  $("#__next ._3VRLsv ._2OwGUo").css("display", "none")
}

beautifyPage()
