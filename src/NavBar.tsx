import { useState } from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((open) => !open)
  const isOpenClass = open ? "open" : ""

  return (
    <>
      <div className={"navbar-wrapper " + isOpenClass}>
        <Link to="/" className="home small">
          AD
        </Link>
        <button className="menu" onClick={toggle}>
          III
        </button>
        {open && (
          <div className="nav-items-wrapper">
            <Link className="home big" to="/">
              Angry Ducko
            </Link>
            <Link to="/about">about</Link>
            <Link to="/impressum">Impressum</Link>
            <Link to="/datenschutz">Datenschutz</Link>
          </div>
        )}
      </div>
    </>
  )
}
