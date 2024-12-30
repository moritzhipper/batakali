export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// configure camera
export type CameraConfig = {
  position: number[]
  lookAt: number[]
}

// configure what is shown in the szene
export type DuckoConfig = {
  showShards: boolean
  dim: boolean
}

export type DuckoSzeneConfig = {
  ducko: DuckoConfig
  camera: CameraConfig
}

// configure sprites and color per musical tag
export type DuckoTagConfig = {
  color: string
  ducko: string
  shards: string[]
  tag?: string
}

export type Project = {
  name: string
  tag: string
  fileName: string
}
