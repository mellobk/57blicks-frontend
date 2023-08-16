import { classNames } from "primereact/utils";
import IconTemplate from "../../../assets/icons/icons";
import type { UseFormRegister, FieldValues } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	placeHolder?: string;
	required?: boolean;
	error?: string;
	iconName?: string;
	register?: UseFormRegister<FieldValues>;
}

export const Input: React.ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = ({ label, placeHolder, error, register, iconName, required }) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="font-semibold text-gray-600 ">
				<div>
					{label} {required && <span className="text-red-ERROR">*</span>}
				</div>
			</div>
			<div className="relative">
				{iconName && (
					<div className="absolute top-0 right-2 bottom-0 flex items-center justify-center">
						<IconTemplate
							name={iconName || "search"}
							width="20"
							color={"#000"}
						/>
					</div>
				)}
				<input
					className={classNames(
						error
							? "text-red-ERROR bg-gray-100 "
							: "bg-gray-200", "focus:outline-none",
							"placeholder-gray-400 font-normal font-weight-400 leading-normal tracking-wide flex w-full h-10 p-4 items-center self-stretch rounded-md"
					)}
					data-testid="input"
					data-test-label={label}
					data-test-placeholder={placeHolder}
					data-test-error={error}
					data-test-register={register}
					data-test-input-type="text"
					type="text"
					placeholder={placeHolder}
					{...register}
				/>
			</div>
			{error && (
				<div className={classNames("font-weight-400", "text-red-ERROR", "font-normal font-weight-400 leading-normal tracking-tight")}>
					{error}
				</div>
			)}
		</div>
	);
};
