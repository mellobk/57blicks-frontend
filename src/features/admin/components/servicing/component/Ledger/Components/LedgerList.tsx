import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import type { FC } from "react";
import { LedgerComponent } from "./LedgerComponent";
import type { Ledgers } from "../types";
import Loading from "@/assets/icons/loading";
import type { Loan } from "@/features/admin/components/servicing/types/api";
import ManageLedgerService from "@/features/admin/components/servicing/api/ledger";
import { calculateBalance } from "../utils/calculate-balance";
import { dateWithFormat } from "@/utils/formats";

const orderLedgers = (): void => {};

interface LedgerListProps {
	loan: Loan;
}

const LedgerList: FC<LedgerListProps> = ({ loan }) => {
	console.log(loan, "data");

	const [ledgers, setLedgers] = useState<Array<Ledgers>>([]);

	const { refetch, isLoading } = useQuery(
		["leger-get-by-loan"],
		() => {
			return ManageLedgerService.getLedgerByLoanId(loan.id || "");
		},
		{
			onSuccess: (data) => {
				if (data && data?.length > 0) {
					const newData: Array<Ledgers> = [];
					data.forEach((item: Ledgers) => {
						console.log(
							"🚀 ~ file: LedgerList.tsx:34 ~ data.forEach ~ item:",
							item.month
						);

						const ledger: Ledgers = {
							id: item.id,
							ledgerDate:
								item.ledgerDate && dateWithFormat(item.ledgerDate, "MMDDYYYY"),
							month: item.month,
							typeOfPayment: item.typeOfPayment,
							typeOfPaymentDescription: item.typeOfPaymentDescription,
							type: item.type,
							memo: item.memo,
							debit: item.debit,
							credit: item.credit,
							balance: Number.parseInt(`${item.balance}`),
							approvalState: item.approvalState,
							new: false,
							editable: false,
							order: 0,
							action: "show",
						};
						newData.push(ledger);
					});

					setLedgers(calculateBalance(newData).ledgers);
				}
			},
		}
	);

	const refetchLedgers = (): void => {
		setLedgers([]);
		void refetch();
	};

	const deleteLedgerMutation = useMutation(
		(id: string) => {
			return ManageLedgerService.deleteLedger(id);
		},
		{
			onSuccess: () => {
				refetchLedgers();
			},
			onError: () => {
				refetchLedgers();
			},
		}
	);
	const handleDeleteLedger = (id: string): void => {
		deleteLedgerMutation.mutate(id);
	};

	useEffect(() => {}, [ledgers]);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<LedgerComponent
						loan={loan}
						ledgersData={ledgers}
						refetchLedgers={refetchLedgers}
						handleDeleteLedger={handleDeleteLedger}
						orderLedgers={orderLedgers}
					/>
				</>
			)}
		</>
	);
};

export { LedgerList };
