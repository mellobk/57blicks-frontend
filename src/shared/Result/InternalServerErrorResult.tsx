import { ReactNode } from "react";

import { t } from "utils";

import { ContactUsButton } from "./Buttons";
import { Result } from "./Result";

interface IProps {
  children?: ReactNode;
}

const InternalServerErrorResult = ({ children }: IProps) => {
  return (
    <Result
      heading={t("Something went seriously wrong")}
      subheading={t(
        "It sounds like something unexpected happened right now. Please, inform our support team about this issue ASAP!"
      )}
    >
      <ContactUsButton />
      {children}
    </Result>
  );
};

export { InternalServerErrorResult };
