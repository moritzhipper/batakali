import { useMemo } from "react"
import { useAduioStore } from "../../../state/audioState"
import "./TagSelector.css"

export const TagSelector = () => {
  const { projectList, selectedTag, selectTag } = useAduioStore()

  const tagList = useMemo(
    () => [...new Set(projectList.map((project) => project.tag))].sort(),
    []
  )

  return (
    <div className="tag-selector-wrapper">
      <div className="header">sort by tag</div>
      <div className="tags">
        {tagList.map((tag) => (
          <button
            className={tag === selectedTag ? "selected" : ""}
            onClick={() => selectTag(tag)}
            key={tag}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
