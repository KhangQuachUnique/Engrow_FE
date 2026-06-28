import { useMutation } from "@tanstack/react-query";
import { verifyRegisterOtp } from "../../services/verifyRegisterOtp";
import type { VerifyRegisterOtpRequestDto } from "../../types/auth.dto";
import { AuthErrorHandler } from "../../utils/authErrors";

export const useVerifyRegisterOtp = () => {
  return useMutation({
    mutationFn: async (payload: VerifyRegisterOtpRequestDto) => {
      return verifyRegisterOtp(payload);
    },
    onError: (error) => {
      console.error("Verify register OTP failed:", AuthErrorHandler.parse(error));
    },
  });
};
