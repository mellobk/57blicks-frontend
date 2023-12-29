/* eslint-disable unicorn/filename-case */
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";

import type { FC } from "react";
import type { InvoiceDataPdf } from "../../../types";
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
		left: 175,
		alignContent: "flex-start",
	},
	section: {
		marginVertical: 10,
	},
	text: {
		fontSize: 12,
	},
	description: {
		fontSize: 12,
		textAlign: "justify",
		paddingBottom: 10,
		paddingRight: 40,
		paddingLeft: 20,
		top: 10,
	},

	title: {
		color: "#0E2130",
		fontSize: 20,
		fontWeight: "extrabold",
		alignContent: "stretch",
		textAlign: "center",
		top: 0,
		left: 20,
	},
	subtitleHeader: {
		color: "#0E2130",
		fontSize: 12,
		fontWeight: "bold",
		alignContent: "stretch",
		textAlign: "left",
		paddingBottom: 5,
		paddingRight: 20,
		top: 10,
		left: 20,
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
		"@media max-width: 600": {
			flexDirection: "column",
		},
		"@media min-width: 600": {
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
		width: 550,
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
			<Text style={styles.title}>Borrower Invoice Summary</Text>
		</View>
		<View>
			<Text style={styles.description}>
				Thank you for choosing DKC Lending for your private financing needs! We
				are happy to be your loan servicing company, please read the following
				for future interest payment instructions for the duration of the loan.
			</Text>
			<Text style={styles.subtitleHeader}>
				Borrower: {invoiceDataPdf.borrower}{" "}
			</Text>
			<Text style={styles.subtitleHeader}>
				Address: {invoiceDataPdf.address}
			</Text>
			<Text style={styles.subtitleHeader}>
				Origination Date: {invoiceDataPdf.originationDate}
			</Text>
			<Text style={styles.subtitleHeader}>
				Maturity Date: {invoiceDataPdf.maturityDate}
			</Text>
			<Text style={styles.subtitleHeader}>
				Loan Amount: {invoiceDataPdf.loanAmount}
			</Text>
			<Text style={[styles.subtitleHeader, { fontWeight: "extrabold" }]}>
				Loan %: {invoiceDataPdf.loanPercent}
				<Text></Text>
			</Text>
			<Text style={styles.subtitleHeader}>
				Interest Payment: {invoiceDataPdf.regular}
			</Text>
		</View>
	</View>
);
