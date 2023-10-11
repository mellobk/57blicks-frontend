import { useEffect, useState } from "react";

import type { FC } from "react";
import { LedgerComponent } from "./LedgerComponent";
import type { Ledgers } from "../types";
import ManageLedgerService from "@/features/servicing/api/ledger";
import { useQuery } from "@tanstack/react-query";

interface LedgerListProps {
	loan?: string;
}
const LedgerList: FC<LedgerListProps> = ({ loan }) => {
	const [ledgers, setLedgers] = useState<Array<Ledgers>>([]);

	const { refetch } = useQuery(
		["leger-get-by-loan"],
		() => {
			return ManageLedgerService.getLedgerByLoanId(loan || "");
		},
		{
			onSuccess: (data) => {
				if (data && data?.length > 0) {
					const newData: Array<Ledgers> = [];
					data.forEach((item: Ledgers) => {
						const ledger: Ledgers = {
							id: item.id,
							ledgerDate: item.ledgerDate,
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
						};
						newData.push(ledger);
					});

					setLedgers(newData);
				}
			},
		}
	);

	const getUserActivity = () => {
		void refetch();
	};

	useEffect(() => {}, [ledgers]);

	return (
		<>
			<button onClick={getUserActivity}>Get Ledger</button>
			<LedgerComponent loan={loan} ledgersData={ledgers} />
		</>
	);
};

export { LedgerList };
