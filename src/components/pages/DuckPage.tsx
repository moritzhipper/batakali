import { useMediaStore } from "../../porject-media-store"
import { PageWrapper } from "./PageWrapper"

export const DuckPage = () => {
  const { selectedProject } = useMediaStore()
  return (
    <PageWrapper type="full">
      <h1>{selectedProject.name}</h1>
    </PageWrapper>
  )
}
