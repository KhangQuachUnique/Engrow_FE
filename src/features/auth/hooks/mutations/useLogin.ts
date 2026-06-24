import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/login";
import type { LoginPayload } from "../../types/loginPayload";
import { AuthErrorHandler } from "../../utils/authErrors";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await login(payload);
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
      return response;
    },
    onSuccess: () => {
      // Redirect to dashboard after successful login
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      // Error will be handled in component via error state
      console.error("Login failed:", AuthErrorHandler.parse(error));
    },
  });
};
