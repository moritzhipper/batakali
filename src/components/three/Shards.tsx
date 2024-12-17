import { GroupProps, useLoader } from "@react-three/fiber"
import { useMemo } from "react"
import { Texture, TextureLoader } from "three"
import { ImageElement } from "./Shard"
import { getRandomPositionInSphereWithXBias, randomInt } from "./utils"

type Props = {
  images: string[]
} & GroupProps

export const Shards = ({ images }: Props) => {
  const textures = useLoader(TextureLoader, images)
  const shards = useMemo(
    () => generateRandomShards(shardConfigList, textures),
    [textures]
  )

  return shards
}

const shardConfigList: ShardGeneratorConfig[] = [
  { amount: 10, height: 1.5, innerRadius: 5, outerRadius: 6 },
  { amount: 20, height: 0.9, innerRadius: 5, outerRadius: 7 },
  { amount: 30, height: 0.7, innerRadius: 6, outerRadius: 9 },
  { amount: 80, height: 0.5, innerRadius: 9, outerRadius: 20 }
]

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
  const shards = []

  for (const { amount, height, innerRadius, outerRadius } of configList) {
    for (let i = 0; i < amount; i++) {
      const randomPos = getRandomPositionInSphereWithXBias(
        innerRadius,
        outerRadius,
        0.65
      )
      const randomTexture = textures[randomInt(0, textures.length)]

      shards.push(
        <ImageElement
          position={randomPos}
          height={height}
          texture={randomTexture}
          asSprite
          key={shards.length}
        />
      )
    }
  }

  return shards
}
