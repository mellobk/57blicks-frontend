import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";
import {
	LedgerTypeOfPayment,
	type Ledger,
	ApprovalStateType,
} from "../../types";

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
	if (
		((dataLedgers?.typeOfPayment === LedgerTypeOfPayment.INTEREST &&
			dataLedgers?.credit > 0) ||
			dataLedgers?.typeOfPayment === LedgerTypeOfPayment.PRINCIPAL) &&
		/*|| dataLedgers?.typeOfPayment === LedgerTypeOfPayment.LATE_FEE*/ dataLedgers?.editable ===
			false &&
		dataLedgers.approvalState === ApprovalStateType.APPROVED
	) {
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
