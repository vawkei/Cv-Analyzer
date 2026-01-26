import React, { useState } from "react";
import Button from "../ui/button/Button";
import Card from "../ui/card/Card";
import classes from "./AnalysisForm.module.scss";
import { useAnalyzeCv } from "../../features/analyze/useAnalyzeCv";
import type { AnalyzeCvProps } from "../../interface/interface";
import { useDispatch } from "react-redux";
import type { AddDispatch } from "../../store/store";
import { SET_CV_DATA_RESPONSE } from "../../store/analyzeStore/analyzeIndex";
import { useNavigate } from "react-router-dom";

const AnalysisForm = () => {
  const { mutateAsync: analyzeData } = useAnalyzeCv();

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [showPasteCv, setShowPasteCv] = useState(false);
  const [cvText, setCvText] = useState("");
  const [showPdf, setShowPdf] = useState(false);
  const [pdfPreview, setPdfPreview] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const navigate = useNavigate();

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const cvTextChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCvText(e.target.value);
  };

  // For the job description textarea
  const jobDescriptionChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setJobDescription(e.target.value);
  };

  const setShowPasteCvToggleHandler = () => {
    setShowPasteCv((curr) => !curr);
  };

  const dispatch = useDispatch<AddDispatch>();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cvFile || cvText) {
      return console.log("please supply a cv");
    }
    if (!jobDescription) {
      return console.log("please enter job description");
    }

    const formData = new FormData();
    formData.append("cvFile", cvFile);
    formData.append("cvText", cvText);
    formData.append("jobDescription", jobDescription);

    console.log("FormData ready:", formData);

    try {
      await analyzeData(formData, {
        onSuccess: (data) => {
          if (data.msg === "analysis successful") {
            dispatch(SET_CV_DATA_RESPONSE(data));
            navigate("/analysis-result");
          }
        },
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      console.log("uploadingFileError:", message);
    }
  };

  return (
    <div className={classes["analysis-form-container"]}>
      <div className={classes.heading}>
        <h1>Analyze a Candidate</h1>
      </div>

      <div className={classes.body}>
        <form action="" onSubmit={onSubmitHandler}>
          <Card className={classes.cardClass}>
            <h2>Upload CV</h2>

            <div className={classes.actions}>
              <label className={classes.uploadButton}>
                Upload PDF or Text Files
                <input
                  type="file"
                  accept=".pdf,.txt"
                  onChange={fileChangeHandler}
                  hidden
                />
              </label>
              <div className={classes["pdf-preview"]}>{pdfPreview ? <p>Pdf loaded</p> : ""}</div>

              <div>
                <p>OR</p>
              </div>

              <div className={classes["mid-part"]}>
                <button
                  type="button"
                  className={classes.secondaryButton}
                  onClick={() => setShowPasteCvToggleHandler()}
                >
                  Paste CV Text
                </button>

                {showPasteCv && (
                  <textarea
                    placeholder="Paste CV text here..."
                    value={cvText}
                    onChange={cvTextChangeHandler}
                  />
                )}
              </div>
            </div>

            <div className={classes["lower-part"]}>
              <h2>Paste Job Description</h2>
              <div className={classes.control}>
                <textarea
                  name=""
                  id=""
                  value={jobDescription}
                  onChange={jobDescriptionChangeHandler}
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

// First version here:👇
// import Button from "../ui/button/Button";
// import Card from "../ui/card/Card";
// import classes from "./AnalysisForm.module.scss";

// const AnalysisForm = () => {
//   return (
//     <div className={classes["analysis-form-container"]}>
//       <div className={classes.heading}>
//         <h1>Analyze a Candidate</h1>
//       </div>

//       <div className={classes.body}>
//         <form action="">
//           <Card className={classes.cardClass}>
//             <h2>Upload CV</h2>
//             <div className={classes.actions}>
//               <Button type="submit" className={classes.button}>
//                 Upload PDF or Text Files
//               </Button>
//               <p>OR</p>
//               <Button type="submit" className={classes.button2}>
//                 Paste CV Text
//               </Button>
//             </div>

//             <div className={classes["lower-part"]}>
//               <h2>Paste Job Description</h2>
//               <div className={classes.control}>
//                 <textarea
//                   name=""
//                   id=""
//                   placeholder="Paste the job description here..."
//                 ></textarea>
//               </div>
//               <div className={classes.actions}>
//                 <Button type="submit" className={classes.button3}>
//                   Run AI Analysis
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AnalysisForm;
