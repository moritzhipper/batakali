import { DuckoTagConfig } from "../types"

type CreateTagConfigInput = {
  tag: string
  color: string
  folder: string
  fileDuck: string
  filesShards: string[]
}

// helper functions
const importImage = (path: string): string => {
  // need to create the fullPath const to circumvent vite bug that
  // arises when using template literals directly in URL constructor
  const fullPath = `./../assets/images/${path}.png`
  return new URL(fullPath, import.meta.url).href
}

export const createTagConfig = ({
  tag,
  color,
  folder,
  fileDuck,
  filesShards
}: CreateTagConfigInput): DuckoTagConfig => ({
  tag,
  color,
  ducko: importImage(`${folder}/${fileDuck}`),
  shards: filesShards.map((file) => importImage(`${folder}/${file}`))
})

// config
const configMinimal: DuckoTagConfig = createTagConfig({
  tag: "minimal techno",
  color: "#f00",
  folder: "painty",
  fileDuck: "duck",
  filesShards: ["bling", "heart_1", "heart_2"]
})

const configHardTechno: DuckoTagConfig = createTagConfig({
  tag: "hiphop",
  color: "#0f0",
  folder: "creepy",
  fileDuck: "duck_teeth",
  filesShards: ["heart", "purple_heart"]
})

const configDefault: DuckoTagConfig = createTagConfig({
  tag: "default",
  color: "#fff",
  folder: "angry",
  fileDuck: "duck",
  filesShards: ["feather", "shard1", "shard2"]
})

const allSpriteConfigs = [configMinimal, configHardTechno]

export const getSpritesByTag = (tag: string): DuckoTagConfig => {
  return (
    allSpriteConfigs.find((conf) => conf.tag === tag) || {
      ...configDefault,
      tag
    }
  )
}
