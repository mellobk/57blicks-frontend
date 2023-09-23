import "./Modal.css";

import { FC, ReactNode } from "react";

import { Dialog } from "primereact/dialog";

interface LoginTitleProps {
	minHeight?: string;
	width?: string;
	onHide?: () => void;
	visible?: boolean;
	children?: ReactNode;
	title?: string | ReactNode;
}

export const Modal: FC<LoginTitleProps> = ({
	minHeight,
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
				onHide={() => onHide?.()}
				style={{ width: width, minHeight: minHeight }}
				breakpoints={{ "960px": "75vw", "641px": "100vw" }}
			>
				<div className="h-[1px] bg-gray-1100 mb-6"></div>
				{children}
			</Dialog>
		</div>
	);
};
