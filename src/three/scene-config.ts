export const getConfigForRoute = (route?: string): DuckoSzeneConfig => {
  if (!route) return defaultSzene

  return {
    ...defaultSzene,
    ...duckoSzenes[route]
  }
}

export type CameraConfig = {
  position: number[]
  lookAt: number[]
}

export type DuckoSzeneConfig = {
  shardsVisible?: boolean
  animateFloating?: boolean
  camera: CameraConfig
}

const defaultSzene: DuckoSzeneConfig = {
  shardsVisible: true,
  animateFloating: true,
  camera: {
    position: [0, 0, 10],
    lookAt: [0, 0, 0]
  }
}

const duckoSzenes: Record<string, DuckoSzeneConfig> = {
  "/": {
    shardsVisible: false,
    animateFloating: false,
    camera: {
      position: [0, 0, 10],
      lookAt: [0, 0, 0]
    }
  },
  "/projects": {
    shardsVisible: true,
    camera: {
      position: [0, -4, 10],
      lookAt: [0, -2, 0]
    }
  },
  "/about": {
    shardsVisible: true,
    camera: {
      position: [-2, -1, 3],
      lookAt: [0, 0, 0]
    }
  },
  "/duck": {
    shardsVisible: true,
    camera: {
      position: [0, 0, 8],
      lookAt: [0, 0, 0]
    }
  },
  "/imprint": {
    shardsVisible: false,
    camera: {
      position: [-2, -2, 5],
      lookAt: [0, 0, 0]
    }
  },
  "/privacy": {
    shardsVisible: false,
    camera: {
      position: [2, -2, 5],
      lookAt: [0, 0, 0]
    }
  }
}
