import type { Investor, User } from "@/features/manage-user/types/api";
import moment from "moment";

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

export const calculateRegular = (amount: string, rate: string) => {
	return ((Number(amount) * (Number(rate) / 100)) / 12).toFixed(2);
};

export const calculateProrated = (
	amount: string,
	rate: string,
	originationDate: string
) => {
	const date = originationDate
		? moment(originationDate, "MM-DD-YYYY")
		: moment();
	const lastDayOfMonth = date.clone().endOf("month");
	const daysUntilEndOfMonth = lastDayOfMonth.diff(date, "days") + 1;
	const dailyRate = Number(rate) / 100 / 365;

	return (Number(amount) * dailyRate * daysUntilEndOfMonth).toFixed(2);
};
