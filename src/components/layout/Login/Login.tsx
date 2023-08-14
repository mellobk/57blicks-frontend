import "./Login.css";

type Props = {
	children?: React.ReactNode;
};

export const LoginLayout: React.FC<Props> = ({ children }: Props) => {
	return (
		<div className="Login-layout-container">
			<div className="Login-layout-content-container">{children}</div>
            <div className="Login-layout-footer-container">All right reserved / © DKC Lending</div>
		</div>
	);
};