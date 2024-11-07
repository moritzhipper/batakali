import { a, useTransition } from "@react-spring/web"
import { useEffect, useState } from "react"
import { springConfig } from "../../../angry-ducko-config"
import { useMediaStore } from "../../../porject-media-store"
import { ProjectReel } from "./ProjectReel"
import "./ProjectsPage.css"
import { TagSelector } from "./TagSelector"

export const ProjectsPage = () => {
  const [showFilter, setShowFilter] = useState(true)
  const { selectedTag } = useMediaStore()

  const toggleFilter = () => setShowFilter((show) => !show)

  useEffect(() => {
    setShowFilter(false)
  }, [selectedTag])

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
    <div className="page-wrapper projects">
      <div className="content">
        <h1>
          Projects
          <button
            className={
              "filter ri-filter-2-fill ri-m " + (showFilter ? "open" : "")
            }
            onClick={toggleFilter}
          />
        </h1>
        <div className="selector-wrapper">
          {transitionFilter((style, show) => (
            <>
              <a.div className="project-selector" style={{ ...style }}>
                {show ? <TagSelector /> : <ProjectReel />}
              </a.div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
