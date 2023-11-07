import { Invoice } from "./../component/Invoice/types/index";
export const lenders = (): string => {
	return `/lenders`;
};

export const lendersById = (id: string, search: string): string => {
	return `/lenders/${id}?searchData=${search}`;
};

export const updateBorrowerData = (id: string): string => {
	return `/borrowers/${id}`;
};

export const ledgers = (): string => {
	return `/ledgers`;
};

export const ledgersChangeStatus = (id: string): string => {
	return `/ledgers/change-status/${id}`;
};

export const deleteLedgerApi = (id: string): string => {
	return `/ledgers/${id}`;
};

export const invoices = (): string => {
	return `/invoices`;
};

export const sendInvoices = (): string => {
	return `/invoices/send`;
};

export const downloadInvoiceApi = (invoiceId: number): string => {
	return `/invoices/download/${invoiceId}`;
};
