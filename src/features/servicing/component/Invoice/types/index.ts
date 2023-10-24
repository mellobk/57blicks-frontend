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

export interface notification {
	email: boolean;
	sms: boolean;
	note?: string;
}

export interface InvoiceSend {
	invoiceId: number;
	notification: notification;
	file: string;
}
