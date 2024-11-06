import { useState } from "react"
import { useMediaStore } from "../../../porject-media-store"
import { Icon } from "../../Icon"
import { PageWrapper } from "../PageWrapper"
import { ProjectReel } from "./ProjectReel"
import "./ProjectsPage.css"
import { TagSelector } from "./TagSelector"

export const ProjectsPage = () => {
  const { projectList, selectProject, selectTag } = useMediaStore()
  const [showFilter, setShowFilter] = useState(false)

  const toggleFilter = () => setShowFilter((show) => !show)

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
            <TagSelector projects={projectList} selectTag={selectTag} />
          )}
          <div className="reel-wrapper">
            <ProjectReel projects={projectList} play={selectProject} />
          </div>
        </div>
        {/* <MediaControls /> */}
      </div>
    </PageWrapper>
  )
}
