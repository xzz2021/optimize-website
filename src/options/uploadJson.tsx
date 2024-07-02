import React from "react"
import type { UploadProps } from "antd"
import { Button, message, Upload } from "antd"
import { combineStorage } from "@/utils/platformOperation"

const props: UploadProps = {
  name: "file",
  action: "",
  headers: {
    authorization: "authorization-text",
  },
  accept: "application/json",
  showUploadList: false,
  beforeUpload: file => {
    const isPNG = file.type === "application/json"
    if (!isPNG) {
      message.error(`${file.name} 不是json文件`)
    }
    return false
  },
  onChange: async info => {
    const file = info.fileList[0]
    if (file) {
      const url = URL.createObjectURL(file.originFileObj!)
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error("网络响应错误")
          }
          return response.json()
        })
        .then(data => {
          console.log("🚀 ~ file: uploadJson.tsx:35 ~ data:", data)
          //   const newRes = JSON.stringify(data, null, 2)
          //   return
          combineStorage(data)
          message.success("合并恢复成功")
        })
      //   const reader = new FileReader();
      //   reader.onload = function (e) {
      //       const jsonData = JSON.parse(e.target.result);
      //       const platformArr = JSON.stringify(jsonData, null, 2);

      //   }
    }
  },
}

const UploadJson: React.FC = () => (
  <Upload {...props} maxCount={1}>
    <Button>一键合并备份</Button>
  </Upload>
)

export default UploadJson
