import React, { useState, useEffect } from "react"
import { Collapse, Flex, Tag, Button } from "antd"
import emitter from "@/utils/eventBus"
import { getPlatformArr, deleteRmNode } from "@/utils/platformOperation"
import type { platForm } from "@/utils/platformOperation"
import ModalApp from "./model"

const List = () => {
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

  const showModal = () => {
    emitter.emit("openModal" as any)
  }
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
  const newData = allPlatform.map(item => {
    const { name, rmNode, key } = item
    const newItem = {
      key: key,
      label: name,
      children: (
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
      ),
    }
    return newItem
  })

  const ActiveKeyArr = allPlatform.map(item => item.key)

  console.log("🚀 ~ file: list.tsx:81 ~ ActiveKeyArr:", ActiveKeyArr)

  return (
    <>
      <Button type="primary" onClick={() => showModal()}>
        添加元素
      </Button>
      <div style={{ textAlign: "center", margin: "10px 0" }}>各平台设置参数</div>
      <Collapse items={newData} defaultActiveKey={ActiveKeyArr} />
      <ModalApp />
    </>
  )
}

export default List
