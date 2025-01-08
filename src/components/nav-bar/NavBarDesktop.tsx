import { Link } from "react-router-dom"
import "./NavBarDesktop.css"

export const NavBarDesktop = () => {
  return (
    <div className="navbar-wrapper desktop delayed-fade-in">
      <Link className="home" to="/">
        batakali
      </Link>
      <Link className="page" to="/projects">
        projects
      </Link>
      <Link className="page" to="/archive">
        archive
      </Link>
      <Link className="page" to="/about">
        about
      </Link>
      <Link className="legal impressum" to="/imprint">
        impressum
      </Link>
      <Link className="legal" to="/privacy">
        datenschutz
      </Link>

      <div className="me">
        <a
          className="ri-global-line"
          href="https://moritzhipper.me"
          target="_blank"
        />
        <a
          className="ri-github-line"
          href="https://github.com/moritzhipper/angry-ducko"
          target="_blank"
        />
        <a
          className="ri-instagram-line"
          href="https://github.com/moritzhipper/angry-ducko"
          target="_blank"
        />
      </div>
    </div>
  )
}
