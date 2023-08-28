import { IconTemplate } from "@/assets/icons";
import { Button as PrimeReactButton } from "primereact/button";

interface AvatarProps {
	loading?: boolean;
	disabled?: boolean;
	iconName?: string;
	text?: string;
	onClick?: () => void;
	className?: string;
	bgColor?: string;
	textColor?: string;
	type?: "submit" | "button" | "reset";
}

export const Button: React.FC<AvatarProps> = ({
	loading,
	disabled,
	iconName = "",
	text,
	onClick,
	className = "bg-primary-500",
	type = "button",
}) => {
	return (
		<PrimeReactButton
			onClick={onClick}
			disabled={loading || disabled}
			className={` w-full h-10  border-none ${className}`}
			type={type}
		>
			<div className="w-full flex flex-row items-center justify-center gap-2">
				{loading ? (
					<IconTemplate name="loader" width="20" color="white" />
				) : (
					<>
						<div>
							{iconName && (
								<IconTemplate name={iconName} width="25" color="white" />
							)}
						</div>
						{text}
					</>
				)}
			</div>
		</PrimeReactButton>
	);
};
