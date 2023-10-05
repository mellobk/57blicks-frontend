import { FC } from "react";
import { Icon } from "@/components/ui/Icon";
import { ICONS } from "@/components/ui/Icon";

interface AvatarProps {
	checked: boolean;
	lineThrough?: boolean;
	offColor?: string;
	offIconColor?: string;
	offIconName: keyof typeof ICONS;
	offLabel: string;
	offTextColor?: string;
	onChange: (value: boolean) => void;
	onColor?: string;
	onIconColor?: string;
	onIconName?: keyof typeof ICONS;
	onLabel?: string;
	onTextColor?: string;
}

export const ToggleButton: FC<AvatarProps> = ({
	checked,
	lineThrough,
	offColor = "bg-gray-1000/[.12]",
	offIconColor = "#B0B4BA",
	offIconName,
	offLabel,
	offTextColor = "text-gray-1000",
	onChange,
	onColor = "bg-blue-200/[.12]",
	onIconColor = "#0085FF",
	onIconName = offIconName,
	onLabel = offLabel,
	onTextColor = "text-blue-200",
}) => {
	return (
		<button
			className={`flex flex-row gap-1 items-center py-1 px-2 rounded-2xl ${
				checked ? onColor : offColor
			}`}
			onClick={() => onChange(!checked)}
		>
			<Icon
				name={checked ? onIconName : offIconName}
				width="8"
				color={checked ? onIconColor : offIconColor}
			/>
			<div
				className={`font-inter font-medium text-[10px] leading-[12px] tracking-[-0.5] ${
					checked
						? onTextColor
						: `${offTextColor} ${lineThrough ? "line-through" : ""}`
				}`}
			>
				{checked ? onLabel : offLabel}
			</div>
		</button>
	);
};
