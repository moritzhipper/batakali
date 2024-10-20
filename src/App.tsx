import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ProjectsPage } from "./pages/ProjectsPage";
import { WelcomePage } from "./pages/WelcomePage";
import { ThreeWrapper } from "./three/ThreeWrapper";

function App() {
  return (
    <>
      <div className="three-wrapper">
        <ThreeWrapper />
      </div>
      <main>
        <Routes>
          <Route element={<WelcomePage />} path="/" />
          <Route element={<ProjectsPage />} path="/projects" />
        </Routes>
      </main>
    </>
  );
}

export default App;
