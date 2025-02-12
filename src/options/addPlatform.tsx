import React, { useEffect, useState } from "react"
import { Modal } from "antd"
import emitter from "../utils/eventBus"
import { Button, Input, Space, Flex, Tag, message } from "antd"
import { addPlatform, deletePlatform, getPlatformNameArr } from "@/utils/platformOperation"
import { getPlatformNameTool } from "@/utils/tools"
const AddPlatform = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [inputValue, setInputValue] = useState("")
  const [inputCnNameValue, setInputCnNameValue] = useState("")

  const [platformNameArr, setPlatformNameArr] = useState<string[]>([])

  const [messageApi, contextHolder] = message.useMessage()

  // 内容是否有更新
  const [hasUpdate, setHasUpdate] = useState(false)
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

  const handleInputChangeCn = (newValue: string) => {
    setInputCnNameValue(newValue)
  }

  const addItem = () => {
    const platform = getPlatformNameTool(inputValue)
    if (!platform || platform.length > 12) {
      messageApi.open({ type: "error", content: "平台名称不合法,请重新输入" })
      setInputValue("")
      return
    }
    if (!platform || !inputCnNameValue) return messageApi.open({ type: "error", content: "输入框不能为空" })
    // 执行添加操作
    // return
    addPlatform(platform!, inputCnNameValue)
    // 清空输入框
    setHasUpdate(true)
    setInputValue("")
    setInputCnNameValue("")
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
    hasUpdate && location.reload()
  }

  const deleteItem = async (item: string) => {
    Notification
    // 删除单个平台
    deletePlatform(item)
    setHasUpdate(true)
  }
  return (
    <>
      {contextHolder}
      <Modal title="平台管理" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <h4>1. 当前已添加的平台:</h4>
          <Flex gap="4px 0" wrap>
            {platformNameArr.map((item, index) => (
              <Tag bordered={false} key={index} color="success" closable onClose={() => deleteItem(item)}>
                {index + 1}: {item}
              </Tag>
            ))}
          </Flex>
        </div>
        <div>
          <h4>2.添加示例: bilibili 或 zhihu.cn 或 www.jianshu.com </h4>
          <Space.Compact>
            <Input placeholder="输入平台url链接或英文域名" value={inputValue} onChange={e => handleInputChange(e.target.value)} />
            <Input placeholder="输入中文名称" value={inputCnNameValue} onChange={e => handleInputChangeCn(e.target.value)} />
            <Button type="primary" onClick={addItem}>
              添加
            </Button>
          </Space.Compact>
        </div>
      </Modal>
    </>
  )
}

export default AddPlatform
