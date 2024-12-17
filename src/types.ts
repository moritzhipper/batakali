export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type CameraConfig = {
  position: number[]
  lookAt: number[]
}

export type DuckoConfig = {
  shardsVisible: boolean
  dim: boolean
}

export type DuckoSzeneConfig = {
  ducko: DuckoConfig
  camera: CameraConfig
}

export type DuckoSpriteConfig = {
  ducko: string
  shards: string[]
}

export type Project = {
  name: string
  tag: string
  fileName: string
}
