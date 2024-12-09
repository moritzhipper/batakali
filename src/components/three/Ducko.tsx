import { Float } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { memo, useEffect, useMemo, useRef } from "react"
import { Group, Texture, TextureLoader, Vector3 } from "three"
import { lerp } from "three/src/math/MathUtils.js"

import { duckSpritesPainty } from "../../config/szeneConfig"
import { useAudioStore } from "../../state/audioState"
import { DuckoConfig } from "../../types"
import { ImageElement } from "./Shard"
import { TagName } from "./TagName"
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
  const duckRef = useRef<Group>(null!)
  const szeneRef = useRef<Group>(null!)
  const audioImpactRef = useAudioGain()

  const isInitialRender = useRef(true)

  // hier automatismus einbauen, der andere duckos erlaubt
  const { selectedProject } = useAudioStore()
  const { ducko, shards } = duckSpritesPainty

  const duckTexture = useMemo(() => useLoader(TextureLoader, ducko), [])
  const textures = useMemo(() => useLoader(TextureLoader, shards), [])
  const shardList = useMemo(
    () => generateRandomShards(shardConfigList, textures),
    []
  )

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    hideDucko()
  }, [selectedProject.tag])

  // animate ducko szenechange -> Smaller is slower
  const lerpSpeedShowShards = 0.07
  const lerpSpeedHideShards = 0.17
  const lerpSpeedRevealDucko = 0.03
  const minSize = new Vector3(0.7, 0.5, 0.7)
  const center = new Vector3(0, 0, 0)

  const getOpacityFromDistanceToCenter = (positionObj: Vector3) =>
    0.8 - positionObj.distanceTo(center) / 20

  const lerpRevealShards = () => {
    shardRef.current.scale.lerpVectors(
      shardRef.current.scale,
      getScalar(1 + audioImpactRef * 0.15),
      lerpSpeedShowShards
    )

    shardRef.current.traverse((child) => {
      if (child.isSprite) {
        child.material.opacity = lerp(
          child.material.opacity,
          getOpacityFromDistanceToCenter(child.position),
          lerpSpeedShowShards / 2
        )
      }
    })
  }

  const hideShards = () => {
    shardRef.current.scale.lerpVectors(
      shardRef.current.scale,
      minSize,
      lerpSpeedHideShards
    )
    shardRef.current.traverse((child) => {
      if (child.isSprite) {
        child.material.opacity = lerp(
          child.material.opacity,
          0,
          lerpSpeedHideShards
        )
      }
    })
  }

  const hideDucko = () => {
    szeneRef.current.rotation.y = Math.PI / -2
    setGroupOpToZero(duckRef.current)
    setGroupOpToZero(shardRef.current)
  }

  const lerpRevealDucko = () => {
    szeneRef.current.rotation.y = lerp(
      szeneRef.current.rotation.y,
      0,
      lerpSpeedRevealDucko
    )
    duckRef.current.traverse((child) => {
      if (child.isMesh) {
        child.material.opacity = lerp(
          child.material.opacity,
          1,
          lerpSpeedRevealDucko
        )
      }
    })
  }

  const getScalar = (scalar: number) => new Vector3(scalar, scalar, scalar)

  useFrame((_, delta) => {
    if (shardsVisible) {
      lerpRevealShards()
      shardRef.current.rotateY(delta / 50)
    } else {
      hideShards()
    }
    lerpRevealDucko()
  })

  return (
    <>
      <group ref={szeneRef}>
        <Float enabled={animateFloating}>
          <TagName text={selectedProject.tag} />
          <group ref={duckRef}>
            <ImageElement texture={duckTexture} height={5.5} />
          </group>
        </Float>
        <Float rotationIntensity={0.3}>
          <group ref={shardRef}>{shardList}</group>
        </Float>
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

const setGroupOpToZero = (group: Group) => {
  group.traverse((child) => {
    if (child.isMesh || child.isSprite) {
      child.material.opacity = 0
    }
  })
}
