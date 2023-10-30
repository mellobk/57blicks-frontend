import { type FC, useEffect, useState } from "react";
import { type Control, useWatch } from "react-hook-form";
import {
	Document,
	Image,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";
import LogoNavy from "@/assets/images/png/LogoNavy.png";
import { Detail } from "@/features/admin/components/opportunities/components/CreateOpportunity/DocumentPreview/Detail/Detail.tsx";
import { Subtitle } from "@/features/admin/components/opportunities/components/CreateOpportunity/DocumentPreview/Subtitle/Subtitle.tsx";
import type { Opportunity } from "@/features/admin/components/opportunities/types/fields.ts";
import { moneyFormat, percentageFormat } from "@/utils/formats.ts";

interface Props {
	control: Control<Opportunity>;
}

const styles = StyleSheet.create({
	body: {
		marginHorizontal: 80,
	},
	column: {
		width: "50%",
	},
	columns: {
		flexDirection: "row",
		marginVertical: 10,
	},
	header: {
		alignItems: "center",
		margin: 10,
	},
	logo: {
		width: "50%",
		marginBottom: 8,
	},
	section: {
		marginVertical: 10,
	},
	text: {
		fontSize: 12,
	},
	title: {
		fontSize: 18,
		fontWeight: "extrabold",
	},
});

export const DocumentPreview: FC<Props> = ({ control }) => {
	const [image, setImage] = useState<any>(null);
	const form = useWatch({ control });

	useEffect(() => {
		if (form.image?.[0]) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(form.image?.[0]);
		} else {
			setImage(null);
		}
	}, [form.image]);

	return (
		<Document>
			<Page size="A4">
				<View style={styles.header}>
					<Image src={LogoNavy} style={styles.logo} />
					<Text style={styles.title}>
						New Loan Investment Opportunity{" "}
						{form.postTitle ? ` - ${form.postTitle}` : ""}
					</Text>
				</View>
				<View style={styles.body}>
					<View style={styles.section}>
						<Subtitle
							subtitle={`Collateral: ${form.investmentCollateral || ""}`}
						/>
						<Subtitle subtitle={`Borrower: ${form.investmentBorrower || ""}`} />
					</View>
					{form.investmentSummary && (
						<View style={styles.section}>
							<Text style={styles.text}>{form.investmentSummary}</Text>
						</View>
					)}
					<View style={styles.columns}>
						<View style={styles.column}>
							<View style={styles.section}>
								<Subtitle subtitle="Loan Details:" />
								<Detail
									title="Asset Value"
									value={moneyFormat(Number(form.assetValue), false)}
								/>
								<Detail
									title="Loan Amount"
									value={moneyFormat(Number(form.loanAmount), false)}
								/>
								<Detail
									title="Loan to Value"
									value={percentageFormat(Number(form.loanToValue))}
								/>
								<Detail title="Term" value={form.loanTerm} />
								<Detail title="Type" value={form.loanType} />
								<Detail
									title="Prepayment Penalty"
									value={form.investmentPermanentPenalty}
								/>
								<Detail
									title="Interest Offered to Participant"
									value={percentageFormat(
										Number(form.investmentMonthlyInterestedOfferedToInvestor)
									)}
								/>
							</View>
							<View style={styles.section}>
								<Subtitle subtitle="Participation Opportunities:" />
								{form.participantOpportunities?.["99%"] && (
									<Detail
										title="99%"
										value={moneyFormat(
											Number(form.participantOpportunities?.["99%"]),
											false
										)}
									/>
								)}
								{form.participantOpportunities?.["75%"] && (
									<Detail
										title="75%"
										value={moneyFormat(
											Number(form.participantOpportunities?.["75%"]),
											false
										)}
									/>
								)}
								{form.participantOpportunities?.["50%"] && (
									<Detail
										title="50%"
										value={moneyFormat(
											Number(form.participantOpportunities?.["50%"]),
											false
										)}
									/>
								)}
							</View>
							<View style={styles.section}>
								<Subtitle subtitle="Notes On The Borrower:" />
								<Detail title="Borrower" value={form.investmentBorrower} />
								<Detail
									title="DKC Repeat Borrower"
									value={form.dkcRepeatBorrower}
								/>
								<Detail
									title="Borrower Background"
									value={form.investmentBorrowerBackground}
								/>
							</View>
						</View>
						<View style={styles.column}>{image && <Image src={image} />}</View>
					</View>
					<View style={styles.section}>
						<Subtitle subtitle="Additional Documents:" />
						<Text style={styles.text}>{form.additionalInformation}</Text>
					</View>
				</View>
			</Page>
		</Document>
	);
};
