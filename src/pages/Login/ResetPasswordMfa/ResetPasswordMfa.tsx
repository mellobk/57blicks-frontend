import { Mfa } from "@/features/Login/components/Mfa";

export const ResetPasswordMfa: React.FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<Mfa title="Reset Password" buttonText="Continue" />
		</div>
	);
};
