import { type FC, useEffect, useState } from "react";
import { Control, useWatch } from "react-hook-form";
import LogoNavy from "@/assets/images/png/LogoNavy.png";
import { Detail } from "@/features/opportunities/components/CreateOpportunity/DocumentPreview/Detail/Detail.tsx";
import { Subtitle } from "@/features/opportunities/components/CreateOpportunity/DocumentPreview/Subtitle/Subtitle.tsx";
import { Opportunity } from "@/features/opportunities/types/fields.ts";
import { moneyFormat } from "@/utils/formats.ts";

interface Props {
	control: Control<Opportunity>;
}

export const DocumentPreview: FC<Props> = ({ control }) => {
	const [imagePreview, setImagePreview] = useState<any>(null);
	const form = useWatch({ control });

	useEffect(() => {
		if (form.image?.[0]) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(form.image?.[0]);
		} else {
			setImagePreview(null);
		}
	}, [form.image]);

	return (
		<div className="p-6 rounded-r-2xl bg-gold-300">
			<div className="w-[660px] h-[840px] px-20 py-2 bg-white">
				<div className="flex flex-col items-center">
					<img width="50%" src={LogoNavy} alt="DKC Logo" />
					<h1 className="my-1 text-primary-500 font-extrabold text-base">
						New Loan Investment Opportunity{" "}
						{form.postTitle ? ` - ${form.postTitle}` : ""}
					</h1>
				</div>
				<div className="flex flex-col my-4">
					<Subtitle
						subtitle={`Collateral: ${form.investmentCollateral || ""}`}
					/>
					<Subtitle subtitle={`Borrower: ${form.investmentBorrower || ""}`} />
				</div>
				<p className="text-primary-500 text-xs">{form.investmentSummary}</p>
				<div className="grid grid-cols-2 my-4">
					<div>
						<Subtitle subtitle="Loan Details:" />
						<Detail
							title="Asset Value"
							value={
								Number(form.assetValue)
									? moneyFormat(Number(form.assetValue))
									: ""
							}
						/>
						<Detail
							title="Loan Amount"
							value={
								Number(form.loanAmount)
									? moneyFormat(Number(form.loanAmount))
									: ""
							}
						/>
						<Detail
							title="Loan to Value"
							value={
								Number(form.loanToValue) ? `${Number(form.loanToValue)}%` : ""
							}
						/>
						<Detail title="Term" value={form.loanTerm} />
						<Detail title="Type" value={form.loanType} />
						<Detail
							title="Prepayment Penalty"
							value={form.investmentPermanentPenalty}
						/>
						<Detail
							title="Interest Offered to Participant"
							value={
								Number(form.investmentMonthlyInterestedOfferedToParticipant)
									? `${Number(
											form.investmentMonthlyInterestedOfferedToParticipant
									  )}%`
									: ""
							}
						/>
					</div>
					<div>
						{imagePreview ? (
							<img
								src={imagePreview}
								alt="Selected Preview"
								style={{ width: "100%", height: "auto" }}
							/>
						) : null}
					</div>
				</div>
				<div className="flex flex-col my-4">
					<Subtitle subtitle="Participation Opportunities:" />
					{form.participantOpportunities?.["99%"] && (
						<div className="flex flex-row text-primary-500 text-xs">
							<div className="font-semibold">99%</div> - {" "}
							{moneyFormat(Number(form.participantOpportunities?.["99%"]))}
						</div>
					)}
					{form.participantOpportunities?.["75%"] && (
						<div className="flex flex-row text-primary-500 text-xs">
							<div className="font-semibold">75%</div> - {" "}
							{moneyFormat(Number(form.participantOpportunities?.["75%"]))}
						</div>
					)}
					{form.participantOpportunities?.["50%"] && (
						<div className="flex flex-row text-primary-500 text-xs">
							<div className="font-semibold">50%</div> - {" "}
							{moneyFormat(Number(form.participantOpportunities?.["50%"]))}
						</div>
					)}
				</div>
				<div className="flex flex-col my-4">
					<Subtitle subtitle="Notes On The Borrower:" />
					<Detail title="Borrower" value={form.investmentBorrower} />
					<Detail title="DKC Repeat Borrower" value={form.dkcRepeatBorrower} />
					<Detail
						title="Borrower Background"
						value={form.investmentBorrowerBackground}
					/>
				</div>
				<div className="flex flex-col my-4">
					<Subtitle subtitle="Additional Documents:" />
					<p className="text-primary-500 text-xs">
						{form.additionalInformation}
					</p>
				</div>
			</div>
		</div>
	);
};
