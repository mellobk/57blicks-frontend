import { type FC, useEffect, useState } from "react";
import type {
	Invoice,
	InvoiceDataPdf,
	InvoiceDataPdfDetails,
} from "../../types";
import { InvoiceDocumentPreview } from "../InvoiceList/InvoiceDocumentPreview";
import { PDFViewer as PDFViewerGenerator } from "@react-pdf/renderer";
import type { Loan } from "@/features/admin/components/servicing/types/api";
import {
	type Ledgers,
	LedgerType,
	LedgerTypeOfPayment,
} from "../../../Ledger/types";
import {
	dateFormatFormat,
	dateFormatOptions,
	moneyFormat,
} from "@/utils/formats";
import { round } from "@/utils/common-functions";

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

const invoice = {} as unknown as Invoice;
const loan = [] as unknown as Loan;
const ledgers = [] as unknown as Array<Ledgers>;

const PreviewInvoice: FC = () => {
	const [, setPages] = useState<number>(0);
	const [invoiceDataPdf, setInvoiceDataPdf] = useState<InvoiceDataPdf>();
	//const [pdf, setPdf] = useState<string>();

	const generatePDFData = (): void => {
		setInvoiceDataPdf({
			loanAmount: moneyFormat(Number.parseInt(loan.totalLoanAmount) || 0),
			loanPercent: `${round(Number(loan.interestRate), 1)} %`,
			originationDate: dateFormatFormat(invoice.date ?? ""),
			maturityDate: dateFormatFormat(loan.maturityDate ?? ""),
			interestPayment: calculateInterestPayment(ledgers),
			details: generateDetail(ledgers, invoice),
			regular: moneyFormat(Number.parseInt(String(loan.regular)) || 0),
			address: "",
			borrower: "",
			link: "",
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
				className="lg:col-span-3 col-span-1 lg:pl-6"
				style={{
					height: "100%",
					width: "100%",
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

export default PreviewInvoice;
