import { Canvas } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { CameraDolly } from "./CameraDolly"
import { Ducko } from "./Ducko"

type DuckoSzeneConfig = {
  shardsVisible: boolean
  cameraPositionIndex: number
}

const duckoSzenes: DuckoSzeneConfig[] = [
  {
    shardsVisible: false,
    cameraPositionIndex: 0
  },
  {
    shardsVisible: true,
    cameraPositionIndex: 1
  },
  {
    shardsVisible: true,
    cameraPositionIndex: 0
  }
]

export const ThreeWrapper = () => {
  const [shardsVisible, setShardsVisible] = useState(false)
  const [cameraPositionIndex, setCameraPositionIndex] = useState(0)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === "/projects") {
      setShardsVisible(true)
      setCameraPositionIndex(1)
    }

    if (pathname === "/") {
      setCameraPositionIndex(0)
      setShardsVisible(false)
    }
    if (pathname === "/duck") {
      setShardsVisible(true)
      setCameraPositionIndex(0)
    }
    if (pathname === "/about") {
      setShardsVisible(true)
      setCameraPositionIndex(2)
    }
  }, [pathname])

  return (
    <Canvas>
      <fog attach="fog" args={["white", 0, 25]} />
      {/* <Dof /> */}
      <CameraDolly positionIndex={cameraPositionIndex} />
      <pointLight position={[3, 4, 3]} intensity={100} color={"white"} />
      <Ducko showShards={shardsVisible} />
    </Canvas>
  )
}
