import { useFrame, useLoader } from "@react-three/fiber"
import { memo, useMemo, useRef } from "react"
import { DoubleSide, Group, Texture, TextureLoader, Vector3 } from "three"
import { lerp } from "three/src/math/MathUtils.js"
import duck from "../../assets/images/duck.png"
import feather from "../../assets/images/feather.png"
import shard1 from "../../assets/images/shard1.png"
import shard2 from "../../assets/images/shard2.png"
import { randomInt } from "../utils"
import {
  bigShards,
  mediumShards,
  smallShardsInner,
  smallShardsOuter,
  SpriteConfig,
} from "./shards"

type DuckoProps = {
  rotate: boolean
}

export const Ducko = memo(({ rotate }: DuckoProps) => {
  // setup Ducko
  const duckTexture = useLoader(TextureLoader, duck)
  const textures = [
    useLoader(TextureLoader, feather),
    useLoader(TextureLoader, shard1),
    useLoader(TextureLoader, shard2),
  ]

  const allShards = [
    bigShards,
    mediumShards,
    smallShardsInner,
    smallShardsOuter,
  ]

  // hier useMemo nutzen
  const spriteLists = useMemo(() => distributeRandomly(allShards, textures), [])

  // animate ducko szenechange
  const shardRefs = [
    useRef<Group>(null),
    useRef<Group>(null),
    useRef<Group>(null),
  ]
  const lerpSpeed = 0.4
  const minSize = new Vector3(0.7, 0.7, 0.7)
  const fullSize = new Vector3(1, 1, 1)

  const showGroup = (amount: number) => {
    shardRefs.forEach((shardGroup, i) => {
      shardGroup.current.rotateY(amount + (i + 1) * 0.001)
      shardGroup.current.scale.lerpVectors(
        shardGroup.current.scale,
        fullSize,
        lerpSpeed,
      )
      shardGroup.current.traverse((child) => {
        if (child.isSprite) {
          child.material.opacity = lerp(child.material.opacity, 1, lerpSpeed)
        }
      })
    })
  }

  const hideGroup = () => {
    shardRefs.forEach((shardGroup) => {
      shardGroup.current.scale.lerpVectors(
        shardGroup.current.scale,
        minSize,
        0.3,
      )
      shardGroup.current.traverse((child) => {
        if (child.isSprite) {
          child.material.opacity = lerp(child.material.opacity, 0, lerpSpeed)
        }
      })
    })
  }

  useFrame((state, delta) => {
    if (rotate) {
      showGroup(delta / 2)
    } else {
      hideGroup()
    }
  })

  return (
    <>
      <ImageElement
        texture={duckTexture}
        x={0}
        y={0}
        rotation={0}
        height={5.5}
      />

      <group ref={shardRefs[0]}>{spriteLists[0]}</group>
      <group ref={shardRefs[1]}>{spriteLists[1]}</group>
      <group ref={shardRefs[2]}>{spriteLists[2]}</group>
    </>
  )
})

function distributeRandomly(
  items: SpriteConfig[],
  textures: Texture[],
): Array<JSX.Element[]> {
  const imageCompArrays: Array<JSX.Element[]> = [[], [], []]

  // assign height to instance
  // put instance randomly in one of three arrays as ImageComp
  items.forEach((spriteConfig) => {
    spriteConfig.instances.forEach((sprite) => {
      const randomArray = randomInt(0, 3)
      imageCompArrays[randomArray].push(
        <SpriteElement
          x={sprite.x}
          y={sprite.y}
          texture={textures[sprite.textureIndex]}
          height={spriteConfig.height}
          key={imageCompArrays[randomArray].length}
        />,
      )
    })
  })
  console.log(imageCompArrays)
  return imageCompArrays
}

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
        alphaTest={0.1}
        side={DoubleSide}
      />
    </mesh>
  )
}

type SpriteProps = {
  texture: Texture
  x: number
  y: number
  height: number
}

const SpriteElement = ({ texture, x, y, height }: SpriteProps) => {
  const imageWidth = texture.image.width
  const imageHeight = texture.image.height
  const scaledWidth = (imageWidth / imageHeight) * height

  return (
    <sprite scale={[scaledWidth, height, 1]} position={[x, y, 0]}>
      <spriteMaterial
        map={texture}
        opacity={0}
        transparent
        alphaTest={0.1}
        side={DoubleSide}
      />
    </sprite>
  )
}
function showGroup(arg0: number) {
  throw new Error("Function not implemented.")
}

function hideGroup() {
  throw new Error("Function not implemented.")
}
