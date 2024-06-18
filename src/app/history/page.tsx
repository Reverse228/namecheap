"use client";

import MainWrapper from "@components/MainWrapper/MainWrapper";
import { useHistory } from "@src/app/history/hook";

const History = () => {
  const {} = useHistory();

  return (
    <MainWrapper addMenu={{ active: "/history" }}>
      <></>
    </MainWrapper>
  );
};

export default History;
