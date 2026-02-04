import classes from "./Home.module.scss"

const Home = () => {
  return (
    <div className={classes["home-container"]}>
      <div className={classes.name}>
        <h1>Voke || Vawkei</h1>
      </div>
      <h1>Analyze candidate-job fit using AI</h1>
      <p>Get instant insights on CVs and job descriptions with AI</p>
    </div>
  );
};

export default Home;
