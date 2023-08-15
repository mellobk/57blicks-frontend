import { classNames } from "primereact/utils";
import IconTemplate from "../../../assets/icons/icons";
import "./Input.css";
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
		<div className="input-container">
		<div className={classNames("input-label", 'text-gray-600')}>
				<div>
					{label} {required && <span className="text-red-ERROR">*</span>}
				</div>
			</div>
			<div className="input-field">
				{iconName && (
					<div className="input-icon">
						<IconTemplate
							name={iconName || "search"}
							width="20"
							color={"#000"}
						/>
					</div>
				)}
				<input
					className={classNames(
						error ? "text-red-ERROR bg-gray-100 " : "bg-gray-200"
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
			{error && <div className={classNames("input-error-message", 'text-red-ERROR')}>{error}</div>}
		</div>
	);
};
