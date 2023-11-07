import type { FC, ReactNode } from "react";
import Logo from "@/assets/images/png/Logo.png";
import "./Login.css";

type Props = {
	children?: ReactNode;
};

export const LoginLayout: FC<Props> = ({ children }) => {
	return (
		<div
			className="flex justify-between bg-cover bg-center w-screen h-screen box-border p-6 overflow-auto Login-layout-container"
			data-testid="login-layout-container"
		>
			<div
				className="flex flex-col  items-center gap-7 p-6 rounded-lg bg-white"
				style={{ width: "23.3rem" }}
			>
				<div className="flex w-full flex-col items-center mt-[1.5rem]">
					<img className="w-1/2" src={Logo} alt="DKC Logo" />
				</div>
				<hr className=" w-full" />
				{children}
			</div>
			<div className="flex items-end text-white">
				All right reserved / © DKC Lending
			</div>
		</div>
	);
};
