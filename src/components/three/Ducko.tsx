import { Float } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { memo, useMemo, useRef } from "react"
import { Group, Texture, TextureLoader, Vector3 } from "three"
import { lerp } from "three/src/math/MathUtils.js"

import { duckSpritesPainty } from "../../duckoSzeneConfig"
import { DuckoConfig } from "../../types"
import { ImageElement } from "./Shard"
import { useAudioGain } from "./useAudioGainHook"
import { getRandomPositionInSphereWithXBias, randomInt } from "./utils"

type Props = {
  duckoConfig: DuckoConfig
}

const shardConfigList: ShardGeneratorConfig[] = [
  { amount: 10, height: 1.5, innerRadius: 5, outerRadius: 6 },
  { amount: 20, height: 0.9, innerRadius: 5, outerRadius: 7 },
  { amount: 30, height: 0.7, innerRadius: 6, outerRadius: 9 },
  { amount: 80, height: 0.5, innerRadius: 9, outerRadius: 20 }
]

export const Ducko = memo(({ duckoConfig }: Props) => {
  const { animateFloating, shardsVisible } = duckoConfig
  const shardRef = useRef<Group>(null!)
  const audioImpactRef = useAudioGain()

  const { ducko, shards } = duckSpritesPainty

  const duckTexture = useMemo(() => useLoader(TextureLoader, ducko), [])
  const textures = useMemo(() => useLoader(TextureLoader, shards), [])

  const shardList = useMemo(
    () => generateRandomShards(shardConfigList, textures),
    []
  )

  // animate ducko szenechange -> Smaller is slower
  const lerpSpeedShow = 0.09
  const lerpSpeedHide = 0.17
  const minSize = new Vector3(0.7, 0.5, 0.7)
  const center = new Vector3(0, 0, 0)

  const getOpacityFromDistanceToCenter = (positionObj: Vector3) =>
    0.8 - positionObj.distanceTo(center) / 20

  const showShards = () => {
    shardRef.current.scale.lerpVectors(
      shardRef.current.scale,
      getScalar(1 + audioImpactRef * 0.15),
      lerpSpeedShow
    )

    shardRef.current.traverse((child) => {
      if (child.isSprite) {
        child.material.opacity = lerp(
          child.material.opacity,
          getOpacityFromDistanceToCenter(child.position),
          lerpSpeedShow
        )
      }
    })
  }

  const hideShards = () => {
    shardRef.current.scale.lerpVectors(
      shardRef.current.scale,
      minSize,
      lerpSpeedHide
    )
    shardRef.current.traverse((child) => {
      if (child.isSprite) {
        child.material.opacity = lerp(child.material.opacity, 0, lerpSpeedHide)
      }
    })
  }

  const getScalar = (scalar: number) => new Vector3(scalar, scalar, scalar)

  useFrame((_, delta) => {
    if (shardsVisible) {
      showShards()
      shardRef.current.rotateY(delta / 50)
    } else {
      hideShards()
    }
  })

  return (
    <>
      <Float enabled={animateFloating}>
        <ImageElement texture={duckTexture} height={5.5} />
      </Float>
      <group ref={shardRef}>
        <Float rotationIntensity={0.3}>{shardList}</Float>
      </group>
    </>
  )
})

type ShardGeneratorConfig = {
  height: number
  amount: number
  innerRadius: number
  outerRadius: number
}

const generateRandomShards = (
  configList: ShardGeneratorConfig[],
  textures: Texture[]
): JSX.Element[] => {
  const sprites = []

  for (const { amount, height, innerRadius, outerRadius } of configList) {
    for (let i = 0; i < amount; i++) {
      const randomPos = getRandomPositionInSphereWithXBias(
        innerRadius,
        outerRadius,
        0.65
      )
      const randomTexture = textures[randomInt(0, textures.length)]

      sprites.push(
        <ImageElement
          position={randomPos}
          height={height}
          texture={randomTexture}
          asSprite
          key={sprites.length}
        />
      )
    }
  }

  return sprites
}
