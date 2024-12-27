import { DuckoSpriteConfig, DuckoTagConfig } from "../types"

// helper functions
const importImage = (path: string): string => {
  // need to create the fullPath const to circumvent vite bug that
  // arises when using template literals directly in URL constructor
  const fullPath = `./../assets/images/${path}.png`
  return new URL(fullPath, import.meta.url).href
}

export const buildSpriteConfig = (
  folder: string,
  fileDuck: string,
  filesShards: string[]
): DuckoSpriteConfig => ({
  ducko: importImage(`${folder}/${fileDuck}`),
  shards: filesShards.map((file) => importImage(`${folder}/${file}`))
})

// config
const duckSpritesPainty: DuckoSpriteConfig = buildSpriteConfig(
  "painty",
  "duck",
  ["bling", "heart_1", "heart_2"]
)

const duckSpritesCreepy: DuckoSpriteConfig = buildSpriteConfig(
  "creepy",
  "duck_teeth",
  ["heart", "purple_heart"]
)

const duckSpritesAngry: DuckoSpriteConfig = buildSpriteConfig("angry", "duck", [
  "feather",
  "shard1",
  "shard2"
])

const duckSpritesRecord: Record<string, DuckoSpriteConfig> = {
  "minimal techno": duckSpritesPainty,
  hardtechno: duckSpritesCreepy,
  default: duckSpritesAngry
}

export const getSpritesByTag = (tag: string): DuckoTagConfig => {
  const relevantSzene = duckSpritesRecord[tag] || duckSpritesRecord.default

  return {
    ...relevantSzene,
    tag
  }
}
