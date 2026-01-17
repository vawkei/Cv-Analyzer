import type { User } from "../../interface/interface";
import Button from "../ui/button/Button";
import Card from "../ui/card/Card";
import classes from "./AuthForm.module.scss";
import { useState } from "react";
import { useRegister } from "../../features/auth/useRegister";
import { useLogin } from "../../features/auth/useLogin";
import type { AddDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { SET_LOGGEDIN_USER } from "../../store/authStore/authIndex";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const { mutateAsync: registerUser, isPending } = useRegister();
  const { mutateAsync: loginUser } = useLogin();

  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");

  const [haveAccount, setHaveAccount] = useState<boolean>(false);

  const switchAuthModeHandler = () => {
    setHaveAccount((currentState) => !currentState);
  };

  const dispatch = useDispatch<AddDispatch>();
  const navigate = useNavigate();

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const userData: User = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    };

    if (haveAccount) {
      //👇👇 =========================== Logging===============================👇👇
      if (
        enteredEmail.trim().length === 0 ||
        enteredPassword.trim().length < 6
      ) {
        return console.log("Fill out the inputs");
      }
      const userData = {
        email: enteredEmail,
        password: enteredPassword,
      };
      console.log(userData);

      await loginUser(userData, {
        onSuccess: (data) => {
          if (data.msg === "loggedin successfully") {
            dispatch(SET_LOGGEDIN_USER(data));
            navigate("/analysis-form");
          }
        },
      });
    } else {
      //👇👇 =================Register=============================👇👇

      if (enteredName.trim().length < 3) {
        return console.log("name should be at least 3 characters long");
      }
      if (enteredEmail.trim().length === 0) {
        return console.log("please enter valid email address");
      }
      if (enteredPassword.trim().length < 6) {
        return console.log("password must be at least 6 characters long");
      }

      await registerUser(userData, {
        onSuccess: (data) => {
          console.log("responseFromServer:", data);
          if (data.msg === "new user registered") {
            setHaveAccount(true);
          }
        },
      });

      console.log(userData);
    }
  };

  return (
    <div className={classes["auth-form-container"]}>
      <form action="" onSubmit={onSubmitHandler}>
        <Card className={classes.cardClass}>
          {isPending && <p style={{ color: "green" }}>Loading...</p>}
          <div className={classes["form-intro"]}>
            <h2>{haveAccount ? "Login" : "Register"}</h2>
          </div>
          <div>
            {haveAccount ? (
              ""
            ) : (
              <div className={classes.control}>
                <label htmlFor="">Name:</label>
                <input
                  type="text"
                  placeholder="enter name"
                  value={enteredName}
                  onChange={(event) => setEnteredName(event.target.value)}
                />
              </div>
            )}

            <div className={classes.control}>
              <label htmlFor="">Email:</label>
              <input
                type="text"
                placeholder="enter mail"
                value={enteredEmail}
                onChange={(event) => setEnteredEmail(event.target.value)}
              />
            </div>

            <div className={classes.control}>
              <label htmlFor="">Password:</label>
              <input
                type="password"
                placeholder="enter password"
                value={enteredPassword}
                onChange={(event) => setEnteredPassword(event.target.value)}
              />
            </div>
          </div>

          <div className={classes.actions}>
            <Button type="submit" className={classes.button}>
              Submit
            </Button>
          </div>

          <div className={classes["form-outro"]}>
            <p onClick={switchAuthModeHandler}>
              {haveAccount
                ? "create new account"
                : "log in with existing account"}
            </p>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default AuthForm;
