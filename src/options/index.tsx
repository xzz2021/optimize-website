// import React, { useState, ChangeEvent, useEffect } from "react"
// import { createRoot } from "react-dom/client"
// import { Collapse, Flex, Tag, Button, Input, Space } from "antd"
// import { CollapseProps } from "antd/lib/collapse"
// import { getPlatformArr, deleteRmNode } from "@/utils/platformOperation"
// import type { platForm } from "@/utils/platformOperation"
// const root = createRoot(document.getElementById("options")!) // 非空断言

// const XzzOptions = async () => {
//   const [allPlatform, setAllPlatform] = useState<platForm[]>([])

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const rawData = await getPlatformArr()
//         setAllPlatform(rawData)
//       } catch (error) {
//         console.error("Error fetching data:", error)
//       } finally {
//       }
//     }

//     fetchData()
//   }, [])
//   // const allPlatform  = await getPlatformArr()
//   const allPlatformKeys = allPlatform.map(item => item.key)
//   const [inputValue, setInputValue] = useState(
//     allPlatformKeys.map(item => {
//       if (item) {
//         return { [item]: "" }
//       }
//     }),
//   )

//   const handleButtonClick = (key: string, val: string) => {
//     console.log("🚀 ~ file: index.tsx:13 ~ val:", val)
//     console.log("🚀 ~ file: index.tsx:15 ~ key:", key)
//     // setInputValue('')
//   }

//   const newData = allPlatform.map((item, index) => {
//     const newItem = {
//       ...item,
//       label: item.name,
//       children: (
//         <>
//           <Space.Compact style={{ width: 400 }}>
//             <Input placeholder="输入你要屏蔽的html块元素" value={inputValue[item.key]} />
//             <Button type="primary" onClick={handleButtonClick(item.key, inputValue[item.key])}>
//               添加
//             </Button>
//           </Space.Compact>
//           <Flex gap="4px 0" wrap>
//             {(item.rmNode || []).map(item2 => {
//               return (
//                 <Tag bordered={false} color="success" closable onClose={() => deleteRmNode(item.key!, item2)}>
//                   {item2}
//                 </Tag>
//               )
//             })}
//           </Flex>
//         </>
//       ),
//     }
//     return newItem
//   })
//   return (
//     <>
//       <div>各平台设置参数</div>
//       <Collapse items={newData} defaultActiveKey={allPlatform.map(item => item.key)} />;
//     </>
//   )
// }

// root.render(XzzOptions())
