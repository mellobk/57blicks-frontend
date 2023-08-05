import { ReactNode } from "react";

interface IProps {
  title: string | ReactNode;
  description?: string | ReactNode;
  children?: ReactNode;
}

const PageHeader = ({
  title,
  description,
  children,
}: IProps) => {

  return (
    <header
      className="flex w-full justify-between gap-x-3 items-center"
    >
      <div className="flex flex-col items-start gap-y-1">
        <h1 className="text-lg">{title}</h1>
        {description && <span className="text-gray-200">{description}</span>}
      </div>
    </header>
  );
};

export { PageHeader };
