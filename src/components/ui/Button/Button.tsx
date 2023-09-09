import type { FC, ReactElement } from "react";
import {
	Button as PrimeReactButton,
	type ButtonProps,
} from "primereact/button";
import { Icon } from "@/components/ui/Icon";

interface Props extends ButtonProps {
	buttonText?: string | ReactElement;
	className?: string;
	deepClassName?: string;
	disabled?: boolean;
	loading?: boolean;
	onClick?: () => void;
}

export const Button: FC<Props> = ({
	buttonText,
	className,
	deepClassName = "w-full flex flex-row items-center justify-center gap-1",
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
			<div className={deepClassName}>
				{loading ? (
					<Icon name="loading" width="20" color="white" />
				) : (
					<div className="flex flex-row">
						{icon && <div className="pr-2"><>{icon}</></div>}
						{buttonText && <>{buttonText}</>}
					</div>
				)}
			</div>
		</PrimeReactButton>
	);
};
