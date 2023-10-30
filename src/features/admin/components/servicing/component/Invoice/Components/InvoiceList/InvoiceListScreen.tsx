import { type FC, useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

import type { Invoice, InvoiceTypeArray } from "../../types";
import { formatInvoiceName } from "../../utils/format-invoice-name.ts";

interface InvoiceListScreenProps {
	invoices: Array<Invoice>;
	setInvoice: (invoice: Invoice) => void;
}

const InvoiceListScreen: FC<InvoiceListScreenProps> = ({
	invoices,
	setInvoice,
}) => {
	const [invoiceData, setInvoiceData] = useState<Array<InvoiceTypeArray>>([]);

	const groupByYear = (): void => {
		const temporaryData: Array<InvoiceTypeArray> = [];
		let year = 0;

		invoices.forEach((invoice) => {
			const currentYear = new Date(invoice.startDate).getFullYear();

			const auxData: InvoiceTypeArray = {
				name: formatInvoiceName(new Date(invoice.startDate), invoice.id || 0),
				...invoice,
				type: "list",
				active: false,
				s3Url: "",
			};
			if (currentYear !== year) {
				temporaryData.push({
					...auxData,
					type: "header",
					name: currentYear.toString(),
				});
			}
			year = currentYear;
			temporaryData.push(auxData);
		});

		setInvoiceData(temporaryData);
	};

	useEffect(() => {
		groupByYear();
	}, [invoices]);

	const setActive = (indexActive: number): void => {
		const temporaryData = invoiceData.map((invoice, index) => {
			if (index === indexActive) {
				setInvoice(invoice);
				return { ...invoice, active: true };
			}
			return { ...invoice, active: false };
		});
		setInvoiceData(temporaryData);
	};

	return (
		<div>
			<ul>
				{invoiceData.map((invoice, index) => {
					//if invoice.date change add a new li with date as header
					return invoice.type === "header" ? (
						<li
							key={index}
							className={`pt-5 pb-5 mt-2 border-t-[1px] border-b-[1px] border-gold-370 h-16  align-middle place-content-center text-primary font-bold text-center flex justify-between ml-4 mr-4

              `}
						>
							<Icon name="arrowLeft" color="#C79E63" width="14" />
							<h2 className="capitalize">{invoice.name}</h2>
							<Icon name="arrowRight" color="#C79E63" width="7" height="13" />
						</li>
					) : (
						<li
							className={`relative hover:bg-gold-380 hover:text-gold  cursor-pointer h-12 rounded-xl m-3 p-3
                ${invoice.active ? "bg-gold-380 text-gold" : "bg-white"}
              `}
							key={`invoice-${index}`}
							onClick={(): void => {
								setActive(index);
							}}
						>
							<div className="flex flex-row w-full capitalize">
								{invoice.name}
								<div className="absolute flex flex-row  right-4 bg-red-200 w-14 h-6 rounded-2xl text-[8px] align-middle place-content-center pt-[5px] text-red-500 font-bold">
									<div className=" mr-1">
										<Icon name="pdf" color="red" width="14" />
									</div>
									PDF
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default InvoiceListScreen;
