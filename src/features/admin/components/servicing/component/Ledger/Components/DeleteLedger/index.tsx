import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";
import type {
	/* 	LedgerTypeOfPayment, */
	Ledger,
	/* 	ApprovalStateType, */
} from "../../types";
import userStore from "@/stores/user-store";
import { RoleType } from "@/types/api/permissions-type";

interface DeleteLedgerProps {
	dataLedgers?: Ledger;
	index: number;
	setSelectedIndex: (index: number) => void;
	setSelectedId: (id: string) => void;
	handleRemove: (index: number, id: string) => void;
	setOpenConfirmation: (value: boolean) => void;
}
const DeleteLedger: FC<DeleteLedgerProps> = ({
	dataLedgers,
	index,
	setSelectedIndex,
	setSelectedId,
	handleRemove,
	setOpenConfirmation,
}) => {
	const userInfo = userStore((state) => state.loggedUserInfo);
	/* if (
		((dataLedgers?.typeOfPayment === LedgerTypeOfPayment.INTEREST &&
			dataLedgers?.credit > 0) ||
			dataLedgers?.typeOfPayment === LedgerTypeOfPayment.PRINCIPAL) &&
		/*|| dataLedgers?.typeOfPayment === LedgerTypeOfPayment.LATE_FEE dataLedgers?.editable ===
			false &&
		dataLedgers.approvalState === ApprovalStateType.APPROVED
	) {
		return <></>;
	} */

	if (userInfo?.role?.name !== RoleType.SUPER_ADMIN) {
		return <></>;
	}

	return (
		<>
			<div
				key={`delete-${index}`}
				className="cursor-pointer"
				onClick={(): void => {
					setSelectedIndex(index);
					setSelectedId(dataLedgers?.id || "");
					if (dataLedgers?.action === "add") {
						handleRemove(index, `${dataLedgers.id}`);
					} else {
						setOpenConfirmation(true);
					}
				}}
			>
				<Icon name="trashBin" color="red" width="20" />
			</div>
		</>
	);
};

export default DeleteLedger;
