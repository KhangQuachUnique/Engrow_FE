import { api } from "@/config/axios/axios";
import { apiConstants } from "@/share/constants/apiConstants";
import type { ApiResponse } from "@/share/types/api";
import type { User } from "@/share/types/user/User";

export const getMe = async () => {
  const res = await api.get<ApiResponse<User>>(apiConstants.AUTH.GET_ME);
  return res.data;
};
