import { ReactNode } from "react";
import "./PageWrapper.css";

type Props = {
  children: ReactNode;
  type: "full" | "half" | "third";
};

export const PageWrapper = ({ children, type }: Props) => {
  if (type === "full") {
    return <div className="page-wrapper">{children}</div>;
  }

  return (
    <div className={"page-wrapper " + type}>
      <div className="content">{children}</div>
    </div>
  );
};
