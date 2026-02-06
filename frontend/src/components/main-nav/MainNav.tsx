import classes from "./MainNav.module.scss";
import { NavLink } from "react-router-dom";
import { ShowWhenLoggedIn, ShowWhenLoggedOut } from "../auth/Protected";
import { useLogout } from "../../features/auth/useLogout";
import { useEffect, useState } from "react";
// import {
//   RESET_USER,
//   SET_LOGGEDOUT_USER,
// } from "../../store/authStore/authIndex";
// import { useDispatch } from "react-redux";
// import type { AddDispatch } from "../../store/store";

const MainNav = () => {
  const { mutateAsync: logoutUser } = useLogout();
  const [showMenu, setShowMenu] = useState(false);

  // const navigate = useNavigate();
  // const dispatch = useDispatch<AddDispatch>();

  const navDataHandler = (navData: any) => {
    return navData.isActive ? classes.active : "";
  };

  const showToggleHandler = () => {
    setShowMenu((currState) => !currState);
  };


  // This is forwhen d mobile menu opens, user can’t scroll the page behind it:
useEffect(() => {
  if (showMenu) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [showMenu]);


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
      <nav
        className={
          showMenu
            ? `${classes["show-navigation"]}`
            : `${classes["hide-navigation"]}`
        }
      >
        <div
          className={
            showMenu
              ? `${classes["nav-backdrop"]} ${classes["show-nav-backdrop"]}`
              : `${classes["nav-backdrop"]}`
          }
        ></div>
        <ul onClick={showToggleHandler}>
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
              onClick={() => logoutUser()}
              className={classes.logOut}
            >
              Logout
            </li>
          </ShowWhenLoggedIn>
        </ul>
      </nav>

      <div className={classes.harmburger} onClick={showToggleHandler}>
           {showMenu ? "X" : "☰"}
      </div>
    </header>
  );
};

export default MainNav;
