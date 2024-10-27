export type CameraConfig = {
  position: number[]
  lookAt: number[]
}

export type DuckoSzeneConfig = {
  shardsVisible: boolean
  camera: CameraConfig
}

export const duckoSzenes: DuckoSzeneConfig[] = [
  {
    shardsVisible: false,
    camera: {
      position: [0, 0, 10],
      lookAt: [0, 0, 0]
    }
  },
  {
    shardsVisible: true,
    camera: {
      position: [0, -4, 10],
      lookAt: [0, -2, 0]
    }
  },
  {
    shardsVisible: true,
    camera: {
      position: [-3, -1, 4],
      lookAt: [0, 0, 0]
    }
  },
  {
    shardsVisible: true,
    camera: {
      position: [0, 0, 8],
      lookAt: [0, 0, 0]
    }
  }
]
