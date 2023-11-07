import type { FC } from "react";
import { useNavigate } from "@tanstack/router";

interface LoginTitleProps {
	tabs?: Array<{ label: string; routeTo: string }>;
	actualTab?: string;
}

export const Tabs: FC<LoginTitleProps> = ({ tabs, actualTab }) => {
	const navigate = useNavigate();
	return (
		<div className="flex h-full w-full gap-1 text-white items-center justify-center p-[5px] bg-black-200 rounded-[16px]">
			{tabs?.map(
				(Tab, index) =>
					Tab.label && (
						<div
							key={index}
							onClick={(): void => {
								void navigate({ to: `/${Tab?.routeTo}` });
							}}
							className={`px-5 cursor-pointer ${
								actualTab === Tab?.label?.toLocaleLowerCase()
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
