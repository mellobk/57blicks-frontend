import type { FC } from "react";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Icon } from "@/components/ui/Icon";
import {
	LedgerTypeOfPayment,
	type Ledger,
	ApprovalStateType,
} from "../../types";

interface EditLedgerProps {
	dataLedgers?: Ledger;
	index: number;
	handleEdit: (
		field: string,
		value: string | number | boolean,
		index: number
	) => void;
}

const EditLedger: FC<EditLedgerProps> = ({
	dataLedgers,
	index,
	handleEdit,
}) => {
	if (
		(dataLedgers?.typeOfPayment === LedgerTypeOfPayment.INTEREST ||
			dataLedgers?.typeOfPayment === LedgerTypeOfPayment.PRINCIPAL ||
			dataLedgers?.typeOfPayment === LedgerTypeOfPayment.LATE_FEE) &&
		dataLedgers?.editable === false &&
		dataLedgers.approvalState === ApprovalStateType.APPROVED
	) {
		return <></>;
	}

	return (
		<>
			<div
				key={`edit-${index}`}
				onClick={(): void => {
					handleEdit(`editable`, !dataLedgers?.editable, index);
				}}
			>
				{dataLedgers && (
					<Icon
						name={dataLedgers.editable ? "deleteBack" : "pencil"}
						color={dataLedgers.editable ? "red" : "gray"}
						width="14"
					/>
				)}
			</div>
		</>
	);
};

export default EditLedger;
