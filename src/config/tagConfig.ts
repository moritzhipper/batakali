import { DuckoTagConfig } from "../types"

type CreateTagConfigInput = {
  color: string
  folder: string
  fileDuck: string
  filesShards: string[]
}

// helper functions
const importImage = (path: string): string => {
  // need to create the fullPath const to circumvent vite bug that
  // arises when using template literals directly in URL constructor
  const fullPath = `/ducks/${path}.png`
  return import.meta.resolve(fullPath)
}

export const createTagConfig = ({
  color,
  folder,
  fileDuck,
  filesShards
}: CreateTagConfigInput): DuckoTagConfig => ({
  color,
  ducko: importImage(`${folder}/${fileDuck}`),
  shards: filesShards.map((file) => importImage(`${folder}/${file}`))
})

// config
const paintyDucko: DuckoTagConfig = createTagConfig({
  color: "#f5a8ec",
  folder: "painty",
  fileDuck: "duck_bg",
  filesShards: ["bling", "heart_1", "heart_2"]
})

const teethDucko: DuckoTagConfig = createTagConfig({
  color: "#516112",
  folder: "teeth",
  fileDuck: "duck_less_teeth",
  filesShards: ["heart", "purple_heart"]
})

const futureDucko: DuckoTagConfig = createTagConfig({
  color: "#fff",
  folder: "future",
  fileDuck: "future_duck",
  filesShards: ["metal", "screw", "synth_1"]
})

const rockyDucko: DuckoTagConfig = createTagConfig({
  color: "#ccc",
  folder: "rocky",
  fileDuck: "duck",
  filesShards: ["shard_1", "shard_2", "shard_3", "shard_4"]
})

const naturalDucko: DuckoTagConfig = createTagConfig({
  color: "#66bf9b",
  folder: "natural",
  fileDuck: "duck",
  filesShards: ["leaf", "leaf_2", "stick"]
})

const minimalDucko: DuckoTagConfig = createTagConfig({
  color: "#19aeff",
  folder: "minimal",
  fileDuck: "duck_9",
  filesShards: ["heart_1", "heart_2", "heart_3"]
})

const defaultDucko: DuckoTagConfig = createTagConfig({
  color: "#fff",
  folder: "default",
  fileDuck: "duck",
  filesShards: ["feather", "shard1", "shard2"]
})

const duckoSpritesRecord: Record<string, DuckoTagConfig> = {
  synthwave: futureDucko,
  trance: paintyDucko,
  "hard techno": rockyDucko,
  hiphop: teethDucko,
  boombap: naturalDucko,
  minimal: minimalDucko
}

export const getSpritesByTag = (tag: string): DuckoTagConfig => {
  const config = duckoSpritesRecord[tag] || defaultDucko

  return {
    ...config,
    tag
  }
}
