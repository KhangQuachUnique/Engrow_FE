import { useQuery } from "@tanstack/react-query";
import { getAccountProfile } from "../../services/getAccountProfile";

export const ACCOUNT_PROFILE_QUERY_KEY = "accountProfile";

export const useAccountProfile = () => {
  return useQuery({
    queryKey: [ACCOUNT_PROFILE_QUERY_KEY],
    queryFn: getAccountProfile,
  });
};
