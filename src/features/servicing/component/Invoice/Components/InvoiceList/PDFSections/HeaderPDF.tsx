import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";

import type { FC } from "react";
import { InvoiceDataPdf } from "../../../types";
import LogoNavy from "@/assets/images/png/LogoNavy.png";

const styles = StyleSheet.create({
	body: {
		marginHorizontal: 10,
	},
	column: {
		width: "50%",
	},
	columns: {
		flexDirection: "row",
		marginVertical: 10,
	},
	header: {
		margin: 10,
	},
	logo: {
		width: "200px",
		marginBottom: 8,
		alignContent: "flex-start",
	},
	section: {
		marginVertical: 10,
	},
	text: {
		fontSize: 12,
	},
	title: {
		color: "#0E2130",
		fontSize: 20,
		fontWeight: "extrabold",
		alignContent: "stretch",
		textAlign: "right",
		paddingBottom: 10,
		paddingRight: 20,
	},
	subtitleHeader: {
		color: "#0E2130",
		fontSize: 14,
		fontWeight: "black",
		alignContent: "stretch",
		textAlign: "right",
		paddingBottom: 10,
		paddingRight: 20,
	},
	subtitleHeaderBold: {
		color: "#0E2130",
		fontSize: 14,
		fontWeight: "extrabold",

		textAlign: "right",
		paddingBottom: 10,
		paddingRight: 20,
	},
	content: {
		color: "#0E2130",
		padding: 10,
		"@media max-width: 400": {
			flexDirection: "column",
		},
		"@media min-width: 400": {
			flexDirection: "row",
		},
	},
	contentLoanData: {
		padding: 10,
		"@media max-width: 400": {
			flexDirection: "column",
		},
		"@media min-width: 400": {
			flexDirection: "row",
		},
	},
	block: {
		height: 130,
		width: 280,
	},
});

interface HeaderPDFProps {
	invoiceDataPdf: InvoiceDataPdf;
}

export const HeaderPDF: FC<HeaderPDFProps> = ({
	invoiceDataPdf,
}): JSX.Element => (
	<View style={styles.content}>
		<View style={[styles.block]}>
			<Image src={LogoNavy} style={styles.logo} />
		</View>
		<View style={[styles.block]}>
			<Text style={styles.title}>Borrower Invoice Summary</Text>
			<Text style={styles.subtitleHeader}>Asquare Studio LLC</Text>
			<Text style={styles.subtitleHeader}>2172 Hale St Ft Myers FL 33916</Text>
			<Text style={[styles.subtitleHeaderBold, { fontWeight: "extrabold" }]}>
				Origination Date:
				<Text>{invoiceDataPdf.originationDate}</Text>
			</Text>
			<Text style={styles.subtitleHeader}>
				Maturity Date: {invoiceDataPdf.maturityDate}
			</Text>
		</View>
	</View>
);
