import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";

import type { FC } from "react";
const styles = StyleSheet.create({
	servicing: {
		display: "flex",
		width: 520,
		marginLeft: 20,
		marginRight: 20,
	},
	paragraph: {
		fontSize: 15,
		margin: "auto",
		flexDirection: "row",
		marginTop: 10,
		marginBottom: 10,
	},
	paragraphList: {
		fontSize: 15,
		margin: "auto",
		flexDirection: "row",

		marginBottom: 10,
		marginRight: 30,
		fontWeight: "bold",
	},
	paragraphLink: {
		fontSize: 15,
		margin: "auto",
		flexDirection: "row",
		marginTop: 10,
		marginBottom: 10,
		marginRight: 30,
		fontWeight: "bold",
		textAlign: "left",
	},
});

interface PDFServicingNoticeProps {
	link: string;
}
export const PDFServicingNotice: FC<PDFServicingNoticeProps> = ({
	link,
}): JSX.Element => (
	<View style={styles.servicing}>
		<View style={styles.paragraph}>
			<Text>
				Thank you for selecting DKC Lending for your private financing needs. We
				look forward to continuing our relationship with you and hope you have
				had a great experience thus far with DKC Lending
			</Text>
		</View>
		<View style={styles.paragraph}>
			<Text>
				DKC Lending will be your loan servicing company for the duration of your
				note &mortgage. In our best efforts to provide value, and security and
				to keep servicing fees as low as possible, we require direct ACH
				payments to be automatically collected from borrowers' previously
				provided and authorized accounts, each month
			</Text>
		</View>
		<View style={{ flexDirection: "row", marginBottom: 4 }}>
			<Text style={{ marginHorizontal: 8 }}>•</Text>
			<Text style={styles.paragraphList}>
				All payments are due on the 1st of the month and become late by the 5th
				day of the month
			</Text>
		</View>

		<View style={{ flexDirection: "row", marginBottom: 4 }}>
			<Text style={{ marginHorizontal: 8 }}>•</Text>
			<Text style={styles.paragraphList}>
				Late Payments will result in late fees that will be fully enforced. The
				late fee charged will correlate with your note and mortgage.
			</Text>
		</View>

		<View style={{ flexDirection: "row", marginBottom: 4 }}>
			<Text style={{ marginHorizontal: 8 }}>•</Text>
			<Text style={styles.paragraphList}>
				It is the borrower's responsibility to inform us of any bank account
				changes so as to not delay receipt of payment or incur additional fees.
			</Text>
		</View>

		<View style={{ flexDirection: "row", marginBottom: 4 }}>
			<Text style={{ marginHorizontal: 8 }}>•</Text>
			<Text style={styles.paragraphList}>
				We will not accept wire transfers or checks for interest payments.
			</Text>
		</View>

		<View style={{ flexDirection: "row", marginBottom: 4 }}>
			<Text style={{ marginHorizontal: 8 }}>•</Text>
			<Text style={styles.paragraphList}>
				For any questions, please reach out to us by email at
				info@dkclending.com and we will get back to you promptly.
			</Text>
		</View>

		<View style={styles.paragraph}>
			<Text>
				As you may know, reputation, reviews and referrals are the lifeblood of
				our company. We strive to keep a high standard of service and to provide
				an excellent experience for all of our borrowers.
			</Text>
		</View>

		<View style={styles.paragraph}>
			<Text>
				If our services met your expectations, please feel free to use the link
				below to provide a Google review.
			</Text>
		</View>

		<View style={styles.paragraphLink}>
			<Link src={link}>DKC Lending Google Review Link</Link>
		</View>
	</View>
);
