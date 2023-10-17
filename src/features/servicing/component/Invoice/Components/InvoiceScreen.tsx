import { useState, type FC, useEffect } from "react";
import IInvoicePdfPreview from "./InvoicePdfPreview";
import type { Invoice } from "../types";
import InvoiceDetail from "./InvoiceList/InvoiceDetail";
import InvoiceList from "./InvoiceList";
import { useQuery } from "@tanstack/react-query";
import ManageInvoiceService from "@/features/servicing/api/invoices";
import type { Loan } from "@/features/servicing/types/api";
import { Ledgers } from "../../Ledger/types";

interface InvoiceScreenProps {
	loan: Loan;
}
const InvoiceScreen: FC<InvoiceScreenProps> = ({ loan }) => {
	const [invoice, setInvoice] = useState<Invoice>();

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
			className="relative flex flex-row w-full  rounded-3xl border-2 bg-gold-300 relative"
			style={{
				height: "calc(100vh - 12rem)",
			}}
		>
			<div className="flex flex-row w-3/5 max-h-screen h-fit">
				<div className="w-4/6 h-full overflow-y-auto	">
					<InvoiceList loanId={loan.id} setInvoice={setInvoice} />
				</div>
				<div className="w-full  bg-white h-full p-6">
					<InvoiceDetail invoice={invoice} />
				</div>
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
