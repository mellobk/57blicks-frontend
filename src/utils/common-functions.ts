/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
	Investor,
	Role,
	User,
} from "@/features/admin/components/manage-user/types/api";

import type { FundingBreakdown } from "@/features/admin/components/servicing/types/api";
import type { Permissions } from "../features/admin/components/manage-user/types/api";
import { RoleType } from "@/types/api/permissions-type";
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

export const statusTaxes = (rowA: FundingBreakdown, rowB: FundingBreakdown) => {
	const a = rowA.loan.taxesPaid || "";
	const b = rowB.loan.taxesPaid || "";

	if (a > b) {
		return 1;
	}

	if (b > a) {
		return -1;
	}

	return 0;
};

export function sortMaturityDate(
	rowA: FundingBreakdown,
	rowB: FundingBreakdown
): any {
	const aDateString = rowA.loan.maturityDate || "";
	const bDateString = rowB.loan.maturityDate || "";

	// Convert the date strings to Date objects
	const aDate = aDateString ? new Date(aDateString) : new Date(0); // Default to epoch if empty
	const bDate = bDateString ? new Date(bDateString) : new Date(0); // Default to epoch if empty

	return aDate.getTime() - bDate.getTime();
}

export function sortOriginateDate(
	rowA: FundingBreakdown,
	rowB: FundingBreakdown
): any {
	const aDateString = rowA.loan.originationDate || "";
	const bDateString = rowB.loan.originationDate || "";

	// Convert the date strings to Date objects
	const aDate = aDateString ? new Date(aDateString) : new Date(0); // Default to epoch if empty
	const bDate = bDateString ? new Date(bDateString) : new Date(0); // Default to epoch if empty

	return aDate.getTime() - bDate.getTime();
}

export function sortInsuranceDate(
	rowA: FundingBreakdown,
	rowB: FundingBreakdown
): any {
	const aDateString = rowA.loan.collaterals[0]?.insuranceExpirationDate || "";
	const bDateString = rowB.loan.collaterals[0]?.insuranceExpirationDate || "";

	// Convert the date strings to Date objects
	const aDate = aDateString ? new Date(aDateString) : new Date(0); // Default to epoch if empty
	const bDate = bDateString ? new Date(bDateString) : new Date(0); // Default to epoch if empty

	return aDate.getTime() - bDate.getTime();
}

export const statusDefault = (
	rowA: FundingBreakdown,
	rowB: FundingBreakdown
) => {
	const a = rowA.loan.status || "";
	const b = rowB.loan.status || "";

	if (a > b) {
		return 1;
	}

	if (b > a) {
		return -1;
	}

	return 0;
};

export const statusDefaultType = (
	rowA: FundingBreakdown,
	rowB: FundingBreakdown
) => {
	const a = rowA.loan.defaultType || "";
	const b = rowB.loan.defaultType || "";

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
	return ((Number(amount) * (Number(rate) / 100)) / 12)?.toFixed(4) || "0";
};

export const round = (Number: number, precision: number): number => {
	const factor = Math.pow(10, precision);
	const temporaryNumber = Number * factor;
	const roundedTemporaryNumber = Math.round(temporaryNumber);
	return roundedTemporaryNumber / factor;
};

export const calculateProrated = (
	amount: string,
	rate: string,
	originationDate: string
): string => {
	let date = originationDate ? moment(originationDate, "MM-DD-YYYY") : moment();
	date = date.isValid() ? date : moment();

	const lastDayOfMonth = date.clone().endOf("month");

	const daysUntilEndOfMonth = lastDayOfMonth.diff(date, "days") + 1;

	const dailyRate = Number(rate) / 100 / 365;

	return (Number(amount) * dailyRate * daysUntilEndOfMonth)?.toFixed(4) || "0";
};

export const getLabel = (name: string): string => {
	if (!name) return "";

	const initials = name
		.split(" ")
		.map((part) => part.charAt(0).toUpperCase())
		.join("");
	return initials.length > 2 ? initials.slice(0, 2) : initials;
};

export const formatDateString = (isoString: string): string => {
	// Parse the ISO date string into a JavaScript Date object
	const date = new Date(isoString);

	// Create an array of days to get the day name
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	// Extract the day name
	const dayName = days[date.getDay()];

	// Extract the hours and minutes
	let hours = date.getHours();
	const minutes = ("0" + date.getMinutes()).slice(-2); // Ensures minutes are always 2 digits

	// Convert from 24-hour to 12-hour format and set the AM/PM notation
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours || 12; // Convert hour '0' to '12'

	return `${dayName} ${hours}:${minutes} ${ampm}`;
};

export const formatPhoneNumber = (phone: string): string => {
	// Remove all non-numeric characters
	let numbers = phone.replace(/\D/g, "");

	// Extract the last 10 digits (ignoring country code)
	numbers = numbers.slice(-10);

	// Format the number
	return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(
		6,
		10
	)}`;
};

export const emptyObject = (object: any) => {
	return Object.keys(object).length === 0 && object.constructor === Object;
};

export const findPermission = (
	role?: Role,
	permissions?: Array<Permissions>,
	permission?: string
): boolean => {
	if (role?.name === RoleType.SUPER_ADMIN) {
		return true;
	}

	const foundPermissions = permissions?.some(
		(data) => data.name === permission
	);

	return foundPermissions || false;
};

export const getIsSameMonthYear = (date: string): any => {
	const specificDate = new Date(date);

	const currentDate = new Date();

	return (
		specificDate.getMonth() === currentDate.getMonth() &&
		specificDate.getFullYear() === currentDate.getFullYear()
	);
};

export const getIsSamePreviousMonthYear = (originationDate: string): number => {
	const origination = new Date(originationDate);
	//get previous month from now
	const previousMonth = new Date();
	previousMonth.setMonth(previousMonth.getMonth() - 1);
	//if origination date is the same return 0 if is less than return -1 if is greater than return 1
	if (
		origination.getMonth() === previousMonth.getMonth() &&
		origination.getFullYear() === previousMonth.getFullYear()
	) {
		return 0;
	}
	if (origination < previousMonth) {
		return -1;
	}
	return 1;
};
