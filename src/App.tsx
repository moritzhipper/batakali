import { useLayoutEffect } from "react"
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom"
import { AudioPlayer } from "./components/AudioPlayer"
import { NavBarWrapper } from "./components/nav-bar/NavBarWrapper"
import { AboutPage } from "./components/pages/AboutPage"
import { ArchivPage } from "./components/pages/ArchivePage"
import { ImprintPage } from "./components/pages/ImprintPage"
import { PrivacyPage } from "./components/pages/PrivacyPage"
import { ProjectsPage } from "./components/pages/projects-page/ProjectsPageWrapper"
import { WelcomePage } from "./components/pages/WelcomePage"
import { ThreeWrapper } from "./components/three/ThreeWrapper"

function App() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useLayoutEffect(() => {
    if (searchParams.get("project")) {
      navigate(`/projects`)
    }
  }, [])

  return (
    <>
      <AudioPlayer />
      <ThreeWrapper />
      <main>
        <NavBarWrapper />
        <Routes>
          <Route element={<WelcomePage />} path="/" />
          <Route element={<ProjectsPage />} path="/projects" />
          <Route element={<AboutPage />} path="/about" />
          <Route element={<ArchivPage />} path="/archive" />
          <Route element={<PrivacyPage />} path="/privacy" />
          <Route element={<ImprintPage />} path="/imprint" />
        </Routes>
      </main>
    </>
  )
}

export default App
