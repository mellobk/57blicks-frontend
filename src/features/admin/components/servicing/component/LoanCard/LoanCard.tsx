import type { FC } from "react";

interface LoginTitleProps {
	title?: string;
	text?: string;
	background?: boolean;
	className?: string;
	children?: React.ReactNode;
}

export const LoanCard: FC<LoginTitleProps> = ({
	title,
	text,
	background,
	className,
	children,
}) => {
	return (
		<div
			className={`${
				background ? "bg-gray-150 " : "bg-transparent "
			} flex flex-col    text-gray-1000  p-[5px] ${className}`}
		>
			<div className="text-gray-1000 text-[14px] ">{title}</div>
			<div className="text-black text-[28px] ">{text}</div>
			{children}
		</div>
	);
};
