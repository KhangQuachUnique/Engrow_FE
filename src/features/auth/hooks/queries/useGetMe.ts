import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../services/getMe";

export const GET_ME_QUERY_KEY = "getMe";

export const useGetMe = () => {
  return useQuery({
    queryKey: [GET_ME_QUERY_KEY],
    queryFn: getMe,
    // You can add options like refetchOnWindowFocus, retry, etc. as needed
  });
};
