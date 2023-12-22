import { Document, Page, StyleSheet, Text } from "@react-pdf/renderer";

import { BodyPage1PDF } from "./PDFSections/PDFBodyPage1";
import type { FC } from "react";
import { HeaderPDF } from "./PDFSections/HeaderPDF";
import { HeaderTablePDF } from "./PDFSections/HeaderTablePDF";
import type { InvoiceDataPdf } from "../../types";
import { PDFFooterPage1 } from "./PDFSections/PDFFooterPage1";
import { PDFServicingNotice } from "./PDFSections/PDFServicingNotice";
import { PDFTable } from "./PDFSections/PDFTable";

interface Props {
	invoiceDataPdf: InvoiceDataPdf;
	setPages?: (pages: number) => void;
	setPdf?: (pdf: string) => void;
}

const styles = StyleSheet.create({
	body: {
		marginHorizontal: 10,
	},
});

export const InvoiceDocumentPreview: FC<Props> = ({ invoiceDataPdf }) => {
	return (
		<Document
			style={{
				backgroundColor: "#fff",
			}}
		>
			<Page style={styles.body} size="A4" id="page1">
				<HeaderPDF invoiceDataPdf={invoiceDataPdf} />
				<PDFTable invoiceDataPdf={invoiceDataPdf} />
			</Page>
			<Page style={styles.body} size="A4" id="page3" wrap={true}>
				<HeaderTablePDF title={"Servicing Notice"} />
				<PDFServicingNotice link="" />
				<Text
					style={{
						fontSize: "12px",
						color: "#aaa",
						position: "absolute",
						minHeight: "40px",
						bottom: "0px",
						left: "0px",
						right: "0px",
						textAlign: "center",
					}}
					fixed
				/>
			</Page>
		</Document>
	);
};
