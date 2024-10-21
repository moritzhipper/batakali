import { Environment } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { CameraDolly } from "./CameraDolly"
import { Ducko } from "./Ducko"

export const ThreeWrapper = () => {
  const [duckoState, setDuckoState] = useState(0)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === "/projects") {
      setDuckoState(1)
    }

    if (pathname === "/") {
      setDuckoState(0)
    }
  }, [pathname])

  return (
    <Canvas>
      <fog attach="fog" args={["white", 0, 25]} />
      {/* <Dof /> */}
      <CameraDolly positionIndex={duckoState} />
      {/* <ambientLight intensity={0.7} /> */}
      <pointLight position={[0, 3, 3]} intensity={100} color={"transparent"} />
      {/* <directionalLight
        color="black"
        intensity={70}
        position={[0, 10, 10]}
        lookAt={() => new Vector3(0, 0, 0)}
      /> */}
      <Environment preset="night" />
      {/* <mesh
        visible
        userData={{ hello: "world" }}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="hotpink" transparent />
      </mesh> */}
      fog
      <Ducko rotate={duckoState === 1} />
    </Canvas>
  )
}
