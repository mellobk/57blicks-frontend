import type { FC } from "react";
import { Button as PrimeReactButton } from "primereact/button";
import { Icon } from "@/components/ui/Icon";

interface ButtonProps {
	loading?: boolean;
	disabled?: boolean;
	iconName?: string;
	text?: string;
	onClick?: () => void;
	className?: string;
	bgColor?: string;
	textColor?: string;
}

export const Button: FC<ButtonProps> = ({
	loading,
	disabled,
	iconName = "",
	text,
	onClick,
	className = "bg-primary-500",
}) => {
	return (
		<PrimeReactButton
			onClick={onClick}
			disabled={loading || disabled}
			className={` w-full h-10  border-none ${className}`}
		>
			<div className="w-full flex flex-row items-center justify-center gap-2">
				{loading ? (
					<Icon name="loader" width="20" color="white" />
				) : (
					<>
						<div>
							{iconName && <Icon name={iconName} width="25" color="white" />}
						</div>
						{text}
					</>
				)}
			</div>
		</PrimeReactButton>
	);
};
