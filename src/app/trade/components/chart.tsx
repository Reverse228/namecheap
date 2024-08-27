import { memo, useEffect, useRef } from "react";

import { useSearchParams } from "next/navigation";

const Chart = () => {
  const searchParams = useSearchParams();

  const pairs = searchParams.get("pair")?.split("-");
  const type = searchParams.get("type");

  const graphData =
    type && pairs && (type === "index" ? pairs[0] : `${pairs[0]}${pairs[1]}`);

  const container = useRef<HTMLDivElement | null>(null);

  const hasRendered = useRef(false);

  useEffect(() => {
    if (!hasRendered.current && graphData) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: graphData,
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        backgroundColor: "rgba(28 ,25 ,23 ,1)",
        allow_symbol_change: false,
        save_image: false,
        calendar: false,
        hide_top_toolbar: true,
        hide_volume: true,
        withdateranges: true,
        loading_screen: {
          backgroundColor: "#000000",
          foregroundColor: "#FFFFFF",
        },
        support_host: "https://www.tradingview.com",
      });

      container?.current?.appendChild(script);

      hasRendered.current = true;
    }
  }, [graphData]);

  return (
    <div
      className={
        "mt-6 rounded-lg w-full h-[600px] overflow-hidden border *:scale-[101%]"
      }
    >
      <div className="tradingview-widget-container" ref={container}>
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "calc(100% - 32px)", width: "100%" }}
        ></div>
      </div>
    </div>
  );
};

export default memo(Chart);
