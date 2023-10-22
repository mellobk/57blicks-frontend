import { Icon } from "@/components/ui/Icon";
import type { FC } from "react";

interface LoginTitleProps {
	title?: string;
	text?: string;
	background?: string;
	colorIcon?: string;
}

export const LoanLinkCard: FC<LoginTitleProps> = ({
	title,
	text,
	background,
	colorIcon,
}) => {
	return (
		<div className={` flex flex-col    text-gray-1000  p-[5px] gap-2`}>
			<div className="text-gray-1000 text-[14px] ">{title}</div>
			<div
				className="text-black text-[28px] flex justify-between  rounded-[16px]"
				style={{
					backgroundColor: background || "transparent ",
					padding: "0px 16px",
				}}
			>
				<div
					className=" flex items-center text-[20px]"
					style={{ color: colorIcon }}
				>
					{text}
				</div>
				<div className="flex items-center">
					<Icon color={colorIcon} name="linkCopy" width="25" />
				</div>
			</div>
		</div>
	);
};
