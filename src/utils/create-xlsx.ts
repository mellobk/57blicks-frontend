/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable unicorn/prefer-code-point */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const downloadXLSX = (data: Array<any>, fileName: string) => {
	// Preprocess data to remove unwanted indices or modify it as needed
	const preprocessedData = data.map((item) => {
		// Assuming 'item' is an object, you can remove or modify it here
		// For example, delete item.unwantedProperty;
		return item;
	});

	// Continue with your conversion after preprocessing
	const worksheet = XLSX.utils.json_to_sheet(preprocessedData);
	const workbook = XLSX.utils.book_new();

	delete worksheet["A1"];
	delete worksheet["B1"];
	delete worksheet["C1"];
	delete worksheet["D1"];
	delete worksheet["E1"];
	delete worksheet["F1"];
	delete worksheet["G1"];
	delete worksheet["H1"];

	XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");

	const about = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
	const buf = new ArrayBuffer(about.length);
	const view = new Uint8Array(buf);

	for (let index = 0; index < about.length; index++) {
		view[index] = about.charCodeAt(index) & 0xff;
	}

	// Assuming 'saveAs' is defined elsewhere or you're using a library like FileSaver.js
	saveAs(new Blob([buf], { type: "application/octet-stream" }), fileName);
};
