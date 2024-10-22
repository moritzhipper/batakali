import { Link } from "react-router-dom"
import "./NavBarDesktop.css"

export const NavBarDesktop = () => {
  return (
    <div className="navbar-wrapper desktop">
      <Link className="home" to="/">
        AD
      </Link>
      <Link to="/projects">projects</Link>
      <Link to="/about">about</Link>
      <Link to="/duck">duck</Link>

      <Link className="legal impressum" to="/imprint">
        impressum
      </Link>
      <Link className="legal" to="/privacy">
        datenschutz
      </Link>
      <a className="me" href="https://moritzhipper.me">
        🌐
      </a>
      <a
        className="github-logo me"
        href="https://github.com/moritzhipper/angry-ducko"
      ></a>
    </div>
  )
}
