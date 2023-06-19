/*
 * @Author: lvy lvy
 * @Date: 2023-06-09 00:55:52
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-06-09 01:01:38
 * @FilePath: /my-t3-app/src/components/joinGroup.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react'

interface Props {
  count: number
  onSelected?: (index: number) => void
}

const JoinGroup = ({ count, onSelected }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const handleSelect = (index: number) => {
    setSelectedIndex(index)
    if (onSelected) {
      onSelected(index)
    }
  }

  return (
    <div className="join  join-vertical">
      {[...Array(count)].map((_, index) => (
        <input
          key={index}
          className="join-item btn"
          type="radio"
          name="options"
          aria-label={` ${index + 1}`}
          checked={index === selectedIndex}
          onClick={() => handleSelect(index)}
        />
      ))}
    </div>
  )
}

export default JoinGroup
