import { LoginForm } from "@/features/Login/components/Login";

export const Login: React.FC = () => {
	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<LoginForm />
		</div>
	);
};
