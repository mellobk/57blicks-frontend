export const updateLedger = (id: string): string => {
	return `/ledgers/change-status/${id}`;
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

export const readAllNotification = (): string => {
	return `/user-notifications/read-all-notifications`;
};

export const updateFundingBreakDown = (id: string): string => {
	return `/loans/update-funding-breakdown/${id}`;
};
