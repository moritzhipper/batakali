import { Float } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { memo, useMemo, useRef } from "react"
import { DoubleSide, Group, Texture, TextureLoader, Vector3 } from "three"
import { lerp } from "three/src/math/MathUtils.js"
import duck from "../assets/images/duck.png"
import feather from "../assets/images/feather.png"
import shard1 from "../assets/images/shard1.png"
import shard2 from "../assets/images/shard2.png"
import { getRandomPositionInSphereWithXBias, randomInt } from "./utils"

type DuckoProps = {
  rotate: boolean
}

export const Ducko = memo(({ rotate }: DuckoProps) => {
  // setup Ducko
  const duckTexture = useLoader(TextureLoader, duck)
  const textures = [
    useLoader(TextureLoader, feather),
    useLoader(TextureLoader, shard1),
    useLoader(TextureLoader, shard2)
  ]

  const shardList = useMemo(
    () => [
      ...generateRandomSpriteElements(20, 1.1, textures, 3, 4),
      ...generateRandomSpriteElements(20, 0.6, textures, 3, 5),
      ...generateRandomSpriteElements(40, 0.5, textures, 4, 7)
    ],
    []
  )

  const shardRef = useRef<Group>(null)

  // animate ducko szenechange
  const lerpSpeed = 0.4
  const lerpSpeedSlow = 0.07
  const minSize = new Vector3(0.7, 0.7, 0.3)
  const fullSize = new Vector3(1, 1, 1)

  const animateShards = (amount: number) => {
    shardRef.current.rotateY(amount)
    shardRef.current.scale.lerpVectors(
      shardRef.current.scale,
      fullSize,
      lerpSpeedSlow
    )
    shardRef.current.traverse((child) => {
      if (child.isSprite) {
        child.material.opacity = lerp(child.material.opacity, 1, lerpSpeed)
      }
    })
  }

  const hideShards = () => {
    shardRef.current.scale.lerpVectors(
      shardRef.current.scale,
      minSize,
      lerpSpeedSlow
    )
    shardRef.current.traverse((child) => {
      if (child.isSprite) {
        child.material.opacity = lerp(child.material.opacity, 0, lerpSpeedSlow)
      }
    })
  }

  useFrame((state, delta) => {
    if (rotate) {
      animateShards(delta / 30)
    } else {
      hideShards()
    }
  })

  return (
    <>
      <Float enabled={rotate}>
        <ImageElement
          texture={duckTexture}
          x={0}
          y={0}
          rotation={0}
          height={5.5}
        />
      </Float>
      <group ref={shardRef}>
        {shardList}
        <Float rotationIntensity={1.2} floatIntensity={2}></Float>
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
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.5}
        side={DoubleSide}
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

  return (
    <sprite scale={[scaledWidth, height, 1]} position={position}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={0}
        alphaTest={0.75}
        side={DoubleSide}
      />
    </sprite>
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
