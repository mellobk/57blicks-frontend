import type { FC } from "react";

interface LoginTitleProps {
	title?: string;
	text?: string;
	background?: boolean;
}

export const LoanCard: FC<LoginTitleProps> = ({ title, text, background }) => {
	return (
		<div
			className={`${
				background ? "bg-gray-150 " : "bg-transparent "
			} flex flex-col    text-gray-1000  p-[5px] `}
		>
			<div className="text-gray-1000 text-[14px] ">{title}</div>
			<div
				style={{ overflowWrap: "anywhere" }}
				className="text-black text-[28px] "
			>
				{text}
			</div>
		</div>
	);
};
