import { useFrame, useLoader } from "@react-three/fiber"
import { memo, useMemo, useRef } from "react"
import { DoubleSide, Group, MathUtils, Texture, TextureLoader } from "three"
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

  const rotateGroup = (amount: number) => {
    shardRefs.forEach((shardGroup, i) => {
      shardGroup.current.rotateY(amount + (i + 1) * 0.001)
      shardGroup.current.traverse((child) => {
        if (child.isMesh) {
          // child.lookAt(new Vector3(0, 0, -10))
        }
      })
    })
  }

  const moveGroupsToInitialPosition = () => {
    shardRefs.forEach((shardGroup) => {
      shardGroup.current.rotation.y = MathUtils.lerp(
        shardGroup.current.rotation.y,
        0,
        0.04,
      )
    })
  }

  useFrame((state, delta) => {
    if (rotate) {
      rotateGroup(delta / 2)
    } else {
      moveGroupsToInitialPosition()
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
        transparent
        alphaTest={0.1}
        side={DoubleSide}
      />
    </sprite>
  )
}
