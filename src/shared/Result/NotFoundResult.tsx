import { ReactNode } from "react";

import { t } from "utils";

import { ContactUsButton } from "./Buttons";
import { Result } from "./Result";

interface IProps {
  children?: ReactNode;
}

const NotFoundResult = ({ children }: IProps) => {
  return (
    <Result
      heading={t("Page doesn't exist")}
      subheading={t(
        "Probably you got here by accident. If you think there is something wrong on our side, please contact us!"
      )}
    >
      <ContactUsButton />
      {children}
    </Result>
  );
};

export { NotFoundResult };
