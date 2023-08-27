import type { FC } from "react";
import { Button as PrimeReactButton, ButtonProps } from "primereact/button";
import { Icon } from "@/components/ui/Icon";

interface Props extends ButtonProps {
	loading?: boolean;
	disabled?: boolean;
	iconName?: string;
	buttonText?: string;
	onClick?: () => void;
	className?: string;
}

export const Button: FC<Props> = ({
	loading,
	disabled,
	iconName,
	buttonText,
	onClick,
	className,
	...props
}) => {
	return (
		<PrimeReactButton
			onClick={onClick}
			disabled={loading || disabled}
			className={`${className} border-none bg-primary-500`}
			{...props}
		>
			<div className="w-full flex flex-row items-center justify-center gap-2">
				{loading ? (
					<Icon name="loader" width="20" color="white" />
				) : (
					<>
						{iconName && (
							<div>
								<Icon name={iconName} width="25" color="white" />
							</div>
						)}
						{buttonText}
					</>
				)}
			</div>
		</PrimeReactButton>
	);
};
