import { useAduioStore } from "../../state/audioState"
import { Project } from "../../types"
import "./ArchivePage.css"

type ProjectsByTag = {
  tag: string
  projectList: Project[]
}

export const ArchivPage = () => {
  const { projectList } = useAduioStore()
  const projectsByTag = sortIntoTagBuckets(projectList)

  return (
    <div className="page-wrapper archive">
      <h1 className="sticky">Archive</h1>
      <div className="grid-wrapper">
        {projectsByTag.map(({ tag, projectList }) => (
          <div className="section-wrapper" key={tag}>
            <h2>{tag}</h2>
            <div className="projects-wrapper">
              {projectList.map((project) => (
                <div key={project.name} className="project-wrapper">
                  <p className="name">{project.name}</p>
                  <button className="ri-share-line" />
                  <a
                    download
                    href={project.fileName}
                    className="ri-download-line"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const sortIntoTagBuckets = (projectList: Project[]): ProjectsByTag[] => {
  const tags = projectList.map((p) => p.tag)
  const uniqueTags = Array.from(new Set(tags)).sort()

  return uniqueTags.map((tag) => ({
    tag,
    projectList: projectList.filter((p) => p.tag === tag).sort(nameComp)
  }))
}

const nameComp = (a: Project, b: Project) => a.name.localeCompare(b.name)
