import { useApiCalls } from "@utils/hooks";

export const useGetPositions = () => {
  const { data, isLoading } = useApiCalls<any, any>("positions");

  return { data, isLoading };
};
