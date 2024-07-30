import Alert from "@components/Alert/Alert";
import PopUp from "@components/PopUp/PopUp";
import { useProcessTrade } from "@src/app/trade/[pairs]/[type]/ProcessTrade/hook";
import { FC } from "react";
import Pair from "@components/Pair/Pair";
import MainWrapper from "@components/MainWrapper/MainWrapper";

const ProcessTrade: FC<{ pair: string; type: string }> = ({ pair, type }) => {
  const {
    alertMessage,
    notFounds,
    alertAboutCompleteTransaction,
    typeOfTrade,
    sumOfInvesting,
    isLoading,
    isSuccess,
    secondCurrency,
    lastPriceOfPair,
    handles: {
      handleAlertMessage,
      handleNotFoundsMemoized,
      routerPushWallet,
      handleAlertAboutCompleteTransaction,
      handleTrade,
      handleSumOfInvesting,
    },
  } = useProcessTrade(pair, type);

  return (
    <MainWrapper
      addMenu={{
        active: "/trade",
      }}
      addHeader
      $gap="24px"
      secondCurrency={secondCurrency}
    >
      {alertMessage && (
        <Alert
          type="error"
          description={alertMessage}
          setState={handleAlertMessage}
        />
      )}

      <PopUp
        appear={notFounds}
        closePopUp={handleNotFoundsMemoized}
        bottomButton={{
          label: "Пополнить кошелек",
          variant: "active",
          onClick: routerPushWallet,
        }}
        header={"Сделка отменена"}
        messages={
          "У вас недостаточный баланс кошелька для выполнения этой сделки. Пожалуйста, уменьшите размер сделки или пополните свой кошелек."
        }
      />

      {alertAboutCompleteTransaction && (
        <Alert
          type={"success"}
          description={`Вы успешно ${typeOfTrade === "BUY" ? `купили ${pair.split("-")[1]} на ${sumOfInvesting} UDST` : typeOfTrade === "SELL" && `продали ${sumOfInvesting} ${pair.split("-")[1]}`} `}
          setState={(value) =>
            handleAlertAboutCompleteTransaction(Boolean(value))
          }
        />
      )}

      {isLoading ? (
        <></>
      ) : (
        <Pair
          buy={{ path: type }}
          onClickBuy={(priceBuy, sum) =>
            handleTrade("BUY", pair, sum, priceBuy)
          }
          onCLickSell={(priceBuy, sum) =>
            handleTrade("SELL", pair, sum, priceBuy)
          }
          price={lastPriceOfPair}
          getSum={(value) => handleSumOfInvesting(value)}
          disableButtons={!isSuccess}
          quoteCurrency={pair.split("-")[0]}
          baseCurrency={pair.split("-")[1]}
        />
      )}
    </MainWrapper>
  );
};

export default ProcessTrade;
