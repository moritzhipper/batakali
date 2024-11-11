import { MediaStore } from "./porject-media-store"

export const selectProjectByName = (
  name: string,
  state: MediaStore
): MediaStore => ({
  ...state,
  selectedProject: state.projectList.find((project) => project.name === name)!
})

export const prioritizeByTag = (tag: string, state: MediaStore): MediaStore => {
  const prioritizedProjects = [
    ...state.projectList.filter((project) => project.tag === tag),
    ...state.projectList.filter((project) => project.tag !== tag)
  ]

  return {
    ...state,
    selectedTag: tag,
    projectList: prioritizedProjects
  }
}

export const selectNextProject = (state: MediaStore): MediaStore => {
  const index = getSelectedProjectIndex(state)
  const hasNextProejct = index < state.projectList.length - 1
  const nextProject = hasNextProejct
    ? state.projectList[index + 1]
    : state.projectList[0]

  return {
    ...state,
    selectedProject: nextProject
  }
}

export const selectPreviousProject = (state: MediaStore): MediaStore => {
  const index = getSelectedProjectIndex(state)
  const hasPreviousProject = index !== 0
  const previousProject = hasPreviousProject
    ? state.projectList[index - 1]
    : state.projectList[state.projectList.length - 1]

  return {
    ...state,
    selectedProject: previousProject
  }
}

const getSelectedProjectIndex = (state: MediaStore) =>
  state.projectList.findIndex(
    (project) => project.name === state.selectedProject.name
  )
