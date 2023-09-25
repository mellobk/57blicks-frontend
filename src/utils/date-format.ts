export function formatDate(inputDate: string): string {
	const months: Array<string> = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const parts: Array<string> = inputDate.split("-");

	if (!parts || parts.length === 0) {
		return "Invalid date format";
	}

	if (parts.length !== 3) {
		return "Invalid date format";
	}

	const year: number = Number.parseInt(parts[0] || "");
	const monthIndex: number = Number.parseInt(parts[1] || "") - 1;
	const day: number = Number.parseInt(parts[2] || "");

	if (Number.isNaN(year) || Number.isNaN(monthIndex) || Number.isNaN(day)) {
		return "Invalid date values";
	}

	const month: string = months[monthIndex] || "";

	return `${month} ${day}, ${year}`;
}
