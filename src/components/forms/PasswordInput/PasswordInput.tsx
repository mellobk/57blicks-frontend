import { forwardRef, useEffect, useState } from "react";
import IconTemplate from "../../../assets/icons/icons";
import type { UseFormRegisterReturn } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Icon } from "@/components/ui/Icon";
import type { PasswordValidations } from "@/features/Login/types/validations";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	placeholder?: string;
	required?: boolean;
	error?: string;
	register?: UseFormRegisterReturn;
	passWordValidations?: Array<PasswordValidations>;
	disabled?: boolean;
	defaultValue?: string;
}

const PasswordInputComponent: React.ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = (
	{
		label,
		placeholder,
		error,
		register,
		required,
		passWordValidations,
		disabled = false,
		defaultValue,
		...props
	},
	ref
) => {
	const [changeType, setChangeType] = useState<string>("password");
	const [changeIcon, setChangeIcon] = useState<string>("closeEye");
	const [statusLabel, setStatusLabel] = useState<string>("Bad");
	const [statusColor, setStatusColor] = useState<string>("bg-red-ERROR");

	const changeTypeHandler = (): void => {
		setChangeType(changeType === "password" ? "text" : "password");
		setChangeIcon(changeIcon === "closeEye" ? "openEye" : "closeEye");
	};

	useEffect(() => {
		const validations =
			passWordValidations?.filter((data) => data.complete === true) || [];

		if (validations?.length <= 1) {
			setStatusLabel("Bad");
			setStatusColor("bg-red-ERROR");
		} else if (validations?.length === 2) {
			setStatusLabel("Good");
			setStatusColor("bg-gold-500");
		} else {
			setStatusLabel("Great");
			setStatusColor("bg-green-500");
		}
	}, [passWordValidations]);

	const renderPasswordsValidations = (
		message: string,
		complete: boolean,
		key: number
	): JSX.Element => {
		return (
			<div className="flex gap-1 items-center" key={key}>
				<div
					className={` w-2 h-2 rounded-full ${
						complete ? `${statusColor}` : `opacity-10 ${statusColor}`
					}`}
				>
					{" "}
				</div>{" "}
				{message && (
					<div className="font-semibold text-gray-600">{message}</div>
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
				{passWordValidations?.length ? (
					<div className="flex gap-1 items-center">
						{passWordValidations?.length && <div> {statusLabel} </div>}
						<div className="flex gap-1 items-center">
							{passWordValidations?.map((data, key) => {
								return renderPasswordsValidations(
									"",
									data.complete || false,
									key
								);
							})}
						</div>
					</div>
				) : null}
			</div>
			<div className="relative">
				<div
					className="absolute top-0 right-2 bottom-0 flex items-center justify-center"
					onClick={changeTypeHandler}
					data-testid="icon"
				>
					<Icon name={changeIcon} width="20" color={"#000"} />
				</div>
				<input
					ref={ref}
					{...register}
					{...props}
					defaultValue={defaultValue}
					className={classNames(
						error ? "text-red-ERROR bg-gray-100 " : "text-gray-400 bg-gray-200",
						"focus:outline-none",
						"flex w-full h-10 p-4 items-center self-stretch rounded-md"
					)}
					disabled={disabled}
					type={changeType}
					placeholder={placeholder}
				/>
			</div>

			{passWordValidations?.length ? (
				<div data-testid="input-strength-footer">
					{passWordValidations?.map((data, key) => {
						return renderPasswordsValidations(
							data.message || "",
							data.complete || false,
							key
						);
					})}
				</div>
			) : null}
			{error && <div className="text-red-ERROR">{error}</div>}
		</div>
	);
};

export const PasswordInput = forwardRef(PasswordInputComponent);
