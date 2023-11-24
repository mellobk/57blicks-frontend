import { StyleSheet, Text, View } from "@react-pdf/renderer";

import type { FC } from "react";
import { InvoiceDataPdf } from "../../../types";
import { round } from "@/utils/common-functions";

const styles = StyleSheet.create({
	loanSection: {
		paddingTop: 150,
	},
	textRight: {
		color: "#0E2130",
		fontSize: 20,
		fontWeight: "extrabold",
		alignContent: "stretch",
		textAlign: "right",
		paddingBottom: 10,
		paddingRight: 5,
		paddingTop: 4,
	},
	textLeft: {
		position: "absolute",
		color: "#00BA35",
		paddingLeft: 10,
		paddingTop: 4,
	},
	textLeftSuccess: {
		fontSize: 18,
		fontWeight: "extrabold",
		alignContent: "stretch",
		textAlign: "left",
		paddingBottom: 10,
		backgroundColor: "#DCF5E6",
		borderRadius: 20,

		paddingLeft: 10,
		height: 30,
	},
	textLeftPercent: {
		fontSize: 18,
		fontWeight: "extrabold",
		alignContent: "stretch",
		textAlign: "left",
		paddingBottom: 10,
		backgroundColor: "#DCF5E6",
		borderRadius: 20,
		width: 60,
		paddingLeft: 10,
		height: 30,
	},

	textLeftInterest: {
		fontSize: 18,
		fontWeight: "extrabold",
		alignContent: "stretch",
		textAlign: "left",
		paddingBottom: 10,
		backgroundColor: "#F4F2EC",
		borderRadius: 20,

		paddingLeft: 10,
		height: 30,
	},
	content: {
		padding: 10,
		"@media max-width: 400": {
			flexDirection: "column",
		},
		"@media min-width: 400": {
			flexDirection: "row",
		},
	},
	block: {
		height: 40,
		width: 280,
	},
	block2: {
		height: 80,
		width: 80,
	},
});

interface BodyPage1PDFProps {
	invoiceDataPdf: InvoiceDataPdf;
}

const getLength = (value: string): number => {
	return value.length;
};
export const BodyPage1PDF: FC<BodyPage1PDFProps> = ({
	invoiceDataPdf,
}): JSX.Element => (
	<View style={styles.loanSection}>
		<View style={styles.content}>
			<View style={[styles.block]}>
				<Text style={styles.textRight}>Loan Amount:</Text>
			</View>
			<View style={[styles.block]}>
				<Text
					style={[
						styles.textLeftSuccess,
						{ width: getLength(invoiceDataPdf.loanAmount) * (100 / 8) },
					]}
				></Text>
				<Text style={styles.textLeft}>{invoiceDataPdf.loanAmount}</Text>
			</View>
		</View>
		<View style={styles.content}>
			<View style={[styles.block]}>
				<Text style={styles.textRight}>Loan Percent:</Text>
			</View>
			<View style={[styles.block]}>
				<Text style={styles.textLeftPercent}></Text>
				<Text style={styles.textLeft}>
					{invoiceDataPdf.loanPercent}
					{round(Number(invoiceDataPdf.loanPercent), 1)}
				</Text>
			</View>
		</View>
		<View style={styles.content}>
			<View style={[styles.block]}>
				<Text style={styles.textRight}>Interest Payment:</Text>
			</View>
			<View style={[styles.block]}>
				<Text
					style={[
						styles.textLeftInterest,
						{ width: getLength(invoiceDataPdf.interestPayment) * (100 / 8) },
					]}
				></Text>
				<Text style={[styles.textLeft, { color: "#C79E63" }]}>
					{invoiceDataPdf.interestPayment}
				</Text>
			</View>
		</View>
	</View>
);
