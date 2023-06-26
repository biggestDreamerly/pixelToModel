/*
 * @Author: lvy lvy
 * @Date: 2023-06-15 18:26:09
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-06-20 18:38:31
 * @FilePath: /my-t3-app/src/pages/canvas/scene.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import useEditor from '~/store/actions'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import OtherMesh from '~/pages/canvas/Mesh/index'
extend({ OrbitControls })
export default () => {
  const { pixelData } = useEditor() as any

  const CameraControls = () => {
    const [center, setCenter] = useState({ x: 0, y: 0, z: 0 })
    const { camera, gl, scene } = useThree()
    const controlsRef = useRef()

    useEffect(() => {
      const calculateCenter = () => {
        const boundingBox = new THREE.Box3()
        Object.values(pixelData).forEach((i: any) => {
          const position = new THREE.Vector3(i.x / 10, -i.y / 10, 0)
          boundingBox.expandByPoint(position)
        })

        const boundingBoxCenter = new THREE.Vector3()
        boundingBox.getCenter(boundingBoxCenter)

        setCenter({
          x: boundingBoxCenter.x,
          y: boundingBoxCenter.y,
          z: boundingBoxCenter.z,
        })
      }

      calculateCenter()
    }, [pixelData])

    useFrame(() => {
      controlsRef.current.update()
    })

    return (
      <orbitControls
        autoRotate
        ref={controlsRef}
        target={[center.x, center.y, center.z]}
        args={[camera, gl.domElement]}
      />
    )
  }

  function Box(props: any) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const { type } = props
    function getGeometry() {
      if (type == 'triangle') {
        return <boxGeometry args={[0.1, 0.1, 0.05]} />
      } else {
        return <boxGeometry args={[0.1, 0.1, 0.05]} />
      }
    }
    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (ref.current.rotation.x += delta))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={ref}
        // scale={clicked ? 1.5 : 1}
        onClick={(event) => {
          click(!clicked)
        }}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      >
        {getGeometry()}
        <meshStandardMaterial color={props.color} />
      </mesh>
    )
  }
  function ExportGlb(_) {
    const exporter = new GLTFExporter()
    const { scene } = useThree()
    function save(blob: any, filename: any) {
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = filename
      link.click()

      // URL.revokeObjectURL( url ); breaks Firefox...
    }
    function c() {
      exporter.parse(
        scene,
        (glb) => {
          const output = JSON.stringify(glb, null, 2)
          // 将 gltf 数据保存为二进制文件
          save(new Blob([output], { type: 'text/plain' }), 'scene.gltf')
        },
        // 导出配置项，这个是可选的
        {
          binary: true, // 是否导出为二进制格式
          trs: false, // 如果是 true，会为每个对象添加缩放、位移、旋转等变换信息
          onlyVisible: true, // 只导出可见的对象
          includeCustomExtensions: true, // 是否包含用户自定义的扩展信息
          prettyPrint: true, // 是否格式化输出
        }
      )
    }

    return <></>
  }
  return (
    <>
      <Canvas className=" bg-white " style={{ height: '400px' }}>
        {/* <CameraControls></CameraControls> */}
        {/* <OrbitControls></OrbitControls> */}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <CameraControls />
        {Object.values(pixelData).map((i: any) => {
          return (
            <>
              <OtherMesh
                type="triangle"
                position={[i.x / 10, -i.y / 10, 0]}
                scale={[1, 1, i.scale]}
                scaleDeth={i.scale}
                color={i.color}
              />
            </>
          )
        })}
        {/* {/* <Box position={[-1.2, 0, 0]} /> */}
        {/* <Box position={[1, 1.2, 0]} />
  <Box position={[1, 3, 0]} /> */}
        <ExportGlb />
      </Canvas>
    </>
  )
}
