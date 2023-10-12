import { useState, type FC, useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import { temporaryInvoiceList } from "./temp/invoices";
import type { InvoiceTypeArray } from "../types";

interface InvoiceListProps {}
const InvoiceList: FC<InvoiceListProps> = () => {
	const [invoiceData, setInvoiceData] = useState<Array<InvoiceTypeArray>>([]);

	const groupByYear = (data: Array<InvoiceTypeArray>) => {
		const temporaryData: Array<InvoiceTypeArray> = [];
		let year = "";

		data.forEach((invoice) => {
			const currentYear = invoice.date.split("-")[0] || "";

			if (currentYear !== year) {
				temporaryData.push({
					name: currentYear,
					date: "",
					type: "header",
					active: false,
				});
			}
			year = currentYear;
			temporaryData.push(invoice);
		});
		setInvoiceData(temporaryData);
	};

	useEffect(() => {
		groupByYear(temporaryInvoiceList);
	}, []);

	const setActive = (index: number): void => {
		console.log("🚀 ~ file: InvoiceList.tsx:36 ~ setActive ~ index:", index);
		//loop all invoiceData and set active to false except the one with index === index
		const temporaryData = invoiceData.map((invoice, i) => {
			if (i === index) {
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
							<h2>{invoice.name}</h2>
							<Icon name="arrowRight" color="#C79E63" width="7" height="13" />
						</li>
					) : (
						<li
							className={`relative hover:bg-gold-380 hover:text-gold  cursor-pointer h-12 rounded-xl m-6 p-3
                ${invoice.active ? "bg-gold-380 text-gold" : "bg-white"}
              `}
							key={`invoice-${index}`}
							onClick={(): void => {
								setActive(index);
							}}
						>
							<div className="flex flex-row w-full">
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

export default InvoiceList;
