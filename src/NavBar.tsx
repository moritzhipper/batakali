import { useState } from "react"
import { NavLink } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  return (
    <div className="navbar-wrapper">
      <button className="home" onClick={toggle}>
        AD
      </button>
      {open && (
        <div className="menu-wrapper">
          <NavLink to="/">AD</NavLink>
          <NavLink to="/">AD</NavLink>
        </div>
      )}
    </div>
  )
}
