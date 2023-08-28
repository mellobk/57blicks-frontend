import { ResetPasswordForm } from "@/features/Login/components/ResetPassword";

export const ResetPassword: React.FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<ResetPasswordForm />
		</div>
	);
};
