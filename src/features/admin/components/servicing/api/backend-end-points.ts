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

export const ticketsApi = (): string => {
	return `/tickets/admin`;
};

export const deleteTicketsApi = (id: string): string => {
	return `/tickets/${id}`;
};

export const updateTicketsApi = (id: string): string => {
	return `/tickets/${id}`;
};

export const commentApi = (id: string): string => {
	return `/comments/${id}`;
};

export const collateralApi = (id: string): string => {
	return `/collaterals/${id}`;
};

export const filterTicketData = (search: string, status: string): string => {
	return `/tickets/admin?page=1&take=50${`&q=${search}&status=${status}`}`;
};

export const getAttachmentsData = (): string => {
	return `/attachments/?page=1&take=50`;
};

export const getChatsData = (id: string): string => {
	return `/tickets/${id}`;
};

export const setChatsData = (id: string): string => {
	return `/comments/${id}`;
};

export const updateAttachmentApi = (id: string): string => {
	return `/attachments/upload/${id}`;
};

export const deleteLoanApi = (id: string): string => {
	return `/loans/${id}`;
};

export const loanHistoricalApi = (parameter: ApiParameters): string => {
	return createApiUrl("loan-historicals", parameter);
};
