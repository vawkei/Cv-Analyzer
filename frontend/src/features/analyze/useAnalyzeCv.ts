import { useMutation } from "@tanstack/react-query";
import { analyze } from "../../apis/analyze-api";
// import type { AnalyzeCvProps } from "../../interface/interface";

export const useAnalyzeCv = () => {
  return useMutation({
    mutationFn: (analyzeCvData:  FormData) => analyze(analyzeCvData),
    onSuccess: (data) => {
      console.log("responseFromServer:", data);
    },
    onError: (error: any) => {
      const message = error instanceof Error ? error.message : " failed";
      console.log("analyzeError:", message);
    },
  });
};
