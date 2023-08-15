import { useState } from "react";
import IconTemplate from "../../../assets/icons/icons";
import "./PasswordInput.css";
import type { UseFormRegister, FieldValues } from "react-hook-form";

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
			<div className="input-strength-container">
				<div
					className={`${
						complete
							? "input-error-circle-complete"
							: "input-error-circle-incomplete"
					}`}
				>
					{" "}
				</div>{" "}
				{message && <div className="input-strengh-text">{message}</div>}
			</div>
		);
	};

	return (
		<div className="input-container">
			<div className="input-label">
				<div>
					{label} {required && <span className="input-required">*</span>}
				</div>
				<div className="input-strength-header-container">
					Bad{" "}
					<div className="input-strength-header">
						{passWordValidations?.map((data) => {
							return renderPasswordsValidations("", data.complete || false);
						})}
					</div>
				</div>
			</div>
			<div className="input-field">
				{iconName && (
					<div className="input-icon" onClick={changeTypeHandler}>
						<IconTemplate name={changeIcon} width="20" color={"#000"} />
					</div>
				)}
				<input
					className={error ? "input-error" : ""}
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
					return renderPasswordsValidations(data.message || "", data.complete || false);
				})}
			</div>
			{error && <div className="input-error-message">{error}</div>}
		</div>
	);
};
