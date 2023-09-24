export const moneyFormat = (value: number) => {
	let USDollar = new Intl.NumberFormat("en-US", {
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

export const formatValue = (value: number, format: "money" | "percentage") => {
	return format === "money"
		? moneyFormat(Number(value))
		: percentageFormat(Number(value));
};
