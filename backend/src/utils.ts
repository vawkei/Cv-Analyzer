// import { PdfReader } from "pdfreader";

// export const extractPdfText = (buffer:Buffer)=>{
//     new Promise<string>((resolve,reject)=>{

//         let text = "";

//         new PdfReader().parseBuffer(buffer,(err,item)=>{
//             if(err){
//                 return reject(err)
//             };
//             if(!item){
//                 return resolve(text)
//             };
//             if(item.text){
//                 text += item.text + ""
//             }
//         })
//     })
// }






// // import pdfParse from "pdf-parse";
// const pdfParse = require("pdf-parse");

// export const extractPdfText = async (buffer: Buffer) => {
//   const data = await pdfParse.default(buffer); // <-- note the `.default`
//   return data.text;
// };


// const pdfParse = require("pdf-parse");

// export const extractPdfText = async (buffer: Buffer) => {
//   if (!buffer) throw new Error("No PDF buffer provided");
//   const data = await pdfParse(buffer); // now this works at runtime
//   return data.text; // string
// };

//📕📕📕 kept getting this error with those functions:error message from errorHandlerMiddleware: TypeError: pdfParse.default is not a function at extractPdfText




// import { extractText } from "unpdf";

// export const extractPdfText = async (buffer: Buffer) => {
//   const { text } = await extractText(buffer);
//   return text;
// };


import { extractText } from "unpdf";

export const extractPdfText = async (buffer: Buffer) => {
  // Convert Node.js Buffer to Uint8Array
  const uint8Array = new Uint8Array(buffer);
  
  const { text } = await extractText(uint8Array);
  return text;
};
