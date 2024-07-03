import React from "react"
import emitter from "@/utils/eventBus"
import ModalApp from "./model"
import UploadJson from "./uploadJson"
import { Button } from "antd"
import { exportJson } from "@/utils/tools"
import { platForm } from "@/utils/platformOperation"
import AddPlatform from "./addPlatform"

interface PropsType {
  allPlatform: platForm[]
}
const ConfigPanel: React.FC<PropsType> = ({ allPlatform }) => {
  const exportFile = () => {
    exportJson(allPlatform)
  }
  const showModal = () => {
    emitter.emit("openModal" as any)
  }

  const showAddModal = () => {
    emitter.emit("openAddModal" as any)
  }
  return (
    <>
      <div style={{ textAlign: "center", margin: "30px", display: "flex", justifyContent: "space-between", width: "600px" }}>
        <Button type="primary" onClick={() => showModal()}>
          添加元素
        </Button>
        <Button type="primary" onClick={exportFile}>
          一键导出备份
        </Button>
        <UploadJson />
        <Button type="primary" onClick={() => showAddModal()}>
          平台管理
        </Button>
      </div>
      <ModalApp />
      <AddPlatform />
    </>
  )
}

export default ConfigPanel
