import { a, useTransition } from "@react-spring/web"
import { useEffect, useState } from "react"
import { springConfig } from "../../../config/szeneConfig"
import { useAudioStore } from "../../../state/audioState"
import { ProjectReel } from "./ProjectReel"
import "./ProjectSelectorView.css"
import { TagSelector } from "./TagSelector"

type Props = {
  onHide: () => void
}

export const ProjectSelectorView = ({ onHide }: Props) => {
  const [showFilter, setShowFilter] = useState(false)
  const { selectedTag } = useAudioStore()
  const toggleFilter = () => setShowFilter((show) => !show)

  useEffect(() => {
    setShowFilter(false)
  }, [selectedTag])

  const hiddenElementStyle = {
    opacity: 0,
    translateY: 40
  }

  const transitionFilter = useTransition(showFilter, {
    initial: {
      opacity: 1,
      translateY: 0
    },
    from: hiddenElementStyle,
    enter: {
      opacity: 1,
      translateY: 0
    },
    leave: hiddenElementStyle,
    ...springConfig
  })

  return (
    <div className="project-selector-view">
      <h1>
        <span>Projects</span>
        <button className="hide" onClick={onHide}>
          <span className="ri-play-large-fill" />
          <span className="ri-pause-large-line" />
        </button>
        <button
          className={"filter ri-filter-2-fill " + (showFilter ? "active" : "")}
          onClick={toggleFilter}
        />
      </h1>
      <div className="selector-wrapper">
        {transitionFilter((style, show) => (
          <a.div className="project-selector" style={{ ...style }}>
            {show ? <TagSelector /> : <ProjectReel />}
          </a.div>
        ))}
      </div>
    </div>
  )
}
