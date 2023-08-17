
import "./Login.css";
import Logo from '../../../assets/images/png/Logo.png'

type Props = {
	children?: React.ReactNode;
};

export const LoginLayout: React.FC<Props> = ({ children }: Props) => {
	return (
		<div className="flex justify-between bg-cover bg-center w-screen h-screen box-border p-6 overflow-auto Login-layout-container"
		data-testid="login-layout-container">
			<div className="flex flex-col justify-center items-center gap-7 w-56 p-6 rounded-lg bg-white" style={{width: '21.875rem'}}>
				 <div className="flex w-full flex-col items-center">
					<img className="w-1/2" src={Logo} alt="" />
				 </div>
				 <hr className=" w-full"/>
				{children}
			</div>
			<div
				className="flex items-end text-white"
			>
				All right reserved / © DKC Lending
			</div>
		</div>
	);
};
