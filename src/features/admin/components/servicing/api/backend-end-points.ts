export interface ApiParameters {
	link: string;
	id?: string;
}

export const createApiUrl = (
	resource: string,
	parameter: ApiParameters
): string => {
	let url = `/${resource}`;
	if (parameter.link !== "") {
		url += `/${parameter.link}`;
	}
	if (parameter.id) {
		url += `/${parameter.id}`;
	}
	return url;
};

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

export const downloadInvoiceApi = (invoiceId: string): string => {
	return `/invoices/download/${invoiceId}`;
};

export const borrowerNotificationsApi = (parameter: ApiParameters): string => {
	return createApiUrl("communications", parameter);
};

export const borrowersApi = (parameter: ApiParameters): string => {
	return createApiUrl("borrowers", parameter);
};

export const payablesApi = (parameter: ApiParameters): string => {
	return createApiUrl("payables", parameter);
};

export const payablesDetailApi = (parameter: ApiParameters): string => {
	return createApiUrl("payable-details", parameter);
};
