/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable unicorn/prefer-code-point */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const downloadXLSX = (data: Array<any>, fileName: string) => {
	const worksheet = XLSX.utils.json_to_sheet(data);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");

	const about = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
	const buf = new ArrayBuffer(about.length);
	const view = new Uint8Array(buf);

	for (let index = 0; index < about.length; index++)
		view[index] = about.charCodeAt(index) & 0xff;

	saveAs(new Blob([buf], { type: "application/octet-stream" }), fileName);
};
