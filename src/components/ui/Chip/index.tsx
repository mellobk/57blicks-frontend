import type { FC, ReactNode } from "react";

import { type ICONS, Icon } from "../Icon";

interface ChipProps {
	content: string | ReactNode;
	variant: "primary" | "gray" | "success" | "info" | "gold";
	icon?: keyof typeof ICONS;
	iconPosition?: "left" | "right";
	className?: string;
}
const Chip: FC<ChipProps> = ({
	content,
	variant,
	className,
	icon,
	iconPosition,
}) => {
	const getIconColor = (): string => {
		//TODO:  THE OTHER COLORS WHEN NEEDED
		switch (variant) {
			case "primary": {
				return "";
			}
			case "gray": {
				return "#DEE3E6";
			}
			case "success": {
				return "#00BA35";
			}
			case "info": {
				return "";
			}
			case "gold": {
				return "#C79E63";
			}

			default: {
				return "bg-primary text-white";
			}
		}
	};

	const getClass = (): string => {
		switch (variant) {
			case "primary": {
				return "bg-primary text-white";
			}
			case "gray": {
				return "bg-gray-200 text-primary-500";
			}
			case "success": {
				return "bg-green-800 text-green-500";
			}
			case "info": {
				return "bg-blue-400 text-white";
			}
			case "gold": {
				return "bg-gold-250 text-gold-500";
			}

			default: {
				return "bg-primary text-white";
			}
		}
	};
	return (
		<div
			className={`flex flex-row w-fit	pr-4 pl-4 items-center justify-center px-1 py-1 rounded-full text-xs font-medium ${getClass()} ${className} relative
        border
      `}
			style={{ borderColor: getIconColor() }}
		>
			{iconPosition === "left" && icon && (
				<Icon name={icon} width="15" color={getIconColor()} />
			)}

			<div className="pl-2 pr-2">{content}</div>

			{iconPosition === "right" && icon && (
				<Icon name={icon} width="15" color={getIconColor()} />
			)}
		</div>
	);
};

export default Chip;
