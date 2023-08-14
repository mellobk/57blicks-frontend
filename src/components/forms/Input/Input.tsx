import IconTemplate from "../../../assets/icons/icons";
import "./Input.css";
import type { UseFormRegister, FieldValues } from "react-hook-form";

type Props = {
	label?: string;
	placeHolder?: string;
	required?: boolean;
    error?: string;
	iconName?: string;
	register?: UseFormRegister<FieldValues>;
};

export const Input: React.FC<Props> = ({
	label,
	placeHolder,
	error,
	register,
	iconName,
    required,
}: Props) => {

	return (
		<div className="input-container">
			<div className="input-label">
				{label} {required && <span className="input-required">*</span>}
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
					className={ error ? 'input-error' : ''}
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
            {error &&  <div className="input-error-message">{error}</div>}
		</div>
	);
};
