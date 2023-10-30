import { type FC, useState } from "react";
import InvoiceListScreen from "./InvoiceListScreen.tsx";
import ManageInvoiceService from "@/features/admin/components/servicing/api/invoices.ts";
import { useQuery } from "@tanstack/react-query";
import type { Invoice } from "../../types";
import Loading from "@/assets/icons/loading.tsx";

interface InvoiceListProps {
	loanId: string;
	setInvoice: (invoice: Invoice) => void;
	setExitsInvoice: (exitsInvoice: boolean) => void;
}

const InvoiceList: FC<InvoiceListProps> = ({
	loanId,
	setInvoice,
	setExitsInvoice,
}) => {
	const [invoices, setInvoices] = useState<Array<Invoice>>([]);

	const { isLoading } = useQuery(
		["leger-get-by-loan"],
		() => {
			return ManageInvoiceService.getInvoiceByLoanId(loanId);
		},
		{
			onSuccess: (data: Array<Invoice>) => {
				data && setInvoices(data);
				if (data.length > 0) {
					setExitsInvoice(true);
				}
			},
		}
	);

	return (
		<div>
			{isLoading && <Loading />}
			<InvoiceListScreen invoices={invoices} setInvoice={setInvoice} />
		</div>
	);
};

export default InvoiceList;
