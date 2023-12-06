/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { ErrorText } from "@/components/forms/ErrorText";
import { Icon } from "@/components/ui/Icon";
import { inputClassName } from "@/utils/class-names";
import "./styles.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: any;
	label: string;
	register?: any;
	wrapperClassName?: string;
}

export const FileUpload: ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = ({
	error,
	className = inputClassName(error),
	label,
	required,
	register,
	wrapperClassName,
	...props
}) => (
	<div className={`flex flex-col gap-2 ${wrapperClassName}`}>
		
		<div className="relative">
			<div
				className="absolute top-0 right-2 bottom-0 flex items-center justify-center"
				data-testid="icon"
			>
				<Icon name="upload" width="16" color="#B0B4BA" />
			</div>

			<input
				className={`${className} pr-[30px]`}
				type="file"
				{...props}
				{...register}
			/>
		</div>

		<ErrorText error={error} />
	</div>
);
