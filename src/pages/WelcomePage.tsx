import { Link } from "react-router-dom"
import { PageWrapper } from "./PageWrapper"

export const WelcomePage = () => {
  return (
    <PageWrapper type="third">
      <Link className="big-ducko-print" to="/projects">
        Angry Ducko
      </Link>
    </PageWrapper>
  )
}
