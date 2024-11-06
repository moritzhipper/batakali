import { a, useTransition } from "@react-spring/web"
import { useState } from "react"
import { springConfig } from "../../../angry-ducko-config"
import { useMediaStore } from "../../../porject-media-store"
import { Icon } from "../../Icon"
import { PageWrapper } from "../PageWrapper"
import { ProjectReel } from "./ProjectReel"
import "./ProjectsPage.css"
import { TagSelector } from "./TagSelector"

export const ProjectsPage = () => {
  const { projectList, selectProject, selectTag } = useMediaStore()
  const [showFilter, setShowFilter] = useState(true)

  const toggleFilter = () => setShowFilter((show) => !show)

  const filterStyle = {
    opacity: 0,
    translateY: 40
  }
  const transitionFilter = useTransition(showFilter, {
    from: filterStyle,
    enter: {
      opacity: 1,
      translateY: 0
    },
    leave: filterStyle,
    ...springConfig
  })

  return (
    <PageWrapper type="half">
      <div className="projects-page-wrapper">
        <h1>
          Projects
          <button className="filter" onClick={toggleFilter}>
            <Icon type="filter-2-fill" />
          </button>
        </h1>
        <div className="selector-wrapper">
          {transitionFilter((style, show) => (
            <>
              <a.div className="project-selector" style={{ ...style }}>
                {show ? (
                  <TagSelector projects={projectList} selectTag={selectTag} />
                ) : (
                  <ProjectReel projects={projectList} play={selectProject} />
                )}
              </a.div>
            </>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
