import { type FC, useEffect, useState } from "react";
import IInvoicePdfPreview from "./InvoicePdfPreview";
import type { Invoice } from "../types";
import InvoiceDetail from "./InvoiceList/InvoiceDetail";
import InvoiceList from "./InvoiceList";
import { useQuery } from "@tanstack/react-query";
import ManageInvoiceService from "@/features/servicing/api/invoices";
import type { Loan } from "@/features/servicing/types/api";
import type { Ledgers } from "../../Ledger/types";

interface InvoiceScreenProps {
	loan: Loan;
}

const InvoiceScreen: FC<InvoiceScreenProps> = ({ loan }) => {
	const [invoice, setInvoice] = useState<Invoice>();
	const [exitsInvoice, setExitsInvoice] = useState<boolean>(false);

	const [ledgers, setLedgers] = useState<Array<Ledgers>>([]);

	const queryInvoiceDetails = useQuery(
		["get-invoices-details"],
		() => {
			return ManageInvoiceService.getInvoiceDetails(invoice?.id || 0);
		},
		{
			onSuccess: (data: Array<Ledgers>) => {
				data && setLedgers(data);
			},
			enabled: false,
		}
	);

	useEffect(() => {
		if (invoice) {
			void queryInvoiceDetails.refetch();
		}
	}, [invoice]);

	return (
		<div
			className="relative flex flex-row w-full  rounded-3xl border-2 bg-gold-300"
			style={{
				height: "calc(100vh - 12rem)",
			}}
		>
			{!exitsInvoice && (
				<div className="flex flex-row w-full h-full p-10">
					There is no information to show on the invoice, please add a line item
					on the ledger.
				</div>
			)}
			<div className="flex flex-row w-3/5 max-h-screen h-fit">
				<div className="w-4/6 h-full overflow-y-auto	">
					<InvoiceList
						loanId={loan.id || ""}
						setInvoice={setInvoice}
						setExitsInvoice={setExitsInvoice}
					/>
				</div>
				{exitsInvoice && (
					<div
						className="w-full  bg-white p-6 "
						style={{
							height: "calc(100vh - 12rem)",
						}}
					>
						<InvoiceDetail invoice={invoice} />
					</div>
				)}
			</div>
			<div className="flex flex-row w-1/2">
				<div className="w-full h-full ">
					{invoice && (
						<IInvoicePdfPreview
							invoice={invoice}
							loan={loan}
							ledgers={ledgers}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export { InvoiceScreen };
