import { ReactNode } from "react";

import { t } from "utils";

import { ContactUsButton } from "./Buttons";
import { Result } from "./Result";

interface IProps {
  children?: ReactNode;
}

const InternalErrorResult = ({ children }: IProps) => {
  return (
    <Result
      heading={t("Something went wrong")}
      subheading={t(
        "It sounds like something unexpected happened right now. Please, give it a try later or, if it's urgent, contact our support team."
      )}
    >
      <ContactUsButton />
      {children}
    </Result>
  );
};

export { InternalErrorResult };
