import classes from "./MainNav.module.scss";
import { NavLink} from "react-router-dom";
import { ShowWhenLoggedIn, ShowWhenLoggedOut } from "../auth/Protected";
import { useLogout } from "../../features/auth/useLogout";
// import {
//   RESET_USER,
//   SET_LOGGEDOUT_USER,
// } from "../../store/authStore/authIndex";
// import { useDispatch } from "react-redux";
// import type { AddDispatch } from "../../store/store";

const MainNav = () => {
  const { mutateAsync: logoutUser } = useLogout();

  // const navigate = useNavigate();
  // const dispatch = useDispatch<AddDispatch>();

  const navDataHandler = (navData: any) => {
    return navData.isActive ? classes.active : "";
  };

  // const logoutHandler = async () => {
  //   await logoutUser(undefined, {
  //     onSuccess: (data) => {
  //       console.log("responseFromServer:", data);
  //       if (data.msg === "user loggedout successfully") {
  //         dispatch(SET_LOGGEDOUT_USER(data));
  //         dispatch(RESET_USER());
  //         navigate("/auth");
  //       }
  //     },
  //   });
  // };

  return (
    <header className={classes.header}>
      <h1>
        <NavLink to={"/"} className={navDataHandler}>
          <span>AI Talent Profile</span> Analyzer
        </NavLink>
      </h1>
      <nav>
        <ul>
          <ShowWhenLoggedOut>
            <li>
              <NavLink to={"/auth"} className={navDataHandler}>
                Auth
              </NavLink>
            </li>
          </ShowWhenLoggedOut>

          <ShowWhenLoggedIn>
            <li>
              <NavLink to={"/analysis-form"} className={navDataHandler}>
                AnalyzeCandidate
              </NavLink>
            </li>
          </ShowWhenLoggedIn>

          <ShowWhenLoggedIn>
            <li
              // onClick={logoutHandler}
              onClick={()=>logoutUser()}
              className={classes.logOut}
            >
              Logout
            </li>
          </ShowWhenLoggedIn>
        </ul>
      </nav>
    </header>
  );
};

export default MainNav;
