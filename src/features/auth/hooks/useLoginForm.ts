import { useCallback } from "react";
import { useLogin } from "./mutations/useLogin";
import type { LoginFormData } from "@/share/schemas";

export const useLoginForm = () => {
  const loginMutation = useLogin();

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        const result = await loginMutation.mutateAsync({
          email: data.email,
          password: data.password,
        });
        // Handle successful login here
        console.log("Login successful:", result);
        return result;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    [loginMutation],
  );

  return {
    onSubmit,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isSuccess: loginMutation.isSuccess,
  };
};
