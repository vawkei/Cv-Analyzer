// 📒📒📒 I am using React Query to handle this.
// this:  queryClient.setQueryData(["cvAnalysis"], data); serves the purpose of this redux index/slice 📒📒📒

import { createSlice } from "@reduxjs/toolkit";
// import type { AnalyzeCvProps } from "../../interface/interface";

const initialAnalyzeState = {
  // jobDescription:string
  // cvText:string
  // cvFile:File | null

  cvDataResponse: [],
};

export const analyzeSlice = createSlice({
  name: "analyze",
  initialState: initialAnalyzeState,
  reducers: {
    SET_CV_DATA_RESPONSE(state, action: any) {
      state.cvDataResponse = action.payload;
    },
  },
});

export const { SET_CV_DATA_RESPONSE } = analyzeSlice.actions;
