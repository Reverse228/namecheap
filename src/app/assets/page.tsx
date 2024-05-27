"use client";

import MainWrapper from "@src/components/MainWrapper/MainWrapper";
import { useAssets } from "./hook";

import * as S from "./styled";
import Button from "@src/components/Button/Button";
import Typography from "@src/components/Typography/Typography";
import Search from "@src/components/Search/Search";
import Pair from "@src/components/Pair/Pair";

const Assets = () => {
  const {
    pairsData,
    handles: { handleSearch },
  } = useAssets();

  return (
    <MainWrapper addMenu={{ active: "/assets" }} $gap="24px" addHeader>
      <Search setSearchInput={handleSearch} />
      {pairsData &&
        pairsData.map(({ quoteCurrency, baseCurrency }, idx) => (
          <Pair
            key={idx}
            quoteCurrency={quoteCurrency}
            baseCurrency={baseCurrency}
          />
        ))}
    </MainWrapper>
  );
};

export default Assets;
