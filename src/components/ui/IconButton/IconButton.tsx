import type { FC } from "react";
import { Button } from "@/components/ui/Button";
import { Icon, type IconProps } from "@/components/ui/Icon";

interface Props extends IconProps {
	bgColor?: string;
	className?: string;
	onClick?: () => void;
}

export const IconButton: FC<Props> = ({
	bgColor = "bg-gray-200",
	className,
	color,
	name,
	onClick,
	width,
	height = "32px",
}) => (
	<Button
		className={`${className} flex justify-center items-center rounded-3xl h-${height} w-[32px] p-0 ${bgColor}`}
		icon={<Icon name={name} color={color} width={width} />}
		onClick={onClick}
		type="button"
	/>
);
