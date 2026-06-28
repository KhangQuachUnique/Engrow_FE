import { api } from "@/config/axios/axios";
import { apiConstants } from "@/share/constants/apiConstants";
import type { ApiResponse } from "@/share/types/api";
import type { LoginRequestDto, LoginResponseDto } from "../types/auth.dto";

export const login = async (payload: LoginRequestDto) => {
  const res = await api.post<ApiResponse<LoginResponseDto>>(
    apiConstants.AUTH.LOGIN,
    payload,
  );
  return res.data;
};
