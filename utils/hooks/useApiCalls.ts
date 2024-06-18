import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

import { API_URL } from "@utils";

import type { UseQueryOptions } from "react-query";

export function useApiCalls<GetProps, ReturnProps>(
  url: string,
  options?: UseQueryOptions<GetProps, Error, ReturnProps>,
  params?: object,
) {
  const clearUrl = url.startsWith("/") ? url.substring(1) : url;

  const token = Cookies.get("token");

  const fetchData = (url: string, params?: object) => {
    return axios
      .get(`${API_URL}/${url}`, {
        params,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);
  };

  const { data, error, isLoading, isFetching, refetch, isSuccess } = useQuery<
    GetProps,
    Error,
    ReturnProps
  >(`${clearUrl}`, async () => await fetchData(clearUrl, params), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    ...options,
  });

  return { data, error, isLoading, isFetching, refetch, isSuccess };
}
