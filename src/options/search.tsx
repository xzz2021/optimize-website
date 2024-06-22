import React, { useState, ChangeEvent, useEffect } from "react"

import { Button, Input, Space, RadioChangeEvent, Radio, Select } from "antd"
import { addRmNode, getPlatformArr } from "@/utils/platformOperation"

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue)
  }

  const handleButtonClick = () => {
    console.log("🚀 ~ file: index.tsx:45 ~ rmNode:", inputValue)
    // console.log("🚀 ~ file: search.tsx:18 ~ platform:", paltform)
    // 执行添加操作
    addRmNode(platform, elementType + inputValue)
    // 清空输入框
    setInputValue("")
  }

  const [elementType, setElementType] = useState(".")

  const onTypeChange = (e: RadioChangeEvent) => {
    setElementType(e.target.value)
  }

  const [optionsArr, setOptionsArr] = useState<any>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await getPlatformArr()
        const optionsArr = rawData.map((item: any) => {
          return { value: item.key, label: item.name }
        })
        setOptionsArr(optionsArr)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
      }
    }

    fetchData()
  }, [])
  const [platform, setPlatform] = useState("zhihu")

  const handleChange = (value: string) => {
    setPlatform(value)
  }
  return (
    <>
      <div>
        <Select defaultValue="zhihu" style={{ width: 120 }} onChange={handleChange} options={optionsArr} />
      </div>
      <div>
        <Radio.Group onChange={onTypeChange} value={elementType}>
          <Radio value=".">类(class)</Radio>
          <Radio value="#">ID(id)</Radio>
        </Radio.Group>
      </div>
      <Space.Compact style={{ width: 400 }}>
        <Input placeholder="输入你要屏蔽的html块元素" value={inputValue} onChange={e => handleInputChange(e.target.value)} />
        <Button type="primary" onClick={handleButtonClick}>
          添加
        </Button>
      </Space.Compact>
    </>
  )
}

export default SearchBar
