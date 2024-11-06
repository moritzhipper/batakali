import { useState } from "react"
import { useMediaStore } from "../../../porject-media-store"
import { Icon } from "../../Icon"
import { PageWrapper } from "../PageWrapper"
import { ProjectReel } from "./ProjectReel"
import "./ProjectsPage.css"

export const ProjectsPage = () => {
  const { projectList, selectProject, selectTag } = useMediaStore()
  const [showFilter, setShowFilter] = useState(false)

  const toggleFilter = () => setShowFilter((show) => !show)

  const tagList = [...new Set(projectList.map((project) => project.tag))].sort()

  return (
    <PageWrapper type="half">
      <div className="projects-page-wrapper">
        <h1>
          Projects
          <button className="filter" onClick={toggleFilter}>
            <Icon type="filter-2-fill" />
          </button>
        </h1>
        <div className="project-selector">
          {showFilter && (
            <div className="tag-selector-wrapper">
              {tagList.map((tag) => (
                <button onClick={() => selectTag(tag)} key={tag}>
                  {tag}
                </button>
              ))}
            </div>
          )}
          <ProjectReel projects={projectList} play={selectProject} />
        </div>
      </div>
    </PageWrapper>
  )
}
