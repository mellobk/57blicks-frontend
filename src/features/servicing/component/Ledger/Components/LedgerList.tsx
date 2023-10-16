import type {FC} from "react";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {LedgerComponent} from "./LedgerComponent";
import type {Ledgers} from "../types";
import ManageLedgerService from "@/features/servicing/api/ledger";
import {dateWithFormat} from "@/utils/formats";

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
							ledgerDate:
								item.ledgerDate && dateWithFormat(item.ledgerDate, "MMDDYYYY"),
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

					setLedgers(newData);
				}
			},
		}
	);

	const refetchLedgers = (): void => {
		void refetch();
	};

	const deleteLedgerMutation = useMutation(
		(id: string) => {
			return ManageLedgerService.deleteLedger(id);
		},
		{
			onSuccess: () => {
				//refetchLedgers();
			},
			onError: () => {
				//refetchLedgers();
			},
		}
	);
	const handleDeleteLedger = (id: string): void => {
		deleteLedgerMutation.mutate(id);
	};

	useEffect(() => {}, [ledgers]);

	return (
		<>
			<LedgerComponent
				loan={loan}
				ledgersData={ledgers}
				refetchLedgers={refetchLedgers}
				handleDeleteLedger={handleDeleteLedger}
			/>
		</>
	);
};

export { LedgerList };
