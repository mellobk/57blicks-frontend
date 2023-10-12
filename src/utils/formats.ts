/* eslint-disable @typescript-eslint/explicit-function-return-type */
import moment from "moment";

export const dateFormat = (inputDate: string) => {
	const formattedDate = moment(inputDate, "YYYY-MM-DD").format("MMM DD, YYYY");

	if (!formattedDate || formattedDate === "Invalid date") {
		return "Invalid date format";
	}

	return formattedDate;
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
export const moneyFormat = (value: number) => {
	const USDollar = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
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
export const dateFormatFormat = (inputString: string) => {
	const month = inputString.slice(0, 2);
	const day = inputString.slice(2, 4);
	const year = inputString.slice(4, 8);

	return `${month}-${day}-${year}`;
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
