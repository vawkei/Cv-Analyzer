import Button from "../ui/button/Button";
import Card from "../ui/card/Card";
import classes from "./AnalysisForm.module.scss";

const AnalysisForm = () => {
  return (
    <div className={classes["analysis-form-container"]}>
      <div className={classes.heading}>
        <h1>Analyze a Candidate</h1>
      </div>

      <div className={classes.body}>
        <form action="">
          <Card className={classes.cardClass}>
            <h2>Upload CV</h2>
            <div className={classes.actions}>
              <Button type="submit" className={classes.button}>
                Upload PDF or Text Files
              </Button>
              <p>OR</p>
              <Button type="submit" className={classes.button2}>
                Paste CV Text
              </Button>
            </div>

            <div className={classes["lower-part"]}>
              <h2>Paste Job Description</h2>
              <div className={classes.control}>
                <textarea
                  name=""
                  id=""
                  placeholder="Paste the job description here..."
                ></textarea>
              </div>
              <div className={classes.actions}>
                <Button type="submit" className={classes.button3}>
                  Run AI Analysis
                </Button>
              </div>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default AnalysisForm;
