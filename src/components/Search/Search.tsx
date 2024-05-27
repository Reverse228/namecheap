import { FC } from "react";

import * as S from "./styled";
import SearchSvg from "../../../public/svg/SearchSvg";
import SvgIcon from "../SvgIcon";
import { useSearch } from "./hook";
import { Props } from "./types";

const Search: FC<Props> = (props) => {
  const { setSearchInput } = props;

  const {
    searchInput,
    handles: { handleSearchInput },
  } = useSearch();

  return (
    <S.Wrapper>
      <S.SearchInput
        placeholder="Поиск"
        onChange={(e) => handleSearchInput(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && setSearchInput && setSearchInput(searchInput)
        }
      />
      <SvgIcon onClick={() => setSearchInput && setSearchInput(searchInput)}>
        <SearchSvg />
      </SvgIcon>
    </S.Wrapper>
  );
};

export default Search;
