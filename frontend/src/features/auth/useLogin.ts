import { useMutation } from "@tanstack/react-query";
import { login } from "../../apis/auth-apis";
import type { User } from "../../interface/interface";

export const useLogin = () => {
  return useMutation({
    mutationFn: (userData: User) => login(userData),
    onSuccess: (data) => {
      console.log("responseFromServer:", data);
    },
    onError: (error: any) => {
      const message = error instanceof Error ? error.message : "loggin failed";
      console.log("loggin error:", message);
    },
  });
};
