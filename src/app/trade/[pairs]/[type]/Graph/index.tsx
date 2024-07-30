import * as S from "@src/app/trade/[pairs]/[type]/styled";
import Button from "@components/Button/Button";
import { ComponentType, FC, memo, useMemo } from "react";
import { AdvancedRealTimeChartProps } from "react-ts-tradingview-widgets";
import dynamic from "next/dynamic";
import { useGraph } from "@src/app/trade/[pairs]/[type]/Graph/hook";
import Typography from "@components/Typography/Typography";
import { Theme } from "@utils";

const AdvancedRealTimeChart: ComponentType<AdvancedRealTimeChartProps> =
  dynamic(
    () =>
      import("react-ts-tradingview-widgets").then(
        (w) => w.AdvancedRealTimeChart,
      ),
    {
      ssr: false,
    },
  );

const MemoizedAdvancedRealTimeChart = memo(AdvancedRealTimeChart);

const Graph: FC<{ pair: string }> = ({ pair }) => {
  const { graphData } = useGraph(pair);

  const memoizedGraphData = useMemo(() => graphData, [graphData]);

  return memoizedGraphData ? (
    <S.Graph>
      <Typography
        $fontSize={"22px"}
        $color={Theme.colors.white}
        $fontWeight={"400"}
      >
        График пары {pair}
      </Typography>

      <MemoizedAdvancedRealTimeChart
        theme="dark"
        hide_side_toolbar
        autosize
        copyrightStyles={{
          parent: { display: "none" },
        }}
        disabled_features={[
          "header_symbol_search",
          "compare_symbol",
          "border_around_the_chart",
          "header_indicators",
          "border_around_the_chart",
        ]}
        allow_symbol_change={false}
        symbol={memoizedGraphData}
        save_image={false}
      />
    </S.Graph>
  ) : (
    <>loading...</>
  );
};

export default Graph;
