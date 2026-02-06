// import type { AnalyzeCvProps } from "../interface/interface";


const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/analyze`;

export const analyze = async (formData: FormData) => {
  // const formData = new FormData();

  // if(analyzeData.cvFile){
  //     formData.append("cvFile",analyzeData.cvFile)
  // };

  // formData.append("cvText",analyzeData.cvText);
  // formData.append("jobDescription",analyzeData.jobDescription);

  try {
    console.log("starting request...");
    const response = await fetch(`${BACKEND_URL}/analyze-route`, {
      method: "POST",
      body: formData,
      // headers:{"Content-Type":"multipart/form-data"},
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.msg || "Request failed");
    }
    console.log("responseFronServer:", data);
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wromng";
    console.log("analyzeApiError:", message);
  }
};
