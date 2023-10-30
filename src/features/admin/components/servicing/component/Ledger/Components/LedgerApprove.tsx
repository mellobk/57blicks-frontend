import { ApprovalStateType, type Ledger } from "../types";

import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";
import { getLocalStorage } from "@/utils/local-storage";
import { group } from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import ManageLedgerService from "@/features/admin/components/servicing/api/ledger";
import moment from "moment";

interface LedgerApproveProps {
	ledger: Ledger;
	refetchLedgers?: () => void;
}
let userGroup = getLocalStorage(group);
userGroup = userGroup?.replace(/"/g, "");
const LedgerApprove: FC<LedgerApproveProps> = ({ ledger, refetchLedgers }) => {
	const createLedger = useMutation(
		(data: Ledger) => {
			return ManageLedgerService.changeStatusLedger(data);
		},
		{
			onSuccess: (data) => {
				if (data) {
					refetchLedgers && refetchLedgers();
				}
			},
		}
	);

	const handleApprove = (approved: boolean): void => {
		const status = approved
			? ApprovalStateType.APPROVED
			: ApprovalStateType.REJECTED;

		const date = moment(ledger.ledgerDate, "MMDDYYYY").format("YYYY-MM-DD");

		createLedger.mutate({
			...ledger,
			ledgerDate: date,
			approvalState: status,
		});
	};

	if (userGroup !== "super-admin") return;
	return (
		<>
			{ledger.approvalState === ApprovalStateType.PENDING ? (
				<>
					<div
						onClick={(): void => {
							handleApprove(true);
						}}
					>
						<Icon name="ok" color="green" width="20" />
					</div>
					<div
						onClick={(): void => {
							handleApprove(false);
						}}
					>
						<Icon name="close" color="red" width="20" />
					</div>
				</>
			) : (
				<>
					<div>
						<Icon name="ok" color="white" width="20" />
					</div>
					<div>
						<Icon name="ok" color="white" width="20" />
					</div>
				</>
			)}
		</>
	);
};

export default LedgerApprove;
