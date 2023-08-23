import { useEffect, useState } from "react";
import IconTemplate from "../../../assets/icons/icons";
import type { UseFormRegisterReturn } from "react-hook-form";
import { classNames } from "primereact/utils";
import type { PasswordValidations } from "@/features/Login/types/validations";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	title?: string;
	placeholder?: string;
	required?: boolean;
	error?: string;
	register?: UseFormRegisterReturn<any>;
	passWordValidations?: Array<PasswordValidations>;
	disabled?: boolean;
	defaultValue?: string;
}

export const PasswordInput: React.ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = ({
	title,
	placeholder,
	error,
	register,
	required,
	passWordValidations,
	disabled = false,
	defaultValue,
}) => {
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
					{title} {required && <span className="text-red-ERROR">*</span>}
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
					<IconTemplate name={changeIcon} width="20" color={"#000"} />
				</div>
				<input
					defaultValue={defaultValue}
					className={classNames(
						error ? "text-red-ERROR bg-gray-100 " : "bg-gray-200",
						"focus:outline-none",
						"placeholder-gray-400 font-normal font-weight-400 leading-normal tracking-wide flex w-full h-10 p-4 items-center self-stretch rounded-md"
					)}
					disabled={disabled}
					type={changeType}
					placeholder={placeholder}
					{...register}
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
			{error && (
				<div className={classNames("font-weight-400", "text-red-ERROR")}>
					{error}
				</div>
			)}
		</div>
	);
};
