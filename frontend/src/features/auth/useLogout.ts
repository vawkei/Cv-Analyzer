import { logout } from "../../apis/auth-apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import type { AddDispatch } from "../../store/store";
import {
  RESET_USER,
  SET_LOGGEDOUT_USER,
} from "../../store/authStore/authIndex";

export const useLogout = () => {
  const queryClient = useQueryClient();

  const dispatch = useDispatch<AddDispatch>();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      console.log("responseFromServer:", data);
      if (data.msg === "user loggedout successfully") {
        dispatch(SET_LOGGEDOUT_USER(data));
        dispatch(RESET_USER());
        queryClient.clear();
      }
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      console.log("logout error:", message);
    },
  });
};

// onSuccess: (data) => {
//       console.log("responseFromServer:", data);
//       if(data.msg==="user loggedout successfully"){
//         queryClient.clear();
//     }
//     },

// onSuccess: (data) => {
//   console.log("responseFromServer:", data);
//   if(data.msg==="user loggedout successfully"){
//     dispatch(SET_LOGGEDOUT_USER(data))
//     dispatch(RESET_USER())
//     queryClient.clear();
// }
// },
