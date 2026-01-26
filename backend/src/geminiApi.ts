import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// console.log("genAi",genAI)
export const geminiModel = genAI.getGenerativeModel({
    // model: "gemini-1.5-flash",
    //   model: "gemini-1.0-pro",
      // model: "models/gemini-1.5-flash",
      model: "models/gemini-2.5-flash"
});





// i tried to access the link: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
//  but saw this:This site can’t be reached 
// generativelanguage.googleapis.com’s server IP address could not be found.
// Try:

// Checking the connection
// Checking the proxy, firewall, and DNS configuration
// Running Windows Network Diagnostics
// ERR_NAME_NOT_RESOLVED

