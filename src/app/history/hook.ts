import { useGetPositions } from "@api";

export const useHistory = () => {
  const { data: positionsData } = useGetPositions();

  console.log(positionsData);

  return {};
};
