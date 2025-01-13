import { create } from "zustand"
import { getConfigByName } from "../config/szeneConfig"
import { DuckoSzeneConfig } from "../types"

type SzeneState = {
  activeSzene: DuckoSzeneConfig
  setActiveSzene: (szeneName: string) => void
}

export const useSzeneState = create<SzeneState>((set) => ({
  activeSzene: getConfigByName("default"),
  setActiveSzene: (name: string) => set({ activeSzene: getConfigByName(name) })
}))
