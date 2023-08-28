import type { FC } from "react";
import { Button as PrimeReactButton, ButtonProps } from "primereact/button";
import { Icon } from "@/components/ui/Icon";

interface Props extends ButtonProps {
	buttonText?: string;
	className?: string;
	disabled?: boolean;
	iconName?: string;
	loading?: boolean;
	onClick?: () => void;
}

export const Button: FC<Props> = ({
	buttonText,
	className,
	disabled,
	icon,
	loading,
	onClick,
	...props
}) => {
	return (
		<PrimeReactButton
			onClick={onClick}
			disabled={loading || disabled}
			className={`${className} border-none`}
			{...props}
		>
			<div className="w-full flex flex-row items-center justify-center gap-2">
				{loading ? (
					<Icon name="loader" width="20" color="white" />
				) : (
					<>
						{icon && <>{icon}</>}
						{buttonText && <>{buttonText}</>}
					</>
				)}
			</div>
		</PrimeReactButton>
	);
};
