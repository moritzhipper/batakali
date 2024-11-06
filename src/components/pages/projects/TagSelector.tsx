import { Project } from "../../../types"
import "./TagSelector.css"

type Props = {
  projects: Project[]
  selectTag: (tag: string) => void
}

export const TagSelector = ({ projects, selectTag }: Props) => {
  const tagList = [...new Set(projects.map((project) => project.tag))].sort()

  return (
    <div className="tag-selector-wrapper">
      <div className="header">sort by tag</div>
      <div className="tags">
        {tagList.map((tag) => (
          <button onClick={() => selectTag(tag)} key={tag}>
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
