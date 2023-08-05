import React from "react";

interface IProps {
  maxW?: string;
  spacing?: string;
}

const Page = ({
  children,
  maxW = 'lg',
  spacing = '6',
}: React.PropsWithChildren<IProps>) => {
  return (
    <div
      className={`flex flex-col gap-y-${spacing} w-full px-3 md:px-4 max-w-${maxW} my-0 mx-auto`}
    >
      {children}
    </div>
  );
};

export { Page };
