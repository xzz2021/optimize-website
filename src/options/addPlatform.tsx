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
  }

  const deleteItem = async (item: string) => {
    // 删除单个平台
    deletePlatform(item)
  }
  return (
    <>
      {contextHolder}
      <Modal title="平台管理" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          当前已添加的平台:
          <Flex gap="4px 0" wrap style={{ margin: "10px 0" }}>
            {platformNameArr.map((item, index) => (
              <Tag bordered={false} key={index} color="success" closable onClose={() => deleteItem(item)}>
                {index + 1}: {item}
              </Tag>
            ))}
          </Flex>
        </div>
        <div>添加示例: bilibili 或 zhihu.cn 或 www.jianshu.com </div>
        <Space.Compact style={{ width: 400, margin: "10px 0" }}>
          <Input placeholder="输入平台url链接或英文域名" value={inputValue} onChange={e => handleInputChange(e.target.value)} />
          <Input placeholder="输入中文名称" value={inputCnNameValue} onChange={e => handleInputChangeCn(e.target.value)} />
          <Button type="primary" onClick={addItem}>
            添加
          </Button>
        </Space.Compact>
      </Modal>
    </>
  )
}

export default AddPlatform
