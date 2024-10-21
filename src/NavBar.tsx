import { a, config, useTransition } from "@react-spring/web"
import { useState } from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((open) => !open)

  const transGoalHome = "translate(30px, 30px) scale(1.4)"
  const transitionHome = useTransition(open, {
    initial: {
      opacity: 1
    },
    from: {
      opacity: 0,
      transform: transGoalHome
    },
    enter: {
      opacity: 1,
      transform: "translate(0px, 0px) scale(1)"
    },
    leave: {
      opacity: 0,
      transform: transGoalHome
    },
    config: config.stiff
  })

  const transGoalLinks = "translate(-50px, -50px) scale(0.8)"
  const transitionLinks = useTransition(open, {
    from: {
      opacity: 0,
      transform: transGoalLinks
    },
    enter: {
      opacity: 1,
      transform: "translate(0px, 0px) scale(1)"
    },
    leave: {
      opacity: 0,
      transform: transGoalLinks
    },
    config: config.stiff
  })

  return (
    <>
      <div className="navbar-wrapper">
        {transitionHome((style, open) => (
          <>
            {!open && (
              <a.div style={style}>
                <Link to="/" className="home small">
                  AD
                </Link>
              </a.div>
            )}
          </>
        ))}
        {transitionLinks((style, open) => (
          <>
            {open && (
              <a.div
                className="nav-items-wrapper"
                style={{ opacity: style.opacity }}
              >
                <a.div
                  className="nav-items"
                  style={{ transform: style.transform }}
                >
                  <Link className="home big" to="/">
                    Angry Ducko
                  </Link>
                  <Link to="/about">about</Link>
                  <Link to="/impressum">impressum</Link>
                  <Link to="/datenschutz">datenschutz</Link>
                </a.div>
              </a.div>
            )}
          </>
        ))}

        <a.button className={`menu ${open && "open"}`} onClick={toggle}>
          <span>I</span>
          <span>I</span>
          <span>I</span>
        </a.button>
      </div>
    </>
  )
}
