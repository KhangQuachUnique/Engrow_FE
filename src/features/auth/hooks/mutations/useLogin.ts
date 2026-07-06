import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/login";
import type { LoginRequestDto } from "../../types/auth.dto";
import { AuthErrorHandler } from "../../utils/authErrors";
import { appConstants } from "@/share/constants/appConstants";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: LoginRequestDto) => {
      const response = await login(payload);
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
      return response;
    },
    onSuccess: () => {
      // Redirect to home after successful login
      navigate(appConstants.HOME, { replace: true });
    },
    onError: (error) => {
      // Error will be handled in component via error state
      console.error("Login failed:", AuthErrorHandler.parse(error));
    },
  });
};
