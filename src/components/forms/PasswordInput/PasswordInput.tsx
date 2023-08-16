import { useState } from "react";
import IconTemplate from "../../../assets/icons/icons";
import type { UseFormRegister, FieldValues } from "react-hook-form";
import { classNames } from "primereact/utils";

interface PasswordValidations {
	message?: string;
	complete?: boolean;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	placeHolder?: string;
	required?: boolean;
	error?: string;
	iconName?: string;
	register?: UseFormRegister<FieldValues>;
	passWordValidations?: Array<PasswordValidations>;
}

export const PasswordInput: React.ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = ({
	label,
	placeHolder,
	error,
	register,
	iconName,
	required,
	passWordValidations,
}) => {
	const [changeType, setChangeType] = useState<string>("password");
	const [changeIcon, setChangeIcon] = useState<string>("closeEye");

	const changeTypeHandler = (): void => {
		setChangeType(changeType === "password" ? "text" : "password");
		setChangeIcon(changeIcon === "closeEye" ? "openEye" : "closeEye");
	};

	const renderPasswordsValidations = (
		message: string,
		complete: boolean
	): JSX.Element => {
		return (
			<div className="flex gap-1 items-center">
				<div
					className={` w-2 h-2 rounded-full ${
						complete ? " bg-red-ERROR" : " opacity-10 bg-red-ERROR"
					}`}
				>
					{" "}
				</div>{" "}
				{message && (
					<div className={classNames("font-weight-600", "text-gray-600")}>
						{message}
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-between font-semibold text-gray-600 ">
				<div>
					{label} {required && <span className="text-red-ERROR">*</span>}
				</div>
				<div className="flex gap-1 items-center">
					Bad{" "}
					<div className="flex gap-1 items-center">
						{passWordValidations?.map((data) => {
							return renderPasswordsValidations("", data.complete || false);
						})}
					</div>
				</div>
			</div>
			<div className="relative">
				{iconName && (
					<div
						className="absolute top-0 right-2 bottom-0 flex items-center justify-center"
						onClick={changeTypeHandler}
					>
						<IconTemplate name={changeIcon} width="20" color={"#000"} />
					</div>
				)}
				<input
					className={classNames(
						error ? "text-red-ERROR bg-gray-100 " : "bg-gray-200",
						"focus:outline-none",
						"placeholder-gray-400 font-normal font-weight-400 leading-normal tracking-wide flex w-full h-10 p-4 items-center self-stretch rounded-md"
					)}
					data-testid="input"
					data-test-label={label}
					data-test-placeholder={placeHolder}
					data-test-error={error}
					data-test-register={register}
					data-test-input-type="password"
					type={changeType}
					placeholder={placeHolder}
					{...register}
				/>
			</div>

			<div className="input-strength-footer">
				{passWordValidations?.map((data) => {
					return renderPasswordsValidations(
						data.message || "",
						data.complete || false
					);
				})}
			</div>
			{error && (
				<div className={classNames("font-weight-400", "text-red-ERROR")}>
					{error}
				</div>
			)}
		</div>
	);
};
