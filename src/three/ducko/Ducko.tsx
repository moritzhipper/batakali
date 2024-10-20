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

  const [sprites1, sprites2, sprites3] = useMemo(
    () => distributeRandomly(allShards, textures),
    [],
  )

  // distribute sprites randomly to three groups to allow rotation in different speeds

  // animate ducko szenechange
  const shards1 = useRef<Group>(null)
  const shards2 = useRef<Group>(null)
  const shards3 = useRef<Group>(null)

  useFrame((state, delta) => {
    if (rotate) {
      shards1.current.rotateY(delta)
    } else {
      shards1.current.rotation.y = MathUtils.lerp(
        shards1.current.rotation.y,
        0,
        0.04,
      )
    }
  })

  return (
    <>
      <Image texture={duckTexture} x={0} y={0} rotation={0} height={5.5} />
      <group ref={shards1}>{sprites1}</group>
      <group ref={shards2}>{sprites2}</group>
      <group ref={shards3}>{sprites3}</group>
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
      const randomArray = randomInt(0, 2)
      imageCompArrays[randomArray].push(
        <Image
          x={sprite.x}
          y={sprite.y}
          texture={textures[sprite.textureIndex]}
          height={spriteConfig.height}
          key={imageCompArrays[randomArray].length}
        />,
      )
    })
  })

  return imageCompArrays
}

type ImageProps = {
  texture: Texture
  x: number
  y: number
  height: number
  rotation?: number
}

const Image = ({ texture, x, y, height, rotation }: ImageProps) => {
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
