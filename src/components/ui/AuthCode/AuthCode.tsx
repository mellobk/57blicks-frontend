import { useRef } from "react";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import AuthCode, { AuthCodeRef } from "react-auth-code-input";

interface AuthenticateProps {
	handleOnChange: (result: string) => string;
	required?: boolean;
	title?: string;
}

export const AuthenticateCode: React.FC<AuthenticateProps> = ({
	handleOnChange,
	required,
	title,
}) => {
	const AuthInputRef = useRef<AuthCodeRef>(null);
	return (
		<div className="flex flex-col gap-2">
			<div className="font-semibold text-gray-600 ">
				<div>
					{title} {required && <span className="text-red-ERROR">*</span>}
				</div>
			</div>
			<AuthCode
				ref={AuthInputRef}
				onChange={(result): string => handleOnChange(result)}
				containerClassName="flex gap-2 justify-between"
				inputClassName="w-10 h-10 text-24 text-center  border bg-gray-200 rounded-[0.3125rem]"
			/>
		</div>
	);
};
