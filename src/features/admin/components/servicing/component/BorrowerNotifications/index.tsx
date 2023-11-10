import { useState, type FC } from "react";
import { Icon } from "@/components/ui/Icon";
import type { FundingBreakdown } from "@/features/admin/components/servicing/types/api";
import { Modal } from "@/components/ui/Modal";
import SingleBorrowerNotification from "./SingleBorrorerNotification";

interface SendCommunicationsProps {
	single: boolean;
	data?: FundingBreakdown;
}

const BorrowerNotifications: FC<SendCommunicationsProps> = ({
	single,
	data,
}) => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	return (
		<div>
			<div
				className={`absolute w-8 h-8 bg-green-800 rounded-full mr-4  align-middle  pt-[8px] pl-[12px] cursor-pointer z-10`}
				style={{
					right: "100px",
					top: "25px",
				}}
				onClick={(): void => {
					setOpenModal(true);
				}}
			>
				<Icon name="send" color={"#00BA35"} width="12" height="13" />
			</div>

			<Modal
				visible={openModal}
				title="Send Notification"
				width="860px"
				minHeight="500px"
				className="relative"
				onHide={(): void => {
					setOpenModal(false);
				}}
			>
				{single ? (
					<>
						{data && data.loan && (
							<SingleBorrowerNotification
								loan={data.loan}
								callBack={(): void => {
									setOpenModal(false);
								}}
							/>
						)}
					</>
				) : (
					<></>
				)}
			</Modal>
		</div>
	);
};

export default BorrowerNotifications;
