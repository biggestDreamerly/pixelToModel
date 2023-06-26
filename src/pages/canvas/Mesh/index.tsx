/*
 * @Author: lvy lvy
 * @Date: 2023-06-20 16:43:11
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-06-20 19:01:47
 * @FilePath: /my-t3-app/src/pages/canvas/Mesh/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useRef, useState } from 'react'
import * as THREE from 'three'

const ShapeComponent = (props) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // 根据type创建对应的几何体
  let geometry
  if (props.type === 'triangle') {
    geometry = new THREE.BufferGeometry()
    const size = 0.1
    const thickness = props.scaleDeth * 0.1
    // 创建顶点的数组
    const vertices = [
      -0.5 * size,
      -0.289 * size,
      0, // 顶点0
      0.5 * size,
      -0.289 * size,
      0, // 顶点1
      0,
      0.577 * size,
      0, // 顶点2
      0,
      0,
      -thickness, // 顶点3
      0,
      0,
      0, // 顶点4
    ]

    // 创建面的数组
    const indices = [
      0,
      1,
      2, // 三角形面
      3,
      4,
      0, // 底部面
      3,
      2,
      4, // 后侧面
      2,
      1,
      4, // 右侧面
      1,
      0,
      4, // 左侧面
    ]
    // 创建法线的数组
    const normals = [
      0,
      0,
      1, // 法线1
      0,
      0,
      1, // 法线2
      0,
      0,
      1, // 法线3
      0,
      0,
      -1, // 法线4
      0,
      0,
      -1, // 法线5
      0,
      0,
      -1, // 法线6
    ]

    // 创建几何体
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    )
    geometry.setIndex(indices)
  } else if (props.type === 'square') {
    geometry = new THREE.BoxGeometry(1, 1, 1)
  } else {
    geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
  }
  // add more shapes here

  // 创建材质
  const material = new THREE.MeshStandardMaterial({ color: props.color })

  // 处理交互事件
  const handlePointerEvents = (event) => {
    setHovered(event.type === 'pointerover')
    setClicked(event.type === 'click')
  }

  return (
    <mesh
      ref={meshRef}
      {...props}
      geometry={geometry}
      material={material}
      onClick={handlePointerEvents}
      onPointerOver={handlePointerEvents}
      onPointerOut={handlePointerEvents}
    />
  )
}

export default ShapeComponent
