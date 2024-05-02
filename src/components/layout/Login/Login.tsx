import type { FC, ReactNode } from "react";
import "./Login.css";
import NetflixLogo from "@/assets/images/svg/netflix-logo";

type Props = {
	children?: ReactNode;
};

export const LoginLayout: FC<Props> = ({ children }) => {
	return (
		<div className="flex justify-center bg-cover bg-center w-screen h-screen box-border p-6 overflow-auto Login-layout-container">
			<div
				className="flex flex-col  items-center justify-center gap-7 p-6 rounded-lg bg-white"
				style={{ width: "23.3rem" }}
			>
				<div className="flex w-full flex-col justify-center items-center mt-[1.5rem]">
					<NetflixLogo />
				</div>
				<hr className=" w-full" />
				{children}
			</div>
		</div>
	);
};
