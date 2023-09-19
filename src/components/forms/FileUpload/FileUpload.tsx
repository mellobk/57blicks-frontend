import { type ForwardRefRenderFunction, type InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Icon } from "@/components/ui/Icon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: any;
	label?: string;
	register?: UseFormRegisterReturn;
	wrapperClassName?: string;
}

export const FileUpload: ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = ({
	error,
	className = `placeholder-gray-400 focus:outline-none ${
		error ? "text-red-ERROR bg-gray-100" : "bg-gray-200"
	} font-normal font-weight-400 leading-normal tracking-wide flex w-full h-10 p-4 items-center self-stretch rounded-md`,
	label,
	required,
	register,
	wrapperClassName,
	...props
}) => {
	return (
		<div className={`flex flex-col gap-2 ${wrapperClassName}`}>
			{label && (
				<div className="font-semibold text-gray-600">
					<div>
						{label} {required && <span className="text-red-ERROR">*</span>}
					</div>
				</div>
			)}

			<div className="relative">
				<div
					className="absolute top-0 right-2 bottom-0 flex items-center justify-center"
					data-testid="icon"
				>
					<Icon name="upload" width="16" color="#B0B4BA" />
				</div>

				<input className={`${className} pr-[30px]`} {...props} {...register} />
			</div>

			{error && (
				<div
					className={classNames(
						"text-red-ERROR",
						"leading-normal tracking-tight"
					)}
				>
					{error}
				</div>
			)}
		</div>
	);
};
