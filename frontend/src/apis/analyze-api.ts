// import type { AnalyzeCvProps } from "../interface/interface";

const BASE_URL = "http://localhost:5000/api/v1/analyze"; 

export const analyze =async (formData: FormData)=>{

    // const formData = new FormData();

    // if(analyzeData.cvFile){
    //     formData.append("cvFile",analyzeData.cvFile)
    // };

    // formData.append("cvText",analyzeData.cvText);
    // formData.append("jobDescription",analyzeData.jobDescription);

    try{
        console.log("starting request...")
        const response = await fetch(`${BASE_URL}/analyze-route`,{
            method:"POST",
            body:formData,
            // headers:{"Content-Type":"multipart/form-data"},
            credentials:"include"
        });
        if(!response.ok){
            throw new Error("Request failed")
        };
        
        const data =await response.json();
        console.log("responseFronServer:",data);
        return data
        
    }catch(error){
        const message = error instanceof Error?error.message:"something went wromng";
        console.log("analyzeApiError:",message)
    }
}