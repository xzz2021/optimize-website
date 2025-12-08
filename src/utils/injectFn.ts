// 注入inject文件
export const injectFile = () => {
  //----参考------https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions/9517879#9517879
  const s = document.createElement("script")
  s.src = chrome.runtime.getURL("js/inject.js")
  s.onload = function () {
    ;(this as HTMLElement).remove() // Explicitly cast 'this' to HTMLElement
  } //--<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-------此处分号不可去掉--------应该是立即执行函数必须以分号分隔------
  ;(document.head || document.documentElement).appendChild(s) // ------document.documentElement----指向html标签
}

//  b站注入  覆写 原生 定期函数
export const injectForBilibili = async () => {
  window.console.error = null
//   setTimeout(()=> {
//       window.UserStatus.userInfo = {
//     "isLogin": true
// }
//   }, 10*1000)
  //  b站覆写setTimeout
  const originSetTimeout = window.setTimeout
  window.setTimeout = function (func: (args: void) => void, delay: number | undefined) {
    let newdelay = delay
    if (delay === 4e3) newdelay = 4e8
    if (delay === 3e4 ) newdelay = 10e10
    return originSetTimeout.call(this, func, newdelay) as NodeJS.Timeout
  }

  const originSetInterval = window.setInterval
  // let ttt = 0

  // setInterval(()=> {
  //   ttt+=1
  // },1000)
  // setTimeout(()=>{
    window.setInterval = function (func: (args: void) => void, delay: number | undefined){
      let newdelay = delay || 11111
      // if(ttt > 60 && ttt < 75){
        console.log("🚀 ~ injectForBilibili ~ttt===== newdelay:", newdelay)
      // }
      if (newdelay === 1500) newdelay = 10e10
      // if ( newdelay <= 1000 ) newdelay = 10e10/
      // if ( newdelay <= 1000 && newdelay != 250) newdelay = 10e10
      // if ( newdelay == 250) newdelay = 10e10
      console.log("🚀 ~ injectForBilibili ~ttt=====222222222 newdelay:", newdelay)

      return originSetInterval.call(this, func, newdelay) as NodeJS.Timeout
    }
  // }, 6000)
  const originSetItem = window.localStorage.setItem
  window.localStorage.setItem = function (key, value) {
    if (key === "bpx_player_profile") {
      const profile = JSON.parse(value)
      // 默认关闭弹幕
      // profile.dmSetting.dmSwitch = false
      profile.lastView = Date.now() + 864e10
      // 新增属性变更  解除b站试看一次限制
      profile.lastUnlogintrialView = Date.now() + 864e10 - 11
      profile.media.quality = 80
      value = JSON.stringify(profile)
    }
    originSetItem.call(this, key, value)
  }
}
