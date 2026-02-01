import { useMutation, useQueryClient } from "@tanstack/react-query";
import { analyze } from "../../apis/analyze-api";
// import type { AnalyzeCvProps } from "../../interface/interface";

export const useAnalyzeCv = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (analyzeCvData: FormData) => analyze(analyzeCvData),
    onMutate: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cvAnalysis"] });
    },
    onSuccess: (data) => {
      console.log("responseFromServer:", data);
      if (data.msg === "analysis successful") {
        queryClient.setQueryData(["cvAnalysis"], data);
      }
    },
    onError: (error: any) => {
      const message = error instanceof Error ? error.message : " failed";
      console.log("analyzeError:", message);
    },
  });
};


