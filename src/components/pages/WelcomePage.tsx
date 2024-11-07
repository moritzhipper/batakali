import { Link } from "react-router-dom"

export const WelcomePage = () => {
  return (
    <div className="page-wrapper welcome">
      <Link className="big-ducko-print" to="/projects">
        Angry Ducko
      </Link>
    </div>
  )
}
