import { useState } from "react";

export const useSearch = () => {
  const [searchInput, setSearchInput] = useState<string | null>(null);

  const handleSearchInput = (value: string) => {
    setSearchInput(value);
  };

  return {
    searchInput,
    handles: {
      handleSearchInput,
    },
  };
};
