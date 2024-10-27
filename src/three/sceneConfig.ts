export type CameraConfig = {
  position: number[]
  lookAt: number[]
}

export type DuckoSzeneConfig = {
  shardsVisible: boolean
  camera: CameraConfig
}

export const getConfigForRoute = (route?: string): DuckoSzeneConfig => {
  if (route === "/") return duckoSzenes[0]
  if (route === "/projects") return duckoSzenes[1]
  if (route === "/about") return duckoSzenes[2]
  if (route === "/duck") return duckoSzenes[3]
  if (route === "/imprint") return duckoSzenes[4]
  if (route === "/privacy") return duckoSzenes[5]

  return duckoSzenes[0]
}

const duckoSzenes: DuckoSzeneConfig[] = [
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
      position: [-2, -1, 3],
      lookAt: [0, 0, 0]
    }
  },
  {
    shardsVisible: true,
    camera: {
      position: [0, 0, 8],
      lookAt: [0, 0, 0]
    }
  },
  {
    shardsVisible: true,
    camera: {
      position: [-2, -2, 5],
      lookAt: [0, 0, 0]
    }
  },
  {
    shardsVisible: true,
    camera: {
      position: [2, -2, 5],
      lookAt: [0, 0, 0]
    }
  }
]
