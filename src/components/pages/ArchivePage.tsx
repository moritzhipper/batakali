import { useAduioStore } from "../../state/audioState"
import { Project } from "../../types"

type ProjectsByTag = {
  tag: string
  projectList: Project[]
}

export const ArchivPage = () => {
  const { projectList } = useAduioStore()
  const projectsByTag = sortIntoTagBuckets(projectList)

  return (
    <div className="page-wrapper archive">
      {projectsByTag.map(({ tag, projectList }) => (
        <div className="tag-wrapper" key={tag}>
          <h2>{tag}</h2>
        </div>
      ))}
    </div>
  )
}

const sortIntoTagBuckets = (projectList: Project[]): ProjectsByTag[] => {
  const tags = projectList.map((p) => p.tag)
  const uniqueTags = Array.from(new Set(tags))

  return uniqueTags.map((tag) => ({
    tag,
    projectList: projectList.filter((p) => p.tag === tag)
  }))
}
