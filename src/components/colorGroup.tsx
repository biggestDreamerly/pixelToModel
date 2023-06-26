/*
 * @Author: lvy lvy
 * @Date: 2023-06-19 11:57:10
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-06-19 15:08:19
 * @FilePath: /my-t3-app/src/components/colorGroup.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react'
import useEditor from '~/store/actions'
;``
import { HexColorPicker, RgbaColor, RgbaColorPicker } from 'react-colorful'
const ColorPalette: React.FC = () => {
  const { strokeColorIndex, setStrokeColorIndex, strokeColorArray } =
    useEditor()
  // const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false)
  const [colorPickerPosition, setColorPickerPosition] = useState<{
    top: number
    left: number
  }>({ top: 0, left: 0 })

  const handleColorClick = (
    color: string,
    event: React.MouseEvent,
    index: number
  ) => {
    setStrokeColorIndex(index)
    if (event.button === 2) {
      const position = {
        top: event.clientY,
        left: event.clientX,
      }
      setColorPickerPosition(position)
      setShowColorPicker(true)
    }
  }

  const handleContextMenu = (
    event: React.MouseEvent,
    color: string,
    index: number
  ) => {
    event.preventDefault()
    setStrokeColorIndex(index)
    const position = {
      top: event.clientY,
      left: event.clientX,
    }
    setColorPickerPosition(position)
    setShowColorPicker(true)
  }

  const handleColorPickerClose = () => {
    setShowColorPicker(false)
  }

  return (
    <div>
      {showColorPicker && (
        <div
          className="color-picker"
          style={{
            position: 'absolute',
            top: colorPickerPosition.top,
            left: colorPickerPosition.left,
          }}
        >
          {/* 这里是你自定义的颜色选择器弹窗的内容 */}
          <div className="color-picker-content">
            <HexColorPicker
              onChange={(e) => {
                useEditor.setState((state) => {
                  const newArray = [...state.strokeColorArray]
                  newArray[strokeColorIndex] = e
                  return {
                    strokeColorArray: newArray,
                  }
                })
              }}
              color={
                strokeColorArray[strokeColorIndex as number] as
                  | RgbaColor
                  | unknown
              }
            />
          </div>
          <button
            className="btn btn-square btn-sm -right-4 -top-4 absolute "
            onClick={handleColorPickerClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <button className="btn btn-sm -left-4 -top-4 absolute">
            {strokeColorArray[strokeColorIndex as number]} Ok
          </button>
        </div>
      )}
      {strokeColorArray.map((color, index) => (
        <div
          key={color}
          style={{
            backgroundColor: color,
            width: '100px',
            height: '30px',
            cursor: 'pointer',
            marginBottom: '5px',
            border: index === strokeColorIndex ? '2px solid black' : 'none',
          }}
          onClick={(e) => handleColorClick(color, e, index)}
          onContextMenu={(e) => handleContextMenu(e, color, index)}
        />
      ))}
    </div>
  )
}

export default ColorPalette
