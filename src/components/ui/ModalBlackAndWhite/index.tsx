import type { FC, ReactNode } from "react";

import { Dialog } from "primereact/dialog";

interface ModalBlackAndWhiteProps {
	isOpen: boolean;
	title?: string | ReactNode;
	showBlack?: boolean;
	setShowBlack?: (showBlack: boolean) => void;
	setIsOpen: (isOpen: boolean) => void;
	width?: string;
	minHeight?: string;
	children: ReactNode;
}
export const ModalBlackAndWhite: FC<ModalBlackAndWhiteProps> = ({
	isOpen,
	setIsOpen,
	width = "70vh",
	minHeight = "500px",
	title,
	showBlack = false,
	children,
}) => {
	return (
		<div className="card flex justify-content-center ">
			<Dialog
				header={isOpen}
				visible={isOpen}
				onHide={(): void => {
					setIsOpen(false);
				}}
				style={{
					width: width,
					minHeight: minHeight,
				}}
				breakpoints={{ "960px": "75vw", "641px": "100vw" }}
			>
				<div className="bg-black w-full h-full absolute top-0 left-0  ">
					{/* {showBlack && (
						<div
							className="absolute w-[33px] h-[33px] right-[80px] bg-gray-1300 rounded-full top-[25px] pt-[9px] pl-[8px] cursor-pointer hover:bg-gray-1350 z-10"
							onClick={(): void => {
								setShowBlack?.(false);
							}}
						>
							<Icon color="#fff" name="arrowLeft" width="15" />
						</div>
					)} */}
					{showBlack && (
						<div
							className={`${
								showBlack
									? "translate-x-0 opacity-100"
									: " translate-x-full opacity-0"
							} transition ease-in duration-300  w-1/2 h-full  absolute top-0 right-0 bg-black`}
						>
							<div className="pt-[45px] m-4"></div>
						</div>
					)}

					<div className=" w-full  absolute top-0 left-0 m-4 text-xl font-semibold ">
						{title}
					</div>

					<div className="flex h-full">
						<div className={` w-full  h-full bg-white`}>
							<div className="pt-[45px] m-4 ">
								{children}
								<div className="pt-[40px] m-4"></div>
							</div>
						</div>
					</div>
				</div>

				<div className="h-[1px] bg-gray-1100 mb-6"></div>
			</Dialog>
		</div>
	);
};
