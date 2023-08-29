export const sendToLocalStorage = (key: string, data: string): void => {
	localStorage.setItem(key, data);
};

export const getLocalStorage = (key: string): string => {
	const localValue = localStorage.getItem(key);
	return localValue || "";
};

export const removeLocalStorage = (key: string): void => {
	localStorage.removeItem(key);
};
