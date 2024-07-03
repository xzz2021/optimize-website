import React, { useEffect, useState } from "react"
import { Modal } from "antd"
import emitter from "../utils/eventBus"
import { Button, Input, Space, Flex, Tag, message } from "antd"
import { addPlatform, getPlatformNameArr } from "@/utils/platformOperation"
import { getPlatformNameTool } from "@/utils/tools"
const AddPlatform = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [inputValue, setInputValue] = useState("")

  const [platformNameArr, setPlatformNameArr] = useState<string[]>([])

  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await getPlatformNameArr()
        setPlatformNameArr(rawData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
      }
    }
    fetchData()
  }, [])
  const handleInputChange = (newValue: string) => {
    setInputValue(newValue)
  }

  const handleButtonClick = () => {
    const platform = getPlatformNameTool(inputValue)
    if (!platform || platform.length > 12) {
      messageApi.open({ type: "error", content: "平台名称不合法,请重新输入" })
      setInputValue("")
      return
    }
    // 执行添加操作
    addPlatform(platform)
    // 清空输入框
    setInputValue("")
    // location.reload()
  }
  const showModal = () => {
    // 打开面板,设定当前平台
    setIsModalOpen(true)
  }
  emitter.on("openAddModal", showModal)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const deletePlatform = async (item: string) => {
    console.log("🚀 ~ file: addPlatform.tsx:51 ~ item:", item)
    // 删除单个平台
  }
  return (
    <>
      {contextHolder}
      <Modal title="平台管理" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          当前已添加的平台:
          <Flex gap="4px 0" wrap style={{ margin: "10px 0" }}>
            {platformNameArr.map((item, index) => (
              <Tag bordered={false} key={index} color="success" closable onClose={() => deletePlatform(item)}>
                {index + 1}: {item}
              </Tag>
            ))}
          </Flex>
        </div>
        <div>添加示例: bilibili 或 zhihu.cn 或 www.jianshu.com </div>
        <Space.Compact style={{ width: 400, margin: "10px 0" }}>
          <Input
            placeholder="输入你要添加的平台url链接或英文域名"
            value={inputValue}
            onChange={e => handleInputChange(e.target.value)}
          />
          <Input placeholder="输入中文名称" />
          <Button type="primary" onClick={handleButtonClick}>
            添加
          </Button>
        </Space.Compact>
      </Modal>
    </>
  )
}

export default AddPlatform
