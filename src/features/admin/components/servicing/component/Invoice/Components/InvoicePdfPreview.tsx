import { type FC, useEffect, useState } from "react";
import type { Invoice, InvoiceDataPdf, InvoiceDataPdfDetails } from "../types";
import { InvoiceDocumentPreview } from "./InvoiceList/InvoiceDocumentPreview";
import {
	PDFDownloadLink,
	PDFViewer as PDFViewerGenerator,
} from "@react-pdf/renderer";
import type { Loan } from "@/features/admin/components/servicing/types/api";
import {
	type Ledgers,
	LedgerType,
	LedgerTypeOfPayment,
} from "../../Ledger/types";
import {
	dateFormatFormat,
	dateFormatOptions,
	moneyFormat,
} from "@/utils/formats";
import { Icon } from "@/components/ui/Icon";
import SendInvoice from "./SendInvoice";

interface IInvoicePdfPreviewProps {
	invoice: Invoice;
	loan: Loan;
	ledgers: Array<Ledgers>;
}

const calculateInterestPayment = (
	ledgers: Array<Ledgers> | undefined
): string => {
	let interestPayment = 0;
	if (ledgers) {
		ledgers.forEach((ledger) => {
			if (
				ledger.typeOfPayment === LedgerTypeOfPayment.INTEREST &&
				ledger.type === LedgerType.DEBIT
			) {
				interestPayment += Number.parseInt(`${ledger.debit}`);
			}
		});
	}
	return moneyFormat(interestPayment);
};

const generateDetail = (
	ledgers: Array<Ledgers>,
	invoice: Invoice
): Array<InvoiceDataPdfDetails> => {
	const details: Array<InvoiceDataPdfDetails> = [];
	if (ledgers) {
		ledgers.forEach((ledger) => {
			return details.push({
				dueDate: dateFormatOptions(invoice.endDate, "MM-DD-YYYY"),
				description: ledger.memo || "",
				monthlyPayment: moneyFormat(ledger.debit || 0),
				lateFee:
					ledger.typeOfPayment === LedgerTypeOfPayment.LATE_FEE ? "X" : "",
				due: moneyFormat(Number.parseInt(`${ledger.debit}`)),
				paid: moneyFormat(Number.parseInt(`${ledger.credit}`)),
			});
		});
	}
	return details;
};

const IInvoicePdfPreview: FC<IInvoicePdfPreviewProps> = ({
	invoice,
	loan,
	ledgers,
}) => {
	const [, setPages] = useState<number>(0);
	const [invoiceDataPdf, setInvoiceDataPdf] = useState<InvoiceDataPdf>();
	//const [pdf, setPdf] = useState<string>();

	const generatePDFData = (): void => {
		setInvoiceDataPdf({
			loanAmount: moneyFormat(Number.parseInt(loan.totalLoanAmount) || 0),
			loanPercent: `${loan.interestRate} %`,
			originationDate: dateFormatFormat(invoice.date ?? ""),
			maturityDate: dateFormatFormat(loan.maturityDate ?? ""),
			interestPayment: calculateInterestPayment(ledgers),
			details: generateDetail(ledgers, invoice),
		});
	};
	useEffect(() => {
		if (invoice && loan && ledgers) {
			generatePDFData();
		}
	}, [invoice, loan, ledgers]);

	return (
		<>
			<div
				className={`absolute w-8 h-8 ${
					invoice ? "bg-blue-70" : "bg-gray-150"
				}   rounded-full mr-4  align-middle pt-[6px] pl-[8px] cursor-pointer `}
				style={{
					left: "631px",
					top: "36px",
				}}
			>
				{invoiceDataPdf && (
					<PDFDownloadLink
						document={
							<InvoiceDocumentPreview
								invoiceDataPdf={invoiceDataPdf}
								setPages={setPages}
							/>
						}
						fileName="somename.pdf"
					>
						{({ loading }) =>
							loading ? (
								""
							) : (
								<>
									{" "}
									<Icon
										name="download"
										color={`${invoice ? "#0085FF" : "#b8bcc1"}`}
										width="16"
									/>
								</>
							)
						}
					</PDFDownloadLink>
				)}
			</div>
			{invoiceDataPdf && (
				<SendInvoice invoice={invoice} invoiceDataPdf={invoiceDataPdf} />
			)}
			<div
				className="lg:col-span-3 col-span-1 lg:pl-6"
				style={{
					height: "calc(100vh - 12rem)",
				}}
			>
				{invoiceDataPdf && (
					<PDFViewerGenerator height="100%" width="110%" showToolbar={false}>
						<InvoiceDocumentPreview
							invoiceDataPdf={invoiceDataPdf}
							setPages={setPages}
						/>
					</PDFViewerGenerator>
				)}
			</div>
		</>
	);
};

export default IInvoicePdfPreview;
