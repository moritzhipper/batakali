import { Float } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { memo, useMemo, useRef } from "react"
import {
  DoubleSide,
  Group,
  SpriteMaterial,
  Texture,
  TextureLoader,
  Vector3
} from "three"
import { lerp } from "three/src/math/MathUtils.js"
import duck from "../assets/images/duck.png"
import feather from "../assets/images/feather.png"
import shard1 from "../assets/images/shard1.png"
import shard2 from "../assets/images/shard2.png"
import { DuckoConfig } from "../types"
import { getRandomPositionInSphereWithXBias, randomInt } from "./utils"

type Props = {
  duckoConfig: DuckoConfig
}

export const Ducko = memo(({ duckoConfig }: Props) => {
  const { animateFloating, shardsVisible } = duckoConfig

  // setup Ducko
  let duckTexture = useLoader(TextureLoader, duck)
  const shardRef = useRef<Group>(null)

  const textures = useMemo(
    () => [
      useLoader(TextureLoader, feather),
      useLoader(TextureLoader, shard1),
      useLoader(TextureLoader, shard2)
    ],
    []
  )

  const shardList = useMemo(
    () => [
      ...generateRandomSpriteElements(10, 1.5, textures, 3, 4),
      ...generateRandomSpriteElements(20, 0.9, textures, 3, 5),
      ...generateRandomSpriteElements(50, 0.5, textures, 4, 7),
      ...generateRandomSpriteElements(50, 0.5, textures, 7, 8)
    ],
    []
  )

  // animate ducko szenechange -> Smaller is slower
  const lerpSpeedShow = 0.1
  const lerpSpeedHide = 0.2
  const minSize = new Vector3(0.7, 0.7, 0.7)
  const fullSize = new Vector3(1, 1, 1)

  const showShards = () => {
    shardRef.current.scale.lerpVectors(
      shardRef.current.scale,
      fullSize,
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

  useFrame((_, delta) => {
    if (shardsVisible) {
      showShards()
      shardRef.current.rotateY(delta / 30)
    } else {
      hideShards()
    }
  })

  return (
    <>
      <Float enabled={animateFloating}>
        <ImageElement
          texture={duckTexture}
          x={0}
          y={0}
          rotation={0}
          height={5.5}
        />
      </Float>
      <group ref={shardRef}>
        <Float>{shardList}</Float>
      </group>
    </>
  )
})

type ImageProps = {
  texture: Texture
  x: number
  y: number
  height: number
  rotation?: number
}

const ImageElement = ({ texture, x, y, height, rotation }: ImageProps) => {
  // either sets rotation from input or rotates it pointing to the center
  const actualRotation = rotation ?? Math.atan2(y, x) + 3 * (Math.PI / 2)
  const imageWidth = texture.image.width
  const imageHeight = texture.image.height

  const scaledWidth = (imageWidth / imageHeight) * height

  return (
    <mesh
      scale={[scaledWidth, height, 1]}
      position={[x, y, 0]}
      rotation={[0, 0, actualRotation]}
    >
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        map={texture}
        transparent
        side={DoubleSide}
        alphaToCoverage={true}
      />
    </mesh>
  )
}

const center = new Vector3(0, 0, 0)
export const getOpacityFromDistanceToCenter = (positionObj: Vector3) => {
  const min = 4.5
  const max = 12

  const distance = positionObj.distanceTo(center)
  if (distance <= min) return 1
  if (distance >= max) return 0

  // Map distance between min and max to a value between 1 and 0
  return (max - distance) / (max - min)
}

type SpriteProps = {
  texture: Texture
  position: Vector3
  height: number
}

const SpriteElement = ({ texture, position, height }: SpriteProps) => {
  const imageWidth = texture.image.width
  const imageHeight = texture.image.height
  const scaledWidth = (imageWidth / imageHeight) * height

  const spreteMat = new SpriteMaterial({
    map: texture,
    opacity: 0,
    alphaToCoverage: true,
    side: DoubleSide
  })

  return (
    <sprite
      scale={[scaledWidth, height, 1]}
      position={position}
      material={spreteMat}
    />
  )
}

const generateRandomSpriteElements = (
  amount: number,
  height: number,
  textures: Texture[],
  innerRadius: number,
  outerRadius: number
): JSX.Element[] => {
  const sprites = []

  for (let i = 0; i < amount; i++) {
    const randomPos = getRandomPositionInSphereWithXBias(
      innerRadius,
      outerRadius,
      2
    )
    const randomTexture = textures[randomInt(0, textures.length)]

    sprites.push(
      <SpriteElement
        position={randomPos}
        height={height}
        texture={randomTexture}
      />
    )
  }

  return sprites
}
