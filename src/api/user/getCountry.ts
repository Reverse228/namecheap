import { useApiCalls } from "@utils/hooks";

export const useGetCountry = () => {
  const { data, isSuccess, isLoading } = useApiCalls<any, any>(
    "auth/countries",
  );

  return { data, isSuccess, isLoading };
};
