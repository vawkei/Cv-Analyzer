import classes from "./AnalysisResult.module.scss";
import { useQuery } from "@tanstack/react-query";
import type { CvAnalysisResult } from "../../interface/interface";
import Card from "../ui/card/Card";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";

const AnalysisResult = () => {
  
  const navigate = useNavigate();
  
  const { data } = useQuery<CvAnalysisResult>({
    queryKey: ["cvAnalysis"],
    queryFn: async () => {
      throw new Error("should not fetch here");
    },
    enabled: false,
  });
  console.log("AnalysisResultData:", data);

  if (!data) {
    return <p>No analysis Found</p>;
  }

  

  //turning the object into an array:
  //   const arrTotalAmountMadePerProduct = Object.keys(
  //     totalAmountMadePerProduct
  //   ).map((key) => totalAmountMadePerProduct[key]);
  //   console.log(arrTotalAmountMadePerProduct);

  return (
    <div className={classes["container"]}>
      {/* <h1>Analysis Result</h1> */}

      <div className={classes.action}>
        <Button
          onClick={() => navigate("/")}
          type="button"
          className={classes.button}
        >
          Back Home
        </Button>
      </div>

      <div className={classes.top}>
        <h2>Fit Score: </h2>
        <div className={classes.score}>
          <p
            className={
              data.result.fitScore < 50
                ? classes.red
                : data.result.fitScore <= 70
                  ? classes.orange
                  : classes.white
            }
          >
      {/* 📒📒Meaning:📒📒
          < 50 → red
            50–70 → orange
            71+ → white */}
            {data.result.fitScore}
          </p>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes["left-hand-side"]}>
          <div className={classes["strength-and-gaps"]}>
            <Card className={classes.cardClass}>
              <h2>Strengths</h2>

              <div className={classes["ul-div"]}>
                {data.result.strengths.map((data: string, index: number) => {
                  return (
                    <ul key={index + 1}>
                      <li>{data}</li>
                    </ul>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        <div className={classes["right-hand-side"]}>
          <div className={classes.skill}>
            <Card className={classes.cardClass2}>
              <h2>Skills</h2>

              <div className={classes["ul-div"]}>
                {data.result.skills.map((data: string, index: number) => {
                  return (
                    <ul key={index + 1}>
                      <li>{data}</li>
                    </ul>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className={classes.gaps}>
            <Card className={classes.cardClass3}>
              <h2>Gaps</h2>
              <div className={classes["ul-div"]}>
                {data.result.gaps.map((data: string, index: number) => {
                  return (
                    <ul key={index + 1}>
                      <li>{data}</li>
                    </ul>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className={classes.summary}>
            <Card className={classes.cardClass4}>
              <h2>Summary</h2>
              <div className={classes["summary-div"]}>
                <p>{data.result.summary}</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
