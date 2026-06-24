import { api } from "@/config/axios/axios";
import { apiConstants } from "@/share/constants/apiConstants";
import type { ApiResponse } from "@/share/types/api";
import type { LoginPayload } from "../types/loginPayload";

export const login = async (payload: LoginPayload) => {
  const res = await api.post<ApiResponse<{ accessToken: string }>>(
    apiConstants.AUTH.LOGIN,
    payload,
  );
  return res.data;
};
