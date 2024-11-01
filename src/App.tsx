import { Route, Routes } from "react-router-dom"
import { NavBarWrapper } from "./components/nav-bar/NavBarWrapper"
import { AboutPage } from "./components/pages/AboutPage"
import { DuckPage } from "./components/pages/DuckPage"
import { ImprintPage } from "./components/pages/ImprintPage"
import { PrivacyPage } from "./components/pages/PrivacyPage"
import { ProjectsPage } from "./components/pages/projects/ProjectsPage"
import { WelcomePage } from "./components/pages/WelcomePage"
import { ThreeWrapper } from "./components/three/ThreeWrapper"

function App() {
  return (
    <>
      <ThreeWrapper />
      <main>
        <NavBarWrapper />
        <Routes>
          <Route element={<WelcomePage />} path="/" />
          <Route element={<ProjectsPage />} path="/projects" />
          <Route element={<AboutPage />} path="/about" />
          <Route element={<DuckPage />} path="/duck" />
          <Route element={<PrivacyPage />} path="/privacy" />
          <Route element={<ImprintPage />} path="/imprint" />
        </Routes>
      </main>
    </>
  )
}

export default App
