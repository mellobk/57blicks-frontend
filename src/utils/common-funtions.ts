import type { Investor, User } from "@/features/manage-user/types/api";

export const statusSort = (rowA: Investor, rowB: Investor) => {
	const a = rowA.user?.isActive || "";
	const b = rowB.user?.isActive || "";

	if (a > b) {
		return 1;
	}

	if (b > a) {
		return -1;
	}

	return 0;
};

export const unFormatPhone = (number: string): string => {
	return number.replace(/[\s()-]/g, "");
};

export const removeCountryCode = (number: string): string => {
	return number.replace("+1", "");
};

export const findIndex = (data: Array<User>, id: string): number => {
	const index = data.findIndex((object: User) => object.id === id);

	return index + 1;
};

export const validateDate = (date: string): boolean => {
	const dateObject = new Date(date);
	const now = new Date();

	dateObject.setHours(0, 0, 0, 0);
	now.setHours(0, 0, 0, 0);

	const dateInMillie = dateObject.getTime();
	const nowInMillie = now.getTime();

	return dateInMillie < nowInMillie;
};
