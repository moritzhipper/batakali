import { a, useSpring, useTransition } from "@react-spring/web"
import { useState } from "react"
import { springConfig } from "../../../angry-ducko-config"
import { useMediaStore } from "../../../porject-media-store"
import { Icon } from "../../Icon"
import { PageWrapper } from "../PageWrapper"
import { ProjectReel } from "./ProjectReel"
import "./ProjectsPage.css"

export const ProjectsPage = () => {
  const { projectList, selectProject, selectTag } = useMediaStore()
  const [showFilter, setShowFilter] = useState(true)

  const toggleFilter = () => setShowFilter((show) => !show)
  const tagList = [...new Set(projectList.map((project) => project.tag))].sort()

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

  const reelStyle = useSpring({
    opacity: showFilter ? 0.5 : 1,
    translateY: showFilter ? 0 : 0,
    pointerEvents: showFilter ? "none" : "all",
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
        <div className="project-selector">
          {transitionFilter((style, show) => (
            <>
              {show && (
                <a.div className="tag-selector-wrapper" style={{ ...style }}>
                  {tagList.map((tag) => (
                    <button onClick={() => selectTag(tag)} key={tag}>
                      {tag}
                    </button>
                  ))}
                </a.div>
              )}
              {!show && (
                <a.div className="reel-wrapper" style={{ ...style }}>
                  <ProjectReel projects={projectList} play={selectProject} />
                </a.div>
              )}
            </>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
