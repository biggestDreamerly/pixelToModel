/*
 * @Author: lvy lvy
 * @Date: 2023-06-09 00:55:52
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-06-19 15:52:52
 * @FilePath: /my-t3-app/src/components/joinGroup.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react'

interface Props {
  count: number
  onSelected?: (index: number) => void
}
import useEditor from '~/store/actions'

const JoinGroup = ({ count, onSelected }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const { entityDepth, setEntityDepth } = useEditor() as any

  const handleSelect = (index: number) => {
    setEntityDepth(index + 1)
    if (onSelected) {
      setEntityDepth(index + 1)
    }
  }

  return (
    <div className="join  join-vertical">
      {[...Array(count)].map((_, index) => (
        <>
          {/* {entityDepth} */}
          <input
            key={index}
            className="join-item btn "
            type="radio"
            name="options"
            aria-label={` ${index + 1}`}
            checked={index === entityDepth - 1}
            onClick={() => handleSelect(index)}
          />
        </>
      ))}
    </div>
  )
}

export default JoinGroup
