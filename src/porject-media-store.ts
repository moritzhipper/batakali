import { create } from "zustand"
import { projectList } from "./project-list"
import { Project } from "./types"

type MediaStore = {
  isPlaying: boolean
  selectedProject: Project
  projectList: Project[]
  selectProject: (name: string) => void
  playPause: () => void
}

export const useMediaStore = create<MediaStore>((set) => ({
  isPlaying: false,
  selectedProject: null,
  projectList: projectList,
  selectProject: (name: string) =>
    set((state) => ({
      ...state,
      selectedProject: findByName(state.projectList, name)
    })),
  playPause: () => set((state) => ({ ...state, isPlaying: !state.isPlaying }))
}))

const findByName = (projectList: Project[], name: string) =>
  projectList.find((project) => project.name === name)
