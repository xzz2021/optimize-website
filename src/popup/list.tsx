import React from "react"

const features = [
  { title: "去除广告", description: "消除页面广告，获得干净的浏览体验。" },
  { title: "解除登录限制", description: "突破网站登录壁垒，随时访问内容。" },
  { title: "解除复制限制", description: "允许自由复制文本，获取所需信息。" },
  { title: "一键复制代码", description: "轻松复制代码片段，快速使用。" },
  { title: "优化阅读界面", description: "改善阅读体验，消除页面杂乱。" },
]

const WelcomeFeature = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #6366F1, #7C3AED, #EC4899)",
        color: "white",
        padding: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "600",
          marginBottom: "10px",
        }}
      >
        欢迎使用
      </div>

      {/* Feature List */}
      <div style={{ flex: 1 }}>
        {features.map((feature, index) => (
          <div key={index} style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "4px",
              }}
            >
              {feature.title}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              {feature.description}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Button */}
      <div>
        <button
          style={{
            width: "100%",
            padding: "10px 0",
            backgroundColor: "#4F46E5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4338CA")}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4F46E5")}
          onClick={() => {
            window.open(`chrome-extension://${chrome.runtime.id}/options.html`, "_blank")
          }}
        >
          个性化配置
        </button>
      </div>
      <div style={{ textAlign: "center", fontSize: "12px", color: "rgba(255, 255, 255, 0.8)", marginTop: "5px" }}>
        design by xzz2021 源码
        <a
          href="https://github.com/xzz2021/optimize-website"
          style={{ color: "white" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
      </div>
    </div>
  )
}

export default WelcomeFeature
