import { ReactNode } from "react"
import "./PageWrapper.css"

type Props = {
  children: ReactNode
  type: "full" | "half" | "third"
}

export const PageWrapper = ({ children, type }: Props) => {
  if (type === "full") {
    return <div className="page-wrapper delayed-fade-in full">{children}</div>
  }

  return (
    <div className={"page-wrapper delayed-fade-in " + type}>
      <div className="content">{children}</div>
    </div>
  )
}
