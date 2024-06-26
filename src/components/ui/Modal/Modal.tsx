import "./Modal.css";

import type { FC, ReactNode } from "react";

import { Dialog } from "primereact/dialog";

export interface ModalProps {
	children?: ReactNode;
	minHeight?: string;
	onHide?: () => void;
	title?: string | ReactNode;
	visible?: boolean;
	width?: string;
	footer?: ReactNode;
	className?: string;
}

export const Modal: FC<ModalProps> = ({
	children,
	minHeight,
	onHide,
	title,
	visible,
	width = "50vw",
	footer,
	className,
}) => {
	return (
		<div className="card flex justify-content-center">
			<Dialog
				header={title}
				visible={visible}
				onHide={() => onHide?.()}
				style={{ width, minHeight }}
				breakpoints={{ "960px": "75vw", "641px": "100vw" }}
				className={className}
			>
				<div className="h-[1px] bg-gray-1100 mb-6"></div>
				{children}
				{footer}
			</Dialog>
		</div>
	);
};
