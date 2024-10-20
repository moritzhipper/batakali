import { useEffect, useState } from "react"
import { PageWrapper } from "./PageWrapper"
import "./ProjectsPage.css"

type Project = {
  name: string
  tag: string
}

export const ProjectsPage = () => {
  const projects = [
    { name: "Project 1", tag: "rnb" },
    { name: "Project 2", tag: "synthwave" },
    { name: "Project 3", tag: "hardtechno" },
    { name: "Project 4", tag: "boombap" },
    { name: "Project 5", tag: "rnb" }
  ]
  const filter = [...new Set(projects.map((project) => project.tag))]

  const pageCount = Math.ceil(projects.length / 4)
  const [currentPage, setCurrentPage] = useState(0)
  const [visibleProjects, setVisibleProjects] = useState(projects)
  const [selectedFilter, setSelectedFilter] = useState<string[]>([])

  useEffect(() => {
    const visibleProjects = projects.slice(
      pageCount * currentPage,
      pageCount * currentPage + 4
    )
    setVisibleProjects(visibleProjects)
  }, [selectedFilter, currentPage])

  const nextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1)
  }

  const prevPage = () => {
    setCurrentPage((currentPage) => currentPage - 1)
  }

  const hasPrevPage = currentPage > 0
  const hasNextPage = currentPage < pageCount - 1

  return (
    <PageWrapper type="half">
      <div className="projects-page-wrapper">
        <h1>Projects</h1>
        <div className="filter-wrapper">
          {filter.map((filter) => (
            <div>{filter}</div>
          ))}
        </div>
        <div className="projects-wrapper">
          {visibleProjects.map((project) => (
            <Project {...project} key={project.name} />
          ))}
        </div>
        <div className="pagination">
          <button onClick={prevPage} disabled={!hasPrevPage}>
            prev
          </button>
          <div className="page-indicator">{currentPage + 1}</div>
          <button onClick={nextPage} disabled={!hasNextPage}>
            next
          </button>
        </div>
      </div>
    </PageWrapper>
  )
}

const Project = ({ name, tag }: Project) => {
  return (
    <div className="project">
      <div>{name}</div>
    </div>
  )
}
