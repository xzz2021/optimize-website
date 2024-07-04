import React from "react"
import { Switch } from "antd"
import { platForm, resetPlatform } from "@/utils/platformOperation"

interface PropsType {
  curPlatform: platForm
}
const IsEnable: React.FC<PropsType> = ({ curPlatform }) => {
  const toggle = async (checked: boolean) => {
    curPlatform.status = checked
    resetPlatform(curPlatform)
  }
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", width: "185px", justifyContent: "space-between" }}>
        <p>是否启用当前平台: </p>
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          defaultChecked={curPlatform.status}
          onChange={checked => toggle(checked)}
        />
      </div>
    </>
  )
}

export default IsEnable
