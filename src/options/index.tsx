import React, { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import List from "./list"
import ConfigPanel from "./config"
import { getPlatformArr, platForm } from "@/utils/platformOperation"

const root = createRoot(document.getElementById("options")!) // 非空断言

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
  return (
    <>
      <ConfigPanel allPlatform={allPlatform} />
      <List allPlatform={allPlatform} />
    </>
  )
}

root.render(<XzzOptions />)
