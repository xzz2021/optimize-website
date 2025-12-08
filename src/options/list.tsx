import React, { useState, useEffect } from "react"
import { Collapse, Flex, Tag, Input } from "antd"
import { deleteRmNode } from "@/utils/platformOperation"
import { platForm } from "@/utils/platformOperation"
import IsEnable from "./isEnable"
import { chromeStorage } from "@/utils/chromeStorage"

interface PropsType {
  allPlatform: platForm[]
}

const playCountLimit = async () => {
  const playCountLimit = await chromeStorage.get("playCountLimit") as number ?? 50
  return playCountLimit
}
  

const List: React.FC<PropsType> = ({ allPlatform }) => {
  // const allPlatform = [
  //   {
  //     name: "知乎",
  //     rmNode: [],
  //     status: true,
  //     key: "zhihu",
  //   },
  //   {
  //     name: "哔哩哔哩",
  //     rmNode: [],
  //     status: true,
  //     key: "bilibili",
  //   },
  //   {
  //     name: "CSDN",
  //     rmNode: [],
  //     status: true,
  //     key: "csdn",
  //   },
  //   {
  //     name: "掘金",
  //     rmNode: [],
  //     status: true,
  //     key: "juejin",
  //   },
  //   {
  //     name: "简书",
  //     rmNode: [],
  //     status: true,
  //     key: "jianshu",
  //   },
  // ]

  const [inputValue, setInputValue] = useState("")
  const fetchPlayCountLimit = async () => {
    const playCountLimitValue = await playCountLimit() as number
    setInputValue(playCountLimitValue.toString())
  }
  useEffect(() => { 
    fetchPlayCountLimit()
  }, [])

  const handleInputChange = (newValue: string) => {
    const newInputValue = newValue.replace(/[^0-9]/g, '')
    setInputValue(newInputValue)
    chromeStorage.set({playCountLimit: Number(newInputValue)})
  }

  const newData = allPlatform.map(item => {
    const { name, rmNode, key } = item
    const newItem = {
      key: key,
      label: name,
      children: (
        <>
          <IsEnable curPlatform={item} />
          <Flex gap="4px 0" wrap>
            {rmNode &&
              rmNode.map((item2, index2) => {
                return (
                  <Tag bordered={false} key={index2} color="success" closable onClose={() => deleteRmNode(key, item2)}>
                    {item2}
                  </Tag>
                )
              })}
          </Flex>
          {key === "bilibili" && (
            <div style={{display: 'flex'}}>
              <Input placeholder="输入你要高亮播放量的视频数量,单位为万,0为不高亮" value={inputValue} onChange={e => handleInputChange(e.target.value)} />
            </div>
          )}
        </>
      ),
    }
    return newItem
  })

  const ActiveKeyArr = allPlatform.map(item => item.key)

  return (
    <>
      <div style={{ margin: "10px 0" }}>各平台屏蔽元素</div>
      <Collapse items={newData} defaultActiveKey={ActiveKeyArr} />
    </>
  )
}

export default List
