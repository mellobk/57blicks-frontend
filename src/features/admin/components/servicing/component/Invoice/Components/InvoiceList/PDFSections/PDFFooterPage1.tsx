import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
	loanSection: {
		paddingTop: 100,
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
		height: 300,
		width: 550,
		paddingLeft: 20,
		fontSize: 20,
		paddingTop: 150,
	},
	block2: {
		width: 200,
		paddingLeft: 20,
	},
});

export const PDFFooterPage1 = (): JSX.Element => (
	<View>
		<View style={[styles.block]}>
			<Text>
				Thank you for choosing DKC Lending for your private financing needs! We
				are happy to be your loan servicing company, please read the following
				for future interest payment instructions for the duration of the loan.
			</Text>
		</View>
		<View style={[styles.block2]}>
			<Text>Table Breakdown</Text>
		</View>
	</View>
);
