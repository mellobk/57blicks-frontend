import { useState, type FC } from "react";
import InvoiceListScreen from "./InvoiceListScreen";
import ManageInvoiceService from "@/features/servicing/api/invoices";
import { useQuery } from "@tanstack/react-query";
import type { Invoice } from "../../types";

interface InvoiceListProps {
	loanId: string;
	setInvoice: (invoice: Invoice) => void;
}
const InvoiceList: FC<InvoiceListProps> = ({ loanId, setInvoice }) => {
	const [invoices, setInvoices] = useState<Array<Invoice>>([]);

	const { refetch } = useQuery(
		["leger-get-by-loan"],
		() => {
			return ManageInvoiceService.getInvoiceByLoanId(loanId);
		},
		{
			onSuccess: (data: Array<Invoice>) => {
				data && setInvoices(data);
			},
		}
	);

	const handleRefetch = async (): Promise<void> => {
		await refetch();
	};

	return (
		<div>
			<button
				onClick={(): void => {
					void handleRefetch();
				}}
			>
				Refetch
			</button>
			<InvoiceListScreen invoices={invoices} setInvoice={setInvoice} />
		</div>
	);
};

export default InvoiceList;
