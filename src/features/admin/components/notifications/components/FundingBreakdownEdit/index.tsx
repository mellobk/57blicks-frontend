import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { FundingBreakdown } from "@/features/admin/components/create-loan/components/FundingBreakdown/FundingBreakdown";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import { LoanSchema } from "@/features/admin/components/create-loan/schemas/LoanSchema";
import ManageNotificationService from "@/features/admin/components/notifications/api/notification";
import type { Notification } from "@/features/admin/components/notifications/types/types";
import type { Loan as LoanApi } from "@/types/api/loan.ts";
import type { Loan as LoanLedger } from "@/features/admin/components/create-loan/types/fields";
import { useWatch } from "react-hook-form";
interface FundingBreakdownEditProps {
	loan: Loan;
	newLoanAmount: number;
	setValidApprove: (validApprove: boolean) => void;
	setLoanUpdated: (loanUpdated: LoanLedger) => void;
}

const getDefaultValues = (loan: LoanApi): Loan => {
	console.log("🚀 ~ file: index.tsx:27 ~ getDefaultValues ~ loan:", loan);
	const loanData: Loan = {
		...loan,
		fundingBreakdown: loan.fundingBreakdowns.map((breakdown) => ({
			...breakdown,
			lenderName: breakdown.lender?.name || "",
			investorId: breakdown.lender?.id || "",
			type: breakdown.type || "",
		})),
		participationBreakdown: loan.participationBreakdowns.map((participant) => ({
			...participant,
			investorId: participant.investor?.id || "",
			lenderName:
				participant.type === "YieldSpread"
					? `Y/S ${participant.investor?.user?.firstName}`
					: participant.investor?.user?.firstName || "",
		})),
	};
	return loanData;
};

export const FundingBreakdownEdit: FC<FundingBreakdownEditProps> = ({
	loan,
	newLoanAmount,
	setValidApprove,
	setLoanUpdated,
}) => {
	const {
		control,
		formState: { errors },
		setValue,
	} = useForm<Loan>({
		defaultValues: getDefaultValues(loan as unknown as LoanApi),
		resolver: zodResolver(LoanSchema),
	});

	const [fundingBreakdown, participationBreakdown] = useWatch({
		control,
		name: ["fundingBreakdown", "participationBreakdown"],
	});

	useEffect(() => {
		setValue("totalLoanAmount", String(newLoanAmount));
	}, [newLoanAmount]);

	useEffect(() => {
		setLoanUpdated &&
			setLoanUpdated({
				...loan,
				fundingBreakdown: fundingBreakdown,
				participationBreakdown: participationBreakdown,
			});
	}, [fundingBreakdown, participationBreakdown]);

	return (
		<>
			<FundingBreakdown
				control={control}
				errors={errors}
				editPrincipal={true}
				newLoanAmount={newLoanAmount}
				remove={() => {}}
				setOpenLenderModal={() => {}}
				setOpenParticipantModal={() => {}}
				setValue={setValue}
				setValidApprove={setValidApprove}
			/>
		</>
	);
};
