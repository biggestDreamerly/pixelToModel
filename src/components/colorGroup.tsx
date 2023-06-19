/*
 * @Author: lvy lvy
 * @Date: 2023-06-19 11:57:10
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-06-19 13:53:51
 * @FilePath: /my-t3-app/src/components/colorGroup.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react'
import useEditor from '~/store/actions'
;``
const ColorPalette: React.FC = () => {
  const { strokeColor, setStrokeColor } = useEditor()
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false)
  const [colorPickerPosition, setColorPickerPosition] = useState<{
    top: number
    left: number
  }>({ top: 0, left: 0 })

  const colors = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
    '#00ffff',
    '#000000',
    '#ffffff',
    '#888888',
  ]

  const handleColorClick = (color: string, event: React.MouseEvent) => {
    setSelectedColor(color)
    if (event.button === 2) {
      const position = {
        top: event.clientY,
        left: event.clientX,
      }
      setColorPickerPosition(position)
      setShowColorPicker(true)
    }
  }

  const handleContextMenu = (event: React.MouseEvent, color: string) => {
    event.preventDefault()
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
            top: colorPickerPosition.top,
            left: colorPickerPosition.left,
          }}
        >
          {/* 这里是你自定义的颜色选择器弹窗的内容 */}
          <div className="color-picker-content">Color Picker</div>
          <button onClick={handleColorPickerClose}>Close</button>
        </div>
      )}
      {colors.map((color) => (
        <div
          key={color}
          style={{
            backgroundColor: color,
            width: '100px',
            height: '30px',
            cursor: 'pointer',
            marginBottom: '5px',
            border: color === selectedColor ? '2px solid black' : 'none',
          }}
          onClick={(e) => handleColorClick(color, e)}
          onContextMenu={(e) => handleContextMenu(e, color)}
        />
      ))}
    </div>
  )
}

export default ColorPalette
