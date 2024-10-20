import { Route, Routes } from "react-router-dom"
import "./App.css"
import { NavBar } from "./NavBar"
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
      <NavBar />
      <main>
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
