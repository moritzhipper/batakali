import { Link } from "react-router-dom"
import "./NavBarDesktop.css"

export const NavBarDesktop = () => {
  return (
    <div className="navbar-wrapper desktop delayed-fade-in">
      <Link className="home" to="/">
        AD
      </Link>
      <Link className="page" to="/projects">
        projects
      </Link>
      <Link className="page" to="/duck">
        ducko
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
      <a className="me" target="_blank" href="https://moritzhipper.me">
        🌐
      </a>
      <a
        className="github-logo me"
        target="_blank"
        href="https://github.com/moritzhipper/angry-ducko"
      ></a>
    </div>
  )
}
