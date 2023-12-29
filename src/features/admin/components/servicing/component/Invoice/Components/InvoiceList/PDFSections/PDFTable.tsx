import { StyleSheet, Text, View } from "@react-pdf/renderer";

import type { FC } from "react";
import type { InvoiceDataPdf } from "../../../types";

const styles = StyleSheet.create({
	table: {
		display: "flex",
		width: "auto",
		borderStyle: "solid",
		borderWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		marginRight: 20,
		marginLeft: 0,
	},
	tableRowHeader: {
		margin: "auto",
		flexDirection: "row",
		backgroundColor: "#EDF3F5",
		height: 25,
	},
	tableRow: {
		margin: "auto",
		flexDirection: "row",
		borderBottomWidth: 0.1,
		height: 25,
		textAlign: "left",
	},

	tableColDueDate: {
		width: "15%",
		borderStyle: "solid",
		borderWidth: 0,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		textAlign: "left",
	},
	tableColDEscription: {
		width: "25%",
		borderStyle: "solid",
		borderWidth: 0,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		textAlign: "left",
	},
	tableColMonthly: {
		width: "15%",
		borderStyle: "solid",
		borderWidth: 0,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		textAlign: "left",
	},

	tableColFee: {
		width: "15%",
		borderStyle: "solid",
		borderWidth: 0,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		textAlign: "left",
	},
	tableColDue: {
		width: "10%",
		borderStyle: "solid",
		borderWidth: 0,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		textAlign: "left",
	},

	tableColPaid: {
		width: "10%",
		borderStyle: "solid",
		borderWidth: 0,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		textAlign: "left",
	},

	tableCell: {
		margin: "auto",
		marginTop: 5,
		fontSize: 10,
	},
	tableCellMoney: {
		marginTop: 5,
		fontSize: 10,
		alignItems: "flex-end",
		textAlign: "right",
		marginRight: 20,
	},
});

interface PDFTableProps {
	invoiceDataPdf: InvoiceDataPdf;
}

export const PDFTable: FC<PDFTableProps> = ({
	invoiceDataPdf,
}): JSX.Element => (
	<View style={styles.table}>
		<View style={styles.tableRowHeader}>
			<View style={styles.tableColDueDate}>
				<Text style={styles.tableCell}>Due Date</Text>
			</View>
			<View style={styles.tableColDEscription}>
				<Text style={styles.tableCell}>Description</Text>
			</View>
			<View style={styles.tableColMonthly}>
				<Text style={styles.tableCell}>Monthly Interest</Text>
			</View>
			<View style={styles.tableColFee}>
				<Text style={styles.tableCell}>Late Fees</Text>
			</View>
			<View style={styles.tableColDue}>
				<Text style={styles.tableCell}>Due</Text>
			</View>
			<View style={styles.tableColPaid}>
				<Text style={styles.tableCell}>Paid</Text>
			</View>
		</View>

		{invoiceDataPdf.details.map((detail, index) => (
			<View style={styles.tableRow} key={index}>
				<View style={styles.tableColDueDate}>
					<Text style={styles.tableCell}>{detail.dueDate}</Text>
				</View>
				<View style={styles.tableColDEscription}>
					<Text style={styles.tableCell}>{detail.description}</Text>
				</View>
				<View style={styles.tableColMonthly}>
					<Text style={styles.tableCell}>{invoiceDataPdf.loanPercent}</Text>
				</View>
				<View style={styles.tableColFee}>
					<Text style={styles.tableCell}>{detail.lateFee}</Text>
				</View>
				<View style={styles.tableColDue}>
					<Text style={styles.tableCellMoney}>{detail.paid}</Text>
				</View>
				<View style={styles.tableColPaid}>
					<Text style={styles.tableCellMoney}>{detail.due}</Text>
				</View>
			</View>
		))}
	</View>
);
