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
import duck from "../../assets/images/duck.png"
import feather from "../../assets/images/feather.png"
import shard1 from "../../assets/images/shard1.png"
import shard2 from "../../assets/images/shard2.png"
import { DuckoConfig } from "../../types"
import { useAudioGain } from "./useAudioGainHook"
import { getRandomPositionInSphereWithXBias, randomInt } from "./utils"

type Props = {
  duckoConfig: DuckoConfig
}

export const Ducko = memo(({ duckoConfig }: Props) => {
  const { animateFloating, shardsVisible } = duckoConfig

  const shardRef = useRef<Group>(null)
  const audioImpactRef = useAudioGain()

  const duckTexture = useMemo(() => useLoader(TextureLoader, duck), [])
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
      ...generateRandomSpriteElements(10, 1.5, textures, 5, 6),
      ...generateRandomSpriteElements(30, 0.9, textures, 5, 7),
      ...generateRandomSpriteElements(30, 0.7, textures, 6, 9),
      ...generateRandomSpriteElements(80, 0.5, textures, 9, 20)
    ],
    []
  )

  // animate ducko szenechange -> Smaller is slower
  const lerpSpeedShow = 0.09
  const lerpSpeedHide = 0.17
  const minSize = new Vector3(0.7, 0.5, 0.7)
  const center = new Vector3(0, 0, 0)

  const getOpacityFromDistanceToCenter = (positionObj: Vector3) =>
    1 - positionObj.distanceTo(center) / 14

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
        <ImageElement
          texture={duckTexture}
          x={0}
          y={0}
          rotation={0}
          height={5.5}
        />
      </Float>
      <group ref={shardRef}>
        <Float rotationIntensity={0.3}>{shardList}</Float>
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
      0.65
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
