import { api } from "@/config/axios/axios";
import { apiConstants } from "@/share/constants/apiConstants";
import type { ApiResponse } from "@/share/types/api";
import type { AccountProfile } from "../types/accountProfile";

export const getAccountProfile = async () => {
  const res = await api.get<ApiResponse<AccountProfile>>(
    apiConstants.USER.PROFILE,
  );
  return res.data;
};
