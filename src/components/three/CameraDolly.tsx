import { a, useSpringValue } from "@react-spring/three"
import { PerspectiveCamera } from "@react-three/drei"
import { PerspectiveCameraProps, useThree } from "@react-three/fiber"
import { useEffect, useMemo } from "react"
import { springConfig } from "../../angry-ducko-config"
import { CameraConfig } from "../../types"

type Props = {
  cameraConfig: CameraConfig
}

export const CameraDolly = ({ cameraConfig }: Props) => {
  const AnimatedCamera = useMemo(() => a(CameraWrapper), [])
  const positionSpring = useSpringValue(cameraConfig.position, springConfig)
  const lookAtSpring = useSpringValue(cameraConfig.lookAt, springConfig)

  useEffect(() => {
    lookAtSpring.start(cameraConfig.lookAt)
    positionSpring.start(cameraConfig.position)
  }, [cameraConfig])

  return (
    <>
      <PerspectiveCamera makeDefault far={100} near={0.01} />
      <AnimatedCamera position={positionSpring} lookAt={lookAtSpring} />
    </>
  )
}

const CameraWrapper = ({ position, lookAt }: PerspectiveCameraProps) => {
  const { camera } = useThree()
  camera.position.set(...position)
  camera.lookAt(...lookAt)

  return null
}
