/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable unicorn/prefer-code-point */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const downloadXLSX = async (data: Array<any>, fileName: string) => {
	// Create a new workbook and a worksheet
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet("My Sheet");

	// Add your data to the worksheet
	data.forEach((row) => {
		worksheet.addRow(row);
	});

	// Write the workbook to a buffer
	const buffer = await workbook.xlsx.writeBuffer();

	// Create a Blob and use FileSaver to save the file
	const blob = new Blob([buffer], {
		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	});
	saveAs(blob, fileName);
};
