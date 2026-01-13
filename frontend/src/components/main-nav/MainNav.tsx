import classes from "./MainNav.module.scss";
import { NavLink } from "react-router-dom";

const MainNav = () => {
  const navDataHandler = (navData: any) => {
    return navData.isActive ? classes.active : "";
  };

  return (
    <header className={classes.header}>
      <h1>
        <NavLink to={"/"} className={navDataHandler}>
          <span>AI Talent Profile</span> Analyzer
        </NavLink>
      </h1>
      <nav>
        <ul>
          <li>
            <NavLink to={"/auth"} className={navDataHandler}>
              Auth
            </NavLink>
          </li>
          <li>
            <NavLink to={"/analysis-form"} className={navDataHandler}>
              AnalyzeCandidate
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNav;
