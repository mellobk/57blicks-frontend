import type { DataEntry } from "../../types/chart-types";

export const convertToHour = (minutes: number): number => {
	if (minutes < 0) return 0;
	const hours = minutes / 60;
	return Math.round(hours * 10) / 10;
};

export function fillMissingDates(
	data: Array<DataEntry>,
	dateSelect: Date
): Array<DataEntry> {
	const currentDate = new Date();

	const endDate = new Date(
		dateSelect.getFullYear(),
		dateSelect.getMonth(),
		dateSelect.getDate()
	); // Get the date after today

	const startDate = new Date(dateSelect); // Start date
	startDate.setMonth(startDate.getMonth() - 1); // Get the date 7 days before the selected date

	const dateMap: { [date: string]: DataEntry } = {};

	// Create a map of dates in the input data
	data.forEach((entry) => {
		dateMap[entry.date.split("T")[0] || ""] = entry;
	});

	// Create an array of dates between start and end dates
	const filledData: Array<DataEntry> = [];
	for (let date = startDate; date < endDate; date.setDate(date.getDate() + 1)) {
		const dateString = date.toISOString().split("T")[0];

		if (dateString && dateMap[dateString]) {
			filledData.push({
				hour: convertToHour(
					Number.parseInt(dateMap[dateString].minutes as string) || 0
				),

				date: dateString?.slice(5).replace("-", "/"),
				fullDate: dateString,
			} as unknown as DataEntry);
		} else {
			filledData.push({
				hour: 0,
				date: dateString?.slice(5).replace("-", "/") + " ",
				fullDate: dateString,
			} as unknown as DataEntry);
		}
	}

	return filledData;
}
