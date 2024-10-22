import { Route, Routes } from "react-router-dom"
import "./App.css"
import { NavBarWrapper } from "./nav-bar/NavBarWrapper"
import { AboutPage } from "./pages/AboutPage"
import { ProjectsPage } from "./pages/ProjectsPage"
import { WelcomePage } from "./pages/WelcomePage"
import { ThreeWrapper } from "./three/ThreeWrapper"

function App() {
  return (
    <>
      <div className="three-wrapper">
        <ThreeWrapper />
      </div>
      <main>
        <NavBarWrapper />
        <Routes>
          <Route element={<WelcomePage />} path="/" />
          <Route element={<ProjectsPage />} path="/projects" />
          <Route element={<AboutPage />} path="/about" />
        </Routes>
      </main>
    </>
  )
}

export default App
