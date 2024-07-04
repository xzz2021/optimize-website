import React, { useState } from "react"
import { Modal } from "antd"
import SearchBar from "./search"
import emitter from "../utils/eventBus"
const ModalApp: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    // 打开面板,设定当前平台
    setIsModalOpen(true)
  }
  emitter.on("openModal", showModal)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Modal title="添加自定义屏蔽元素" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <SearchBar />
      </Modal>
    </>
  )
}

export default ModalApp
