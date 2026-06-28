import { useMutation } from "@tanstack/react-query";
import { sendRegisterOtp } from "../../services/sendRegisterOtp";
import type { SendRegisterOtpRequestDto } from "../../types/auth.dto";
import { AuthErrorHandler } from "../../utils/authErrors";

export const useSendRegisterOtp = () => {
  return useMutation({
    mutationFn: async (payload: SendRegisterOtpRequestDto) => {
      return sendRegisterOtp(payload);
    },
    onError: (error) => {
      console.error("Send register OTP failed:", AuthErrorHandler.parse(error));
    },
  });
};
