import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { appConstants } from "@/share/constants/appConstants";
import { register } from "../../services/register";
import type { RegisterRequestDto } from "../../types/auth.dto";
import { AuthErrorHandler } from "../../utils/authErrors";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: RegisterRequestDto) => {
      const response = await register(payload);

      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }

      return response;
    },
    onSuccess: () => {
      navigate(appConstants.DASHBOARD, { replace: true });
    },
    onError: (error) => {
      console.error("Register failed:", AuthErrorHandler.parse(error));
    },
  });
};
