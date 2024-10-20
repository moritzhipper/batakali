import { Link } from "react-router-dom";
import "./WelcomePage.css";

export const WelcomePage = () => {
  return (
    <div className="welcome-page-wrapper">
      <Link to="/projects">Lets Go</Link>
    </div>
  );
};
