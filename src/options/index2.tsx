import React, { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { Collapse, Flex, Tag, Button, Input, Space } from "antd"
// import { CollapseProps } from "antd/lib/collapse"
import { getPlatformArr, deleteRmNode } from "@/utils/platformOperation"
import type { platForm } from "@/utils/platformOperation"
// const root = createRoot(document.getElementById("options")!) // 非空断言

function XzzOptions() {
  //   const [allPlatform, setAllPlatform] = useState<platForm[]>([])
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const rawData = await getPlatformArr()
  //         console.log("🚀 ~ file: index.tsx:16 ~ rawData:", rawData)
  //         setAllPlatform(rawData)
  //       } catch (error) {
  //         console.error("Error fetching data:", error)
  //       } finally {
  //       }
  //     }

  //     fetchData()
  //   }, [])

  const allPlatform = [
    {
      name: "知乎",
      rmNode: [],
      status: true,
      key: "zhihu",
    },
    {
      name: "哔哩哔哩",
      rmNode: [],
      status: true,
      key: "bilibili",
    },
    {
      name: "CSDN",
      rmNode: [],
      status: true,
      key: "csdn",
    },
    {
      name: "掘金",
      rmNode: [],
      status: true,
      key: "juejin",
    },
    {
      name: "简书",
      rmNode: [],
      status: true,
      key: "jianshu",
    },
  ]
  // 处理输入框值变化的函数
  const handleInputChange = (index: number, newValue: string) => {
    const updatedInputs = allPlatformKeys.map((item, itemIndex) =>
      itemIndex === index ? { value: newValue } : inputValue[itemIndex],
    )
    setInputValue(updatedInputs)
  }
  // const allPlatform  = await getPlatformArr()
  const allPlatformKeys = allPlatform.map(item => item.key)
  const [inputValue, setInputValue] = useState(
    allPlatformKeys.map(item => {
      if (item) {
        return { value: "" }
      }
    }),
  )

  const handleButtonClick = (platform: string, index: number) => (_event: any) => {
    const rmNode = inputValue[index]!.value
    console.log("🚀 ~ file: index.tsx:45 ~ rmNode:", rmNode)
    return
    deleteRmNode(platform, rmNode)
    // setInputValue('')
  }

  const newData = allPlatform.map((item, index) => {
    const newItem = {
      ...item,
      label: item.name,
      children: (
        <>
          <Space.Compact style={{ width: 400 }}>
            <Input
              placeholder="输入你要屏蔽的html块元素"
              value={inputValue[index]!.value}
              onChange={e => handleInputChange(index, e.target.value)}
            />
            <Button type="primary" onClick={handleButtonClick(item.key, index)}>
              添加
            </Button>
          </Space.Compact>
          <Flex gap="4px 0" wrap>
            {(item.rmNode || []).map(item2 => {
              return (
                <Tag bordered={false} color="success" closable onClose={() => deleteRmNode(item.key!, item2)}>
                  {item2}
                </Tag>
              )
            })}
          </Flex>
        </>
      ),
    }
    return newItem
  })

  return (
    <>
      <div>各平台设置参数</div>
      <Collapse items={newData} defaultActiveKey={allPlatform.map(item => item.key)} />;
    </>
  )
}

// root.render(XzzOptions())
export default XzzOptions
