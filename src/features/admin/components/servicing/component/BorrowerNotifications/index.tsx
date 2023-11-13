import { useState, type FC } from "react";
import { Icon } from "@/components/ui/Icon";
import type { FundingBreakdown } from "@/features/admin/components/servicing/types/api";
import { Modal } from "@/components/ui/Modal";
import { ModalBlackAndWhite } from "@/components/ui/ModalBlackAndWhite";
import SingleBorrowerNotification from "./SingleBorrowerNotification";
import MultipleBorrowerNotification from "./MultipleBorrowerNotification";
interface SendCommunicationsProps {
	single: boolean;
	data?: FundingBreakdown;
	top: string;
	right: string;
	className: string;
}

const BorrowerNotifications: FC<SendCommunicationsProps> = ({
	single,
	top,
	right,
	data,
	className,
}) => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [showBlack, setShowBlack] = useState<boolean>(false);
	const [width, setWidth] = useState<string>(showBlack ? "1200px" : "600px");
	return (
		<div>
			<div
				className={`${className} w-8 h-8  bg-green-800 rounded-full mr-4  align-middle  pt-[8px] pl-[12px] cursor-pointer z-10`}
				style={{
					right,
					top,
				}}
				onClick={(): void => {
					setOpenModal(true);
				}}
			>
				<Icon name="send" color={"#00BA35"} width="12" height="13" />
			</div>

			<ModalBlackAndWhite
				isOpen={openModal}
				title="Send Notification"
				showBlack={showBlack}
				setShowBlack={setShowBlack}
				width={width}
				minHeight="600px"
				setIsOpen={setOpenModal}
			>
				{single ? (
					<>
						{data && data.loan && (
							<SingleBorrowerNotification
								loan={data.loan}
								width={width}
								setWidth={setWidth}
								showBlack={showBlack}
								setShowBlack={setShowBlack}
								callBack={(): void => {
									setOpenModal(false);
								}}
							/>
						)}
					</>
				) : (
					<>
						<MultipleBorrowerNotification
							width={width}
							setWidth={setWidth}
							showBlack={showBlack}
							setShowBlack={setShowBlack}
							callBack={(): void => {
								setOpenModal(false);
							}}
						/>
					</>
				)}
			</ModalBlackAndWhite>
		</div>
	);
};

export default BorrowerNotifications;
