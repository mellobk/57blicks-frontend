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
import { Detail } from "@/features/admin/components/opportunities/components/CreateOpportunity/DocumentPreview/Detail/Detail";
import { Subtitle } from "@/features/admin/components/opportunities/components/CreateOpportunity/DocumentPreview/Subtitle/Subtitle";
import type { Opportunity } from "@/features/admin/components/opportunities/types/fields";
import { moneyFormat, percentageFormat } from "@/utils/formats";

interface Props {
	control: Control<Opportunity>;
}

const styles = StyleSheet.create({
	body: {
		marginHorizontal: 30,
	},
	column: {
		width: "50%",
	},
	columns: {
		flexDirection: "row",
		marginTop: 5,
	},
	header: {
		alignItems: "center",
		marginTop: 10,
	},
	logo: {
		width: "35%",
		marginBottom: 8,
	},
	longTitle: {
		fontSize: 14,
		fontWeight: "extrabold",
		textAlign: "center",
	},
	page: {
		marginBottom: 10,
	},
	section: {
		marginVertical: 5,
	},
	text: {
		fontSize: 12,
	},
	title: {
		fontSize: 18,
		fontWeight: "extrabold",
		textAlign: "center",
	},
});

export const DocumentPreview: FC<Props> = ({ control }) => {
	const [image, setImage] = useState<any>(null);
	const form = useWatch({ control });

	const removeBlankLines = (text: string) => text.replace(/^\s*[\r\n]/gm, "");

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
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<Image src={LogoNavy} style={styles.logo} />
					<Text style={form.postTitle ? styles.longTitle : styles.title}>
						New Loan Investment Opportunity{" "}
						{form.postTitle ? ` - ${form.postTitle}` : ""}
					</Text>
				</View>

				<View style={styles.body}>
					{(form.investmentCollateral || form.investmentBorrower) && (
						<View style={styles.section}>
							{form.investmentCollateral && (
								<Subtitle
									subtitle={`Collateral: ${form.investmentCollateral || ""}`}
								/>
							)}

							{form.investmentBorrower && (
								<Subtitle
									subtitle={`Borrower: ${form.investmentBorrower || ""}`}
								/>
							)}
						</View>
					)}

					{form.investmentSummary && (
						<View style={styles.section}>
							<Text style={styles.text}>
								{removeBlankLines(form.investmentSummary)}
							</Text>
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
								{form.loanTerm && <Detail title="Term" value={form.loanTerm} />}
								{form.loanType && <Detail title="Type" value={form.loanType} />}
								{form.investmentPermanentPenalty && (
									<Detail
										title="Prepayment Penalty"
										value={form.investmentPermanentPenalty}
									/>
								)}
								<Detail
									title="Interest Offered to Participant"
									value={percentageFormat(
										Number(form.investmentMonthlyInterestedOfferedToInvestor)
									)}
								/>
							</View>

							{(form.participantOpportunities?.["99%"] ||
								form.participantOpportunities?.["75%"] ||
								form.participantOpportunities?.["50%"]) && (
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
							)}

							{(form.investmentBorrower ||
								form.dkcRepeatBorrower ||
								form.investmentBorrowerBackground) && (
								<View style={styles.section}>
									<Subtitle subtitle="Notes On The Borrower:" />
									{form.investmentBorrower && (
										<Detail title="Borrower" value={form.investmentBorrower} />
									)}
									{form.dkcRepeatBorrower && (
										<Detail
											title="DKC Repeat Borrower"
											value={form.dkcRepeatBorrower}
										/>
									)}
									{form.investmentBorrowerBackground && (
										<Detail
											title="Borrower Background"
											value={form.investmentBorrowerBackground}
										/>
									)}
								</View>
							)}
						</View>
						<View style={styles.column}>{image && <Image src={image} />}</View>
					</View>
					{form.additionalInformation && (
						<View style={styles.section}>
							<Subtitle subtitle="Additional Documents:" />
							<Text style={styles.text}>
								{removeBlankLines(form.additionalInformation)}
							</Text>
						</View>
					)}
				</View>
			</Page>
		</Document>
	);
};
