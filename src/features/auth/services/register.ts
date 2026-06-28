import { api } from "@/config/axios/axios";
import { apiConstants } from "@/share/constants/apiConstants";
import type { ApiResponse } from "@/share/types/api";
import type { RegisterRequestDto, RegisterResponseDto } from "../types/auth.dto";

export const register = async (payload: RegisterRequestDto) => {
  const res = await api.post<ApiResponse<RegisterResponseDto>>(
    apiConstants.AUTH.REGISTER,
    payload,
  );

  return res.data;
};
