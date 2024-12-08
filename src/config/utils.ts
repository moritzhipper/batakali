import { DuckoSpriteConfig } from "../types"

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
