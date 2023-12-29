export interface Invoice {
	id?: string;
	invoiceNumber: number;
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
	regular: string;
	borrower: string;
	address: string;
	link: string;
}

export interface notification {
	email: boolean;
	sms: boolean;
	note?: string;
}

export interface InvoiceSend {
	invoiceId: string;
	notification: notification;
}
