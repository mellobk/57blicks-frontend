/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import moment from "moment";

export const dateFormat = (inputDate: string) => {
	const formattedDate = moment(inputDate, "YYYY-MM-DD").format("MMM DD, YYYY");

	if (!formattedDate || formattedDate === "Invalid date") {
		return "Invalid date format";
	}

	return formattedDate;
};

export const formatTime = (dateString: string) => {
	const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
	const date = new Date(dateString);

	if (!(date instanceof Date) || isNaN(date.getTime())) {
		throw new Error("Invalid date string");
	}

	const timeString = date.toLocaleTimeString(undefined, options);

	return timeString;
};

export const dateWithFormat = (
	inputDate: string | Date,
	format: string
): string => {
	const formattedDate = moment(inputDate, "YYYY-MM-DD").format(format);

	if (!formattedDate || formattedDate === "Invalid date") {
		return "Invalid date format";
	}

	return formattedDate;
};

export const dateWithFormatUS = (
	inputDate: string | Date,
	format: string
): string => {
	const formattedDate = moment(inputDate, "MMDDYYYY").format(format);

	if (!formattedDate || formattedDate === "Invalid date") {
		return "Invalid date format";
	}

	return formattedDate;
};
export const moneyFormat = (value: number, decimals = true) => {
	const USDollar = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: decimals ? 2 : 0,
		maximumFractionDigits: decimals ? 2 : 0,
	});

	return USDollar.format(value);
};

export const nameFormat = (name: string) => {
	return name.replace(/\b[a-z]/g, function (match) {
		return match.toUpperCase();
	});
};

export const percentageFormat = (value: number) => {
	return `${value}%`;
};
export const dateFormatFormat = (inputString: string | Date): string => {
	try {
		if (typeof inputString !== "string") {
			inputString = inputString.toDateString();
		}
		const month = inputString.slice(0, 2);
		const day = inputString.slice(2, 4);
		const year = inputString.slice(4, 8);
		console.log(month);
		return `${month}-${day}-${year}`;
	} catch {
		return "Invalid date format";
	}
};

export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const day = (date.getDate() + 1).toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
	const year = date.getFullYear();
	return `${day}-${month}-${year}`;
};

export const dateFormatOptions = (date: Date, dateFormat: string): string => {
	return moment(date).format(dateFormat);
};

export const placeholderFormat = (
	label: string,
	placeholder?: string,
	dropdown = false
) => {
	return placeholder ?? `${dropdown ? "Select" : "Enter"} ${label}`;
};

export const formatPlaceholder = (
	format: "money" | "percentage",
	placeholder?: string
) => {
	return (
		placeholder ?? (format === "money" ? moneyFormat(0) : percentageFormat(0))
	);
};

export const formatValue = (value: number, format: "money" | "percentage") => {
	return format === "money"
		? moneyFormat(Number(value))
		: percentageFormat(Number(value));
};
