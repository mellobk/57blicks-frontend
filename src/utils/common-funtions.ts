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
	const dayName = days[date.getUTCDay()];

	// Extract the hours and minutes
	let hours = date.getUTCHours();
	const minutes = ("0" + date.getUTCMinutes()).slice(-2); // Ensures minutes are always 2 digits

	// Convert from 24-hour to 12-hour format and set the AM/PM notation
	const ampm = hours >= 12 ? "AM" : "PM";
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

export const formatCurrency = (value: number): string => {
	return value
		? new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
		  }).format(value)
		: "";
};
