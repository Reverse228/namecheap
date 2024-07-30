"use client";

import ProcessTrade from "@src/app/trade/[pairs]/[type]/ProcessTrade";
import Graph from "@src/app/trade/[pairs]/[type]/Graph";

const Trade = ({ params }: { params: { pairs: string; type: string } }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        marginBottom: "6px",
      }}
    >
      <ProcessTrade pair={params.pairs} type={params.type} />
      <Graph pair={params.pairs} />
    </div>
  );
};

export default Trade;
