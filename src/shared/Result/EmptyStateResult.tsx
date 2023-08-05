import { ReactNode } from "react";

import { t } from "utils";

import { RestFiltersButton } from "./Buttons";
import { Result } from "./Result";

interface IProps {
  children?: ReactNode;
}

const EmptyStateResult = ({ children }: IProps) => {
  return (
    <Result
      heading={t("No results found")}
      subheading={t("Unfortunately, there is nothing for you here yet!")}
    >
      <RestFiltersButton />
      {children}
    </Result>
  );
};

export { EmptyStateResult };
