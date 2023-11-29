/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { saveAs } from "file-saver";

export const downloadCSV = (data: Array<any>, fileName: string) => {
	const csvContent =
		"data:text/csv;charset=utf-8," +
		data.map((e: Array<any>) => e.join(",")).join("\n");

	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	saveAs(blob, fileName);
};
