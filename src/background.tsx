if (DEBUG) {
  // 开发模式时为真   //   生产模式为假

  const { bgdListenMsg } = require("ws-reload-plugin")
  bgdListenMsg()
}
