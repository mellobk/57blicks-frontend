export const getLoansById = (id: string): string => {
	return `/loans/${id}`;
};

export const updateLoan = (id: string): string => {
	return `/loans/${id}`;
};

export const updateLedger = (id: string): string => {
	return `/ledgers/${id}`;
};

export const createNotificationData = (): string => {
	return `/notifications`;
};

export const updateUserNotificationData = (id: string): string => {
	return `/user-notifications/${id}`;
};

export const userNotification = (): string => {
	return `/user-notifications?page=1&take=20`;
};
