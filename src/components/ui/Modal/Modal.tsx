import "./Modal.css";

import { FC, ReactNode } from "react";

import { Dialog } from "primereact/dialog";

export interface ModalProps {
	children?: ReactNode;
	minHeight?: string;
	onHide?: () => void;
	title?: string | ReactNode;
	visible?: boolean;
	width?: string;
	footer?: ReactNode;
}

export const Modal: FC<ModalProps> = ({
	children,
	minHeight,
	onHide,
	title,
	visible,
	width = "50vw",
	footer,
}) => {
	return (
		<div className="card flex justify-content-center">
			<Dialog
				header={title}
				visible={visible}
				onHide={() => onHide?.()}
				style={{ width, minHeight }}
				breakpoints={{ "960px": "75vw", "641px": "100vw" }}
			>
				<div className="h-[1px] bg-gray-1100 mb-6"></div>
				{children}
				{footer}
			</Dialog>
		</div>
	);
};
