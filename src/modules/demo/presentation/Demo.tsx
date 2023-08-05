import { Button } from "primereact/button";

import { numberVO, moneyVO, t, dateVO } from "utils";

import { useCounter } from "../application";

const Demo = () => {
  const { count, increment } = useCounter();

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col">
        <h1 className="font-black">{t("Vite + React")}</h1>
        <div className="flex flex-col">
          <Button onClick={() => increment()}>
            {t(`count is {count}`, { count })}
          </Button>
          <span className="font-bold">
            {t(`Edit {path} and save to test HMR`, {
              path: <code>src/App.tsx</code>,
            })}
          </span>
        </div>
        <span className="font-normal">
          {t("Vite had {number} weekly downloads on NPM in {date}", {
            number: numberVO.format("2696684.12"),
            date: dateVO.formatDate(new window.Date(2023, 1, 17, 10, 44, 0)),
          })}
        </span>
        <span className="font-normal">
          {t("{bitcoinNumber} bitcoins were worth {currencyNumber} on {date}", {
            bitcoinNumber: numberVO.format(1000),
            currencyNumber: moneyVO.format(23753382.63, "USD"),
            date: dateVO.formatDateTime(new Date(2023, 1, 17, 12, 44, 0)),
          })}
        </span>{" "}
        <span className="font-normal">
          {t("Storybook conference: {date}", {
            date: dateVO.formatRelativeTime(
              dateVO.given(new Date(2023, 1, 17, 12, 44, 0))
            ),
          })}
        </span>
      </div>
    </div>
  );
};
export { Demo };
