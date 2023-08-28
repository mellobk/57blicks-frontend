import { Dialog } from "primereact/dialog";
import "./Modal.css";

interface LoginTitleProps {
	width?: string;
	onHide?: () => void;
	visible?: boolean;
	children?: React.ReactNode;
	title?: string;
}

export const Modal: React.FC<LoginTitleProps> = ({
	width = "50vw",
	onHide,
	visible,
	children,
	title,
}) => {
	return (
		<div className="card flex justify-content-center">
			<Dialog
				header={title}
				visible={visible}
				onHide={(): void => {
					if (onHide) {
						onHide();
					}
				}}
				style={{ width: width }}
				breakpoints={{ "960px": "75vw", "641px": "100vw" }}
			>
				<div className="h-[1px] bg-gray-1100 mb-6"></div>
				{children}
			</Dialog>
		</div>
	);
};
