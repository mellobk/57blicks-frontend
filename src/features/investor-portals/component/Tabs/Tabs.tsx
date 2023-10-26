import type { FC } from "react";

interface LoginTitleProps {
	tabs?: Array<{ label: string; routeTo: string }>;
	actualTab?: string;
	onClick?: (value: string) => void;
}

export const Tabs: FC<LoginTitleProps> = ({ tabs, actualTab, onClick }) => {
	return (
		<div className="flex  w-full h-full  gap-1 text-gray-1000 items-center justify-center p-[5px] bg-gray-200 rounded-[16px]">
			{tabs?.map((Tab, index) => (
				<div
					key={index}
					onClick={(): void => {
						if (onClick) {
							onClick(Tab?.label?.toLocaleLowerCase());
						}
					}}
					className={`px-5 cursor-pointer ${
						actualTab === Tab?.label?.toLocaleLowerCase()
							? "bg-white text-black"
							: ""
					} rounded-[16px] text-[13px]`}
				>
					{Tab.label}
				</div>
			))}
		</div>
	);
};
