export const formatInvoiceName = (date: Date, number: number): string => {
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear();
	return `${month}_${year}_${number}`;
};
