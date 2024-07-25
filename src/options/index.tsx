import React, { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import List from "./list"
import ConfigPanel from "./config"
import { getPlatformArr, platForm } from "@/utils/platformOperation"
import { ConfigProvider, Layout } from "antd"
import { Header, Content, Footer } from "antd/es/layout/layout"
import zhCN from 'antd/locale/zh_CN';
const root = createRoot(document.getElementById("options")!) // 非空断言
// const renderDom = document.getElementById("options") // 非空断言

const XzzOptions: React.FC = () => {
  const [allPlatform, setAllPlatform] = useState<platForm[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await getPlatformArr()
        setAllPlatform(rawData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
      }
    }
    fetchData()
  }, [])

  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "calc(50% - 8px)",
    maxWidth: "calc(80% - 8px)",
    margin: "0 auto",
  }
  return (
    <>
    <ConfigProvider locale={zhCN}>
      <Layout style={layoutStyle}>
        {/* <Header></Header> */}
        <Content>
          <ConfigPanel allPlatform={allPlatform} />
          <List allPlatform={allPlatform} />
        </Content>
        <Footer></Footer>
      </Layout>
      </ConfigProvider>
    </>
  )
}

root.render(<XzzOptions />)
