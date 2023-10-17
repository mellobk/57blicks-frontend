export interface Invoice {
	id?: number;
	startDate: Date;
	endDate: Date;
	date: Date;
	lastSent: Date;
	s3Url: string;
}

export interface InvoiceTypeArray extends Invoice {
	name: string;
	type: string;
	active: boolean;
}

export interface InvoicePdf extends Invoice {
	loan: string;
	type: string;
	active: boolean;
}

export interface InvoiceDataPdfDetails {
	dueDate: string;
	description: string;
	monthlyPayment: string;
	lateFee: string;
	due: string;
	paid: string;
}
export interface InvoiceDataPdf {
	loanAmount: string;
	loanPercent: string;
	interestPayment: string;
	maturityDate: string;
	originationDate: string;
	details: Array<InvoiceDataPdfDetails>;
}
