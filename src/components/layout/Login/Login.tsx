import { classNames } from "primereact/utils";
import "./Login.css";

type Props = {
	children?: React.ReactNode;
};

export const LoginLayout: React.FC<Props> = ({ children }: Props) => {
	return (
		<div className={classNames("Login-layout-container", `bg-blue`)}>
			<div className={classNames("Login-layout-content-container", `bg-white`)}>{children}</div>
            <div className={classNames("Login-layout-footer-container", `text-white`)}>All right reserved / © DKC Lending</div>
		</div>
	);
};