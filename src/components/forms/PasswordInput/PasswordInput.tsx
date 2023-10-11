import {
	forwardRef,
	type ForwardRefRenderFunction,
	type InputHTMLAttributes,
	type ReactElement,
	useEffect,
	useState,
} from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { ErrorText } from "@/components/forms/ErrorText";
import { Label } from "@/components/forms/Label";
import { Icon, type ICONS } from "@/components/ui/Icon";
import type { PasswordValidations } from "@/features/auth/types/validations";
import { inputClassName } from "@/utils/class-names.ts";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: any;
	register?: UseFormRegisterReturn;
	passWordValidations?: Array<PasswordValidations>;
}

const PasswordInputComponent: ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = (
	{ label, error, register, required, passWordValidations, ...props },
	ref
) => {
	const [changeType, setChangeType] = useState<string>("password");
	const [changeIcon, setChangeIcon] = useState<keyof typeof ICONS>("closeEye");
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
	): ReactElement => {
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
				<Label label={label} required={required} />

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
					className={inputClassName(error)}
					type={changeType}
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

			<ErrorText error={error} />
		</div>
	);
};

export const PasswordInput = forwardRef(PasswordInputComponent);
