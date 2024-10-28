import { useState } from "react"
import { PageWrapper } from "./PageWrapper"
import "./ProjectsPage.css"

type Project = {
  name: string
  tag: string
}

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
  const [projectIndex, setProjectIndex] = useState(0)
  const [filter, updateFilter] = useState<FilterItem[]>(filterList)

  const nextPage = () => {
    setProjectIndex((index) => index + 1)
  }

  const prevPage = () => {
    setProjectIndex((index) => index - 1)
  }

  const toggleFilter = (tag: string) => {
    updateFilter((list) => toggleFilterByTag(list, tag))
  }

  const hasPrevPage = projectIndex > 0
  const hasNextPage = projectIndex < projects.length - 1

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
        <div className="project-wrapper">
          <Project project={projects[projectIndex]} />
        </div>
        <div className="pagination">
          <button onClick={prevPage} disabled={!hasPrevPage}>
            prev
          </button>
          <div className="page-indicator">{projectIndex + 1}</div>
          <button onClick={nextPage} disabled={!hasNextPage}>
            next
          </button>
        </div>
      </div>
    </PageWrapper>
  )
}

type ProjectProps = {
  project: Project
}

const Project = ({ project }: ProjectProps) => {
  return <div className="project">{project.name}</div>
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
