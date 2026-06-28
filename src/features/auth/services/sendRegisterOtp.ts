import { api } from "@/config/axios/axios";
import { apiConstants } from "@/share/constants/apiConstants";
import type { ApiResponse } from "@/share/types/api";
import type { SendRegisterOtpRequestDto } from "../types/auth.dto";

export const sendRegisterOtp = async (payload: SendRegisterOtpRequestDto) => {
  const res = await api.post<ApiResponse<null>>(
    apiConstants.AUTH.SEND_REGISTER_OTP,
    payload,
  );

  return res.data;
};
