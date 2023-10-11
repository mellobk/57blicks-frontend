import type { FC } from "react";

type Props = {
	text: string;
	variant: "success" | "danger";
};

export const Tag: FC<Props> = ({ text, variant }) => {
	const getClass = (): string => {
		switch (variant) {
			case "success": {
				return "bg-green-800 text-green  ";
			}
			case "danger": {
				return "bg-red-100 text-red-ERROR";
			}
			default: {
				return "bg-green-500";
			}
		}
	};
	return (
		<span
			className={`text-[10px] pt-1 pb-1 pl-2 pr-2 rounded-xl   font-semibold ${getClass()}`}
		>
			{text}
		</span>
	);
};
