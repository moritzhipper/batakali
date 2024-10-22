import { a, config, useTransition } from "@react-spring/web"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./NavBarMobile.css"

export const NavBarMobile = () => {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((open) => !open)

  useEffect(() => {
    setOpen(false)
  }, [location])

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

  const transGoalLinks = "translate(-20px, -20px) scale(1)"
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
      <div className="navbar-wrapper mobile">
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
                  <Link to="/projects">projekte</Link>
                  <Link to="/about">about</Link>
                  <Link to="/duck">duck</Link>

                  <div className="bottom">
                    <div className="me">
                      <a href="https://moritzhipper.me">🌐</a>
                      <a
                        className="github-logo "
                        href="https://github.com/moritzhipper/angry-ducko"
                      ></a>
                    </div>
                    <div className="legal">
                      <Link to="/impressum">impressum</Link>
                      <Link to="/datenschutz">datenschutz</Link>
                    </div>
                  </div>
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
