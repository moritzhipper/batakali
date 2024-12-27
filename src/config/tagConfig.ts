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

/**
 * synthwave x
 * minimal techno x
 * boombap x
 * hiphop
 * trance
 * hardcore techno
 *
 *
 */

// config
const configMinimal: DuckoTagConfig = createTagConfig({
  tag: "boombap",
  color: "#f5a8ec",
  folder: "painty",
  fileDuck: "duck_bg",
  filesShards: ["bling", "heart_1", "heart_2"]
})

const techno: DuckoTagConfig = createTagConfig({
  tag: "minimal techno",
  color: "#516112",
  folder: "techno",
  fileDuck: "duck_less_teeth",
  filesShards: ["heart", "purple_heart"]
})

const configTrance: DuckoTagConfig = createTagConfig({
  tag: "synthwave",
  color: "#fff",
  folder: "future",
  fileDuck: "future_duck",
  filesShards: ["metal", "screw", "synth_1"]
})

const configDefault: DuckoTagConfig = createTagConfig({
  tag: "default",
  color: "#fff",
  folder: "angry",
  fileDuck: "duck",
  filesShards: ["feather", "shard1", "shard2"]
})

const allSpriteConfigs = [configMinimal, techno, configTrance]

export const getSpritesByTag = (tag: string): DuckoTagConfig => {
  return (
    allSpriteConfigs.find((conf) => conf.tag === tag) || {
      ...configDefault,
      tag
    }
  )
}
