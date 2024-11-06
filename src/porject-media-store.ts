import { create } from "zustand"
import { projectList } from "./project-list"
import { Project } from "./types"

type MediaStore = {
  isPlaying: boolean
  selectedProject: Project | null
  projectList: Project[]
  selectedTag: string | null
  selectProject: (name: string) => void
  selectTag: (name: string) => void
  playPause: () => void
}

export const useMediaStore = create<MediaStore>((set) => ({
  isPlaying: false,
  selectedProject: null,
  projectList: projectList,
  selectedTag: null,
  selectProject: (name: string) =>
    set((state) => ({
      ...state,
      selectedProject: findByName(state.projectList, name)
    })),
  selectTag: (name: string) =>
    set((state) => ({
      ...state,
      selectedTag: name,
      projectList: prioritizeProjectsByTag(name, state.projectList)
    })),
  playPause: () => set((state) => ({ ...state, isPlaying: !state.isPlaying }))
}))

const findByName = (
  projectList: Project[],
  name: string
): Project | undefined => projectList.find((project) => project.name === name)

const prioritizeProjectsByTag = (
  tag: string,
  projects: Project[]
): Project[] => [
  ...projects.filter((project) => project.tag === tag),
  ...projects.filter((project) => project.tag !== tag)
]
