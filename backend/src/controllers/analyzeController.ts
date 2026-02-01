import { Request, Response } from "express";
import { extractPdfText } from "../utils";
import { geminiModel } from "../geminiApi";

export const analyzeController = async (req: Request, res: Response) => {
  const { cvText, jobDescription } = req.body;

  const cvFile = req.file;

  console.log("cvFile:", cvFile, "jobDesc:", jobDescription, "cvText:", cvText);

  if (!cvFile) {
    return res.status(400).json({ msg: "CV file is required" });
  }

  if (!jobDescription) {
    return res.status(400).json({ msg: "missing job description" });
  }

  console.log("about to start the prompt");

  try {
    const convertedText = await extractPdfText(cvFile.buffer);

    console.log("convertedText:", convertedText);

    const prompt = `
            Analyze the candidate CV against the job description.

            Return JSON object with:

            - fitScore (0-100)
            - strengths (array of short bullet strings)
            - skills (array of tools, technologies, or software explicitly used by the candidate)
            - gaps (array)
            - summary (short paragraph)

            CV Content:
            ${convertedText}

            Job Description:
            ${jobDescription}
    `;

    const result = await geminiModel.generateContent(prompt);
    console.log("result:", result);

    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedData = JSON.parse(cleaned);
    console.log("text:", parsedData);

    res.json({ result: parsedData, msg: "analysis successful" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("analyzeError:", message);
  }

  // res.status(200).json({ msg: "This is the analyzeController Route" });
};

// import { Request, Response } from "express";
// import { extractPdfText } from "../utils";
// import { geminiModel } from "../geminiApi";

// export const analyzeController = async (req: Request, res: Response) => {
//   const { jobDescription } = req.body;
//   const cvFile = req.file;

//   if (!cvFile || !jobDescription) {
//     return res.status(400).json({ msg: "CV file and job description are required" });
//   }

//   try {

//     const convertedText = await extractPdfText(cvFile.buffer);

//     const prompt = `
//       Analyze the candidate CV against the job description.
//       Return a valid JSON object ONLY.
//       Schema: { "fitScore": number, "strengths": string[], "gaps": string[], "summary": string }

//       CV Content: ${convertedText}
//       Job Description: ${jobDescription}
//     `;

//     const result = await geminiModel.generateContent(prompt);
//     let aiResponse = result.response.text();

//     // 4. Clean and Parse Response (Safeguard for AI formatting)
//     const cleanJson = aiResponse.replace(/```json|```/g, "").trim();
//     const parsedData = JSON.parse(cleanJson);

//     // 5. Final Single Response
//     return res.status(200).json({
//       result: parsedData,
//       msg: "analysis successful"
//     });

//   } catch (error) {
//     console.error("analyzeError:", error);
//     // Ensure only one response is sent even on error
//     return res.status(500).json({
//       msg: error instanceof Error ? error.message : "Internal server error"
//     });
//   }
// };
