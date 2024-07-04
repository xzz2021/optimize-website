import React from "react"
import { Collapse, Flex, Tag } from "antd"
import { deleteRmNode } from "@/utils/platformOperation"
import { platForm } from "@/utils/platformOperation"
import IsEnable from "./isEnable"

interface PropsType {
  allPlatform: platForm[]
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
