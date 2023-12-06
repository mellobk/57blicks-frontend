import type { FC } from "react";
import { useNavigate } from "@tanstack/router";

interface Tab {
  label: string;
  routeTo: string;
}

interface LoginTitleProps {
  tabs?: Array<Tab>;
  actualTab?: string;
  colorLight?: boolean;
  isListTab?: boolean;
  setFilter?: (data: any) => void;
}

export const Tabs: FC<LoginTitleProps> = ({
  tabs = [],
  actualTab,
  colorLight = false,
  isListTab = false,
  setFilter,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${
        colorLight
          ? "flex h-full w-full gap-1 text-black-200 items-center justify-center p-[5px] bg-gray-200 rounded-[16px]"
          : "flex h-full w-full gap-1 text-white items-center justify-center p-[5px] bg-black-200 rounded-[16px]"
      }`}
    >
      {tabs.map((Tab, index) => {
        const handleClick = async (): Promise<void> => {
          if (isListTab && setFilter) {
            setFilter(Tab.label);
          } else {
            await navigate({ to: `/${Tab.routeTo}` });
          }
        };

        return (
          Tab.label && (
            <div
              key={index}
              onClick={handleClick}
              className={`px-5 cursor-pointer ${
                colorLight
                  ? actualTab?.toLocaleLowerCase() === Tab.label.toLocaleLowerCase()
                    ? "bg-white"
                    : ""
                  : actualTab === Tab.label.toLocaleLowerCase()
                  ? "bg-black-300"
                  : ""
              } rounded-[16px] text-[13px]`}
            >
              {Tab.label}
            </div>
          )
        );
      })}
    </div>
  );
};
