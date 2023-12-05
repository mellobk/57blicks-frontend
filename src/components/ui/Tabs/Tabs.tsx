import type { FC } from "react";
import { useNavigate } from "@tanstack/router";

interface LoginTitleProps {
	tabs?: Array<{ label: string; routeTo: string }>;
	actualTab?: string;
	colorLight?: boolean;
}

export const Tabs: FC<LoginTitleProps> = ({
	tabs,
	actualTab,
	colorLight = false,
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
			{tabs?.map(
				(Tab, index) =>
					Tab.label && (
						<div
							key={index}
							onClick={(): void => {
								void navigate({ to: `/${Tab?.routeTo}` });
							}}
							className={`px-5 cursor-pointer ${
								colorLight
									? actualTab === Tab?.label?.toLocaleLowerCase()
										? "bg-white"
										: ""
									: actualTab === Tab?.label?.toLocaleLowerCase()
									? "bg-black-300"
									: ""
							} rounded-[16px] text-[13px]`}
						>
							{Tab.label}
						</div>
					)
			)}
		</div>
	);
};
