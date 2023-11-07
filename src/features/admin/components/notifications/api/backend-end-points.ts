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

export const readAllNotification = (): string => {
	return `/user-notifications/read-all-notifications`;
};
