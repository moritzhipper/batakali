import { useState } from "react"
import { PageWrapper } from "../PageWrapper"
import { ProjectSelector } from "./ProjectSelector"
import "./ProjectsPage.css"

type FilterItem = {
  tag: string
  selected: boolean
}

const projects = [
  { name: "born into this", tag: "rnb" },
  { name: "no name", tag: "synthwave" },
  { name: "run", tag: "hardtechno" },
  { name: "water", tag: "boombap" },
  { name: "sleep", tag: "rnb" }
]

export const ProjectsPage = () => {
  const filterList = mapToFilterList(projects)

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
        <ProjectSelector />
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
