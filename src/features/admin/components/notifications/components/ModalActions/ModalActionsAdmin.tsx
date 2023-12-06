import { Button } from "@/components/ui/Button";

import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";

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
}

export const ModalActionsAdmin: FC<ModalActionsProps> = ({
	onOpenApproved,
	handleViewOnly,
}) => {
	return (
		<div className="flex gap-2 relative">
			<div className="text-gray-1000 text-[14px] cursor-pointer ">
				<Button
					icon={<Icon name="openEye" color="#0085ff" width="20" />}
					buttonText="View Only"
					className=" rounded-3xl border-2 border-blue-200 bg-blue-70 text-blue-200"
					onClick={handleViewOnly}
				/>
			</div>

			<div className="cursor-pointer">
				<Button
					buttonText="Reapproved"
					className=" rounded-3xl bg-green-900 text-green-500"
					onClick={onOpenApproved}
				/>
			</div>
		</div>
	);
};
