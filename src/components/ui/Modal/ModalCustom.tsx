import "./Modal.css";

import { FC, ReactNode } from "react";

import { Icon } from "../Icon";

interface ModalProps {
	minHeight?: string;
	width?: string;
	visible?: boolean;
	children?: ReactNode;
	title?: string | ReactNode;
	onHide: () => void;
}

export const ModalCustom: FC<ModalProps> = ({
	minHeight,
	width = "50vw",
	visible,
	children,
	title,
	onHide,
}) => {
	if (!visible) return null;

	const modalStyle = {
		width: width || "400px", // Default width if not provided
		minHeight: minHeight || "200px", // Default minHeight if not provided
		margin: "100px",
	};

	return (
		<>
			<div className="fixed inset-0 flex items-center justify-center z-50">
				<div className="fixed inset-0 bg-black opacity-50"></div>
				<div
					className="z-50 rounded-lg shadow-md  relative bg-white"
					style={modalStyle}
				>
					<div
						className="absolute cursor-pointer top-6 right-8 text-gray-500 hover:text-gray-700 rounded-full bg-gray-200 w-8 h-8  flex items-center justify-center"
						onClick={(): void => {
							onHide();
						}}
					>
						<Icon name="close" width="14" color="#656A74" />
					</div>
					<div className="p-4">{title}</div>
					<div className="p-4 bg-gray-50 w-full">{children}</div>
				</div>
			</div>
		</>
	);
};
