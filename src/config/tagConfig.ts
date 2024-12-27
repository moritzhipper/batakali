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
  const fullPath = `./../assets/images/${path}.png`
  return new URL(fullPath, import.meta.url).href
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

/**
 * synthwave x
 * minimal techno x
 * boombap x
 * hardcore techno x
 * trance
 * hiphop
 *
 *
 */

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

const defaultDucko: DuckoTagConfig = createTagConfig({
  color: "#fff",
  folder: "default",
  fileDuck: "duck",
  filesShards: ["feather", "shard1", "shard2"]
})

const duckoSpritesRecord: Record<string, DuckoTagConfig> = {
  boombap: paintyDucko,
  synthwave: futureDucko,
  trance: teethDucko,
  "hard techno": rockyDucko
}

export const getSpritesByTag = (
  tag: string
): DuckoTagConfig & { tag: string } => {
  const config = duckoSpritesRecord[tag] || defaultDucko

  return {
    ...config,
    tag
  }
}
