import { InputText, InputTextProps } from "primereact/inputtext";
import { ReactNode } from "react";
import { t } from "utils";

interface IProps extends InputTextProps {
  id: string;
  children: string | ReactNode;
  isRequired?: boolean;
}

const TextInput = ({ id, children, isRequired = true, ...props }: IProps) => {
  const isInvalid = props.value === "";

  return (
    <div className="flex flex-column gap-2">
      <label htmlFor={id}>{children}</label>
      <InputText id={id} required={isRequired} {...props} />
      {isInvalid && (
        <small className="color-red">{t("Field is required.")}</small>
      )}
    </div>
  );
};

export { TextInput };
