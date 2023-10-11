import { FC } from "react";

interface LoginTitleProps {
	initialTab?: string;
	actualTab?: string;
}

export const BreadCrumb: FC<LoginTitleProps> = ({ initialTab, actualTab }) => {
	return (
		<div className="flex flex-col w-full items-center justify-center">
			<div className={` flex gap-2  rounded-[16px] text-[13px]`}>
				<div className="text-gray-600">{initialTab}</div>
				<div className="text-white">/</div>
				<div className="text-white">{actualTab}</div>
			</div>
		</div>
	);
};
