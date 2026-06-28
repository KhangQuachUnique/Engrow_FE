import { api } from "@/config/axios/axios";
import { apiConstants } from "@/share/constants/apiConstants";
import type { ApiResponse } from "@/share/types/api";
import type {
  VerifyRegisterOtpRequestDto,
  VerifyRegisterOtpResponseDto,
} from "../types/auth.dto";

export const verifyRegisterOtp = async (
  payload: VerifyRegisterOtpRequestDto,
) => {
  const res = await api.post<ApiResponse<VerifyRegisterOtpResponseDto>>(
    apiConstants.AUTH.VERIFY_REGISTER_OTP,
    payload,
  );

  return res.data;
};
