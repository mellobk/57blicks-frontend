import { Approved } from "../Approved/Approved";
import { Button } from "@/components/ui/Button";
import { Decline } from "../Decline/Decline";
import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { NotificationType } from "@/types/api/notifications.ts";

interface ModalActionsProps {
	type?: string;
	onSuccess?: () => void;
	onDecline?: () => void;
	onOpenApproved?: () => void;
	onOpenDecline?: () => void;
	openApproved?: boolean;
	openDecline?: boolean;
	status?: string;
	handleViewOnly?: () => void;
	viewOnly?: boolean;
	comment?: JSX.Element | null;
	validApprove?: boolean;
}

export const ModalActions: FC<ModalActionsProps> = ({
	type,
	onSuccess,
	onDecline,
	onOpenApproved,
	onOpenDecline,
	openDecline,
	openApproved,
	handleViewOnly,
	comment,
	validApprove = true,
	viewOnly = true,
}) => {
	const typeData = type === NotificationType.LOAN ? " Loan" : "Ledger";
	return (
		<div className="flex gap-2 relative">
			{viewOnly && (
				<div className="text-gray-1000 text-[14px] cursor-pointer ">
					<Button
						icon={<Icon name="openEye" color="#0085ff" width="20" />}
						buttonText="View Only"
						className=" rounded-3xl border-2 border-blue-200 bg-blue-70 text-blue-200"
						onClick={handleViewOnly}
					/>
				</div>
			)}

			<>
				<div className="cursor-pointer">
					<Button
						buttonText="Approve"
						disabled={!validApprove}
						className=" rounded-3xl bg-green-900 text-green-500"
						onClick={onOpenApproved}
					/>
				</div>

				<div className="cursor-pointer">
					<Button
						buttonText="Decline"
						className=" rounded-3xl bg-red-200 text-red-500"
						onClick={onOpenDecline}
					/>
				</div>
			</>
			<Modal
				visible={openApproved}
				onHide={onOpenApproved}
				title={`Approve ${typeData}`}
				width="30vw"
			>
				<Approved text={`this ${typeData}`} handleDeleteUser={onSuccess} />
			</Modal>

			<Modal
				visible={openDecline}
				onHide={onOpenDecline}
				title={`Decline ${typeData}`}
				width="30vw"
			>
				<div className="flex flex-col gap-7">
					<Decline text={`this ${typeData}`} handleDeleteUser={onDecline} />
					{comment}
				</div>
			</Modal>
		</div>
	);
};
