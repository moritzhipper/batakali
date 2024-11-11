import { create } from "zustand"
import { projectList } from "../project-list"
import { Project } from "../types"

type MediaStore = {
  isPlaying: boolean
  isRepeating: boolean
  selectedProject: Project
  projectList: Project[]
  audio: HTMLAudioElement
  selectedTag: string | null
  selectProject: (name: string) => void
  selectTag: (name: string) => void
  togglePlay: () => void
  toggleRepeat: () => void
}

const initialState = {
  isPlaying: false,
  selectedProject: projectList[0],
  projectList: projectList,
  selectedTag: null,
  isRepeating: false,
  audio: new Audio(projectList[0].fileName)
}

export const useMediaStore = create<MediaStore>((set) => ({
  ...initialState,
  selectProject: (name: string) =>
    set((state) => {
      if (name === state.selectedProject.name) {
        return state
      }

      const selectedProject = selectProjectByName(state.projectList, name)
      console.log("selected new", selectedProject)
      return {
        ...state,
        selectedProject,
        audio: new Audio(selectedProject!.fileName)
      }
    }),
  selectTag: (name: string) =>
    set((state) => ({
      ...state,
      selectedTag: name,
      projectList: prioritizeProjectsByTag(name, state.projectList)
    })),
  togglePlay: () => set((state) => ({ ...state, isPlaying: !state.isPlaying })),
  toggleRepeat: () =>
    set((state) => ({ ...state, isRepeating: !state.isRepeating }))
}))

const selectProjectByName = (
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
