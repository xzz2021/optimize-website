// window.addEventListener('xzz', (params)=> {
//     // console.log("🚀 ~ file: inject.js:26 ~ window.addEventListener ~ params:", params)
//     try {
//          //  此处也可以直接传函数的执行体,以及形参,通过构造函数进行执行
//         //  let fn = new Function('dd', "return dd")
//         //  let res = fn('kjhibuu')
//          let res =  eval(params.detail.fn)
//         //  window.postMessage(res, "*")  //尽可能不使用通配符,明确指定来源窗口
//          let targetOrigin = params.detail.currentHref
//         window.postMessage(res, targetOrigin)
//     } catch (error) {
//     console.error("🚀 ~ file: inject.js:22 ~ window.addEventListener ~ error:", error)
//     }
// },false)

import { injectForBilibili } from "./utils/injectFn"

// const autoFullscreen = async () => {
//   const checkFull = setInterval(() => {
//       //  此按钮只能手动触发
//       let fullBtn = $('.bpx-player-ctrl-btn.bpx-player-ctrl-full')
//       if(fullBtn.length == 1){
//           // fullBtn.click() //
//           clearInterval(checkFull)
//           $('.bpx-player-ctrl-btn.bpx-player-ctrl-full').click()
//       }else{

//       }
//   }, 1000)
// }

const exeFn = async () => {
  window.postMessage({ type: "checkPlatform", text: "你好,帮我检查b站平台是否开启!" }, "*")
  window.addEventListener(
    "message",
    async function (event) {
      if (event.source != window) return
      if (event.data.type && event.data.type == "check_result") {
        const res = event.data.text
        if (res) {
          if (location.href.includes("bilibili.com/video") || location.href.includes("bilibili.com/list")) {
            injectForBilibili()
          }
        }
      }
    },
    false,
  )
}

exeFn()
