//  自动点击 试用高清
export const autoHD = async () => {
  // 第一次进入页面 直接执行一次
  clickHD()

  const oldHref = window.location.href
  //  监听url变化
  checkUrl(oldHref)
  const fullscreen = () => {
    const playerWrapper = document.querySelector(".bpx-player-video-wrap")
    const video = playerWrapper?.querySelector("video")
    console.log("🚀 ~ fullscreen ~ video:", video)
    video?.requestFullscreen()
  }

  setInterval(() => {
    fullscreen()
  }, 3000)
}

const clickHD = () => {
  if (validUrl()) {
    const timer4Btn = setInterval(async () => {
      const trialBtn = document.querySelector(".bpx-player-toast-confirm-login")
      if (trialBtn && trialBtn instanceof HTMLElement) {
        clearInterval(timer4Btn)
        trialBtn.click()
      }
    }, 1000)
  }
}

export const fullscreen = () => {
  const playerWrapper = document.querySelector(".bpx-player-video-wrap")

  const video = playerWrapper?.querySelector("video")
  console.log("🚀 ~ fullscreen ~ video:", video)
  video?.requestFullscreen()
  return
  if (!video) return
  console.log("✨ 🍰 ✨ xzz2021: fullscreen -> video", video)
  // 全屏切换函数
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    // 如果当前已经是全屏模式，则退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  } else {
    // 如果当前不是全屏模式，则进入全屏
    if (video.requestFullscreen) {
      video.requestFullscreen()
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen()
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen()
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen()
    }
  }
}
const validUrl = () => {
  const re = /https:\/\/www\.bilibili\.com\/video\/.*/
  const re2 = /https:\/\/www\.bilibili\.com\/list\/.*/
  return re.test(window.location.href) || re2.test(window.location.href)
}

const checkUrl = (oldHref: string) => {
  const timer4Url = setInterval(() => {
    const newHref = window.location.href
    if (newHref === oldHref) return
    if (validUrl()) {
      clearInterval(timer4Url)
      window.location.reload()
    }
  }, 1000)
}

// 自动关闭 弹幕
export const closeDm = () => {
  const timer4Btn: NodeJS.Timeout = setInterval(async () => {
    const hasdm = document.querySelector(".bpx-player-dm-setting.disabled")
    if (hasdm) return clearInterval(timer4Btn)
    const trialBtn = document.querySelector(".bui-danmaku-switch-input")
    if (trialBtn && trialBtn instanceof HTMLElement) {
      clearInterval(timer4Btn)
      trialBtn.click()
    }
  }, 1000)
}

export const checkStop = () => {
  let playTime = 0
  const timer4Play = setInterval(() => {
    if (playTime > 6) {
      clearInterval(timer4Play)
      return
    }
    // const playBtn = document.querySelector(".bpx-player-ctrl-btn.bpx-player-ctrl-play")
    const playBtn = $(".bpx-player-ctrl-btn.bpx-player-ctrl-play")
    if (playBtn.length > 0) {
      playBtn.trigger("click")
      playTime++
    }
  }, 1000)
}

// export const checkPlay = () => {
//   // 获取视频的播放状态
//   const video = $("#bilibili-player video")
//   if (video.length > 0) {
//     const playState = video[0]?.paused
//     if (playState) {
//       video.trigger("play")
//     }
//   }
// }
