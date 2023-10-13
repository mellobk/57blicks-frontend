import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/utils/cn";
import type { ReactElement } from "react";

export const buttonVariants = cva(
	"inline-flex items-center justify-center   disabled:pointer-events-none disabled:opacity-50 bg-gray-250 text-white rounded-lg transition-colors	transition-duration: 250ms",
	{
		variants: {
			variant: {
				primary: "text-base",
				gold: "bg-gold-500/[.12] text-gold-500 rounded-2xl pl-4 pr-4  hover:bg-gold-350 font-semibold",
				gray: "bg-gray-200 rounded-2xl text-primary pl-4 pr-4  hover:bg-primary hover:text-white font-semibold",
				white:
					"bg-white text-primary border border-primary rounded-2xl pl-4 pr-4  hover:bg-primary hover:text-white font-semibold p-2 font-bold",
				danger: "",
				success: "",
				info: "",
				outline: "",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				primary: "h-8",
				small: "h-8 text-[13px] ",
				large: "h-12 ",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "small",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	buttonText?: string | ReactElement;
	deepClassName?: string;
	iconColor?: string;
	disabled?: boolean;
	loading?: boolean;
	icon?: string | ReactElement;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			children,
			loading,
			buttonText,
			iconColor,
			deepClassName,
			asChild = false,
			icon,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : "button";

		return (
			<Comp
				className={cn(
					buttonVariants({
						variant,
						size,
						className: `${className} ${deepClassName}`,
					})
				)}
				ref={ref}
				//change children
				children={
					<>
						{loading ? (
							<div className="flex flex-row ">
								<Icon name="loading" width="20" color={iconColor} />
							</div>
						) : (
							<div className="flex flex-row align-middle items-center">
								{icon && (
									<div className="pr-2 ">
										<>{icon}</>
									</div>
								)}
								{buttonText && <>{buttonText}</>} {children}
							</div>
						)}
					</>
				}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button };
