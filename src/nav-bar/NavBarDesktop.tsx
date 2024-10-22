import { Link } from "react-router-dom"
import "./NavBarDesktop.css"

export const NavBarDesktop = () => {
  return (
    <div className="navbar-wrapper desktop">
      <Link className="home" to="/">
        AD
      </Link>
      <Link to="/about">about</Link>
      <Link to="/duck">duck</Link>

      <Link className="legal impressum" to="/impressum">
        impressum
      </Link>
      <Link className="legal" to="/datenschutz">
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
