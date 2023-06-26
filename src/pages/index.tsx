/*
 * @Author: lvy lvy
 * @Date: 2023-06-08 22:17:21
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-06-19 14:37:17
 * @FilePath: /my-t3-app/src/pages/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import styles from './index.module.css'
import { type NextPage } from 'next'
// import { OrbitControls } from '@react-three/drei'
import SquareGrid from './canvas'
import JoinGroup from '~/components/joinGroup'
import ColorGroup from '~/components/colorGroup'
import React, { useRef, useState } from 'react'
import useEditor from '~/store/actions'
import Scene from './canvas/scene'
// function CameraControls() {
//   // 定义一个 CameraControls 组件
//   const ref = useRef()
//   const {
//     camera,
//     gl: { domElement },
//   } = useThree()
//   return <OrbitControls ref={ref as any} args={[camera, domElement]} />
// }

const Home: NextPage = () => {
  return (
    <>
      <div className=" flex  justify-center h-auto w-auto">
        {/* 左侧操作 */}
        <div className=" flex-1">
          <Scene></Scene>
        </div>
        {/* 中间画布区域 */}
        <div className=" flex-1 mt-10">
          <SquareGrid numRows={32} numCols={32} cellSize={20} />
          <button className="btn btn-primary">Button</button>
        </div>
        {/* 右侧操作区域 */}
        <div className=" flex-1 flex justify-center ml-40 mt-10">
          <JoinGroup count={10}></JoinGroup>
          <ColorGroup></ColorGroup>
        </div>
      </div>
    </>
  )
}

export default Home
