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

      <a
        className="ri-global-line me"
        href="https://moritzhipper.me"
        target="_blank"
      />
      <a
        className="ri-github-line me"
        href="https://github.com/moritzhipper/angry-ducko"
        target="_blank"
      />
      <a
        className="ri-instagram-line me"
        href="https://github.com/moritzhipper/angry-ducko"
        target="_blank"
      />
    </div>
  )
}
