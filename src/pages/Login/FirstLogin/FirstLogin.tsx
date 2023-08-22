import { Mfa } from "@/features/Login/components/Mfa";

export const FirstLogin: React.FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full">
			<Mfa
				title="Welcome to DKC!"
				subTitle="We’ve sent a 6 digit code to your registered phone number."
				buttonText="Continue"
			/>
		</div>
	);
};
