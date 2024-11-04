import { useState } from "react"
import { useMediaStore } from "../../../porject-media-store"
import { Project } from "../../../types"
import { PageWrapper } from "../PageWrapper"
import { ProjectReel } from "./ProjectReel"
import "./ProjectsPage.css"

type FilterItem = {
  tag: string
  selected: boolean
}

export const ProjectsPage = () => {
  const { projectList, selectProject } = useMediaStore()
  const filterList = mapToFilterList(projectList)

  const [filter, updateFilter] = useState<FilterItem[]>(filterList)

  const toggleFilter = (tag: string) => {
    updateFilter((list) => toggleFilterByTag(list, tag))
  }

  return (
    <PageWrapper type="half">
      <div className="projects-page-wrapper">
        <h1>Projects</h1>
        <div className="filter-wrapper">
          {filter.map(({ tag, selected }) => (
            <button
              className={selected ? "selected" : ""}
              key={tag}
              onClick={() => toggleFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <ProjectReel projects={projectList} play={selectProject} />
        {/* <MediaControls /> */}
      </div>
    </PageWrapper>
  )
}

const mapToFilterList = (projects: Project[]): FilterItem[] =>
  [...new Set(projects.map((project) => project.tag))].map((tag) => ({
    tag,
    selected: false
  }))

const toggleFilterByTag = (filterList: FilterItem[], tag: string) =>
  filterList.map((item) =>
    item.tag === tag ? { ...item, selected: !item.selected } : item
  )
