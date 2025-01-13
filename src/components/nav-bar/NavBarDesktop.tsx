import { Link } from "react-router-dom"
import { links } from "../../config/links"
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
        <a className="ri-global-line" href={links.homepage} target="_blank" />
        <a className="ri-github-line" href={links.github} target="_blank" />
        <a
          className="ri-instagram-line"
          href={links.instagram}
          target="_blank"
        />
      </div>
    </div>
  )
}
