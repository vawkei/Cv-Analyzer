import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../../apis/auth-apis";
import type { User } from "../../interface/interface";

export const useRegister = () => {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: (userData: User) => register(userData),
    onSuccess: (data) => {
      console.log("responseFromServer:", data);
      if (data.msg === "new user registered") {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (error: any) => {
      const message = error instanceof Error ? error.message : "loggin failed";
      console.log("register error:", message);
    },
  });
};
