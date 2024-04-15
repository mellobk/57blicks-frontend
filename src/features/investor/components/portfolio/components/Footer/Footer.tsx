/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Cell } from "@/components/table/Cell";
import type { ComponentType } from "react";
import type { Loan } from "@/types/api/loan";
import moment from "moment";
import userStore from "@/stores/user-store";
import { compareFormatOriginationDate } from "@/utils/formats";

interface Props {
	data: Array<Loan>;
}

interface TotalInvestorLoanFooter {
	totalAmount: number;
	totalInvestorEquity: number;
	totalRegularPayment: number;
	current: number;
}

const getFooterData = (data: Array<Loan>): TotalInvestorLoanFooter => {
	const dateFormat = "YYYY-MM-DD"; // This is the format of your date strings
	const currentDate = moment(); // Current date
	const beforeCurrentMonth = moment().subtract(1, "month").month();
	const userInfo = userStore((state) => state.loggedUserInfo);

	const findFundingData = (data: Array<any>) => {
		const findData = data.find(
			(data) => data.investor.id === userInfo?.investor?.id
		);

		return findData;
	};

	const currentValuePayableInvestor = (loan: any) => {
		const loanEndDateMoment = moment(loan.endDate).month();
		const loanCurrentMonth = moment().subtract(1, "months").month();
		let data = "0";

		const findMonth = loan.payables?.find(
			(data: { [x: string]: moment.MomentInput }) => {
				// Extract the month and year from the date string
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				const dataMonth = moment(data["month"], dateFormat);
				// Check if year and month are the same as the current date
				return (
					dataMonth.year() === currentDate.year() &&
					dataMonth.month() === beforeCurrentMonth
				);
			}
		);

		data = findMonth?.payableDetails?.find(
			(payableData: { investor: any; type: string }) => {
				return (
					payableData.type === "Investor" &&
					payableData?.investor?.id === userInfo?.investor?.id
				);
			}
		)?.credit;

		if (loan.endDate && loanEndDateMoment < loanCurrentMonth) {
			data =
				/* String((Number(value.loan.principal) * 18) / 100 / 12) */ "000000.1";
		}

		if (compareFormatOriginationDate(loan?.originationDate)) {
			data =
				/* String((Number(value.loan.principal) * 18) / 100 / 12) */ "000000.1";
		}

		return Number.parseFloat(data || "0");
	};

	const totalAmount = data.reduce(
		(accumulator, current) => accumulator + Number(current.totalLoanAmount),
		0
	);
	const totalInvestorEquity = data.reduce(
		(accumulator, current) =>
			accumulator +
			Number(
				current.participationBreakdowns
					? current.participationBreakdowns[0]?.amount
					: current.fundingBreakDowns[0]?.amount || 0
			),
		0
	);

	const totalRegularPayment = data.reduce(
		(accumulator, current) =>
			accumulator +
			Number(
				current.participationBreakdowns
					? current.participationBreakdowns[0]?.regular
					: current.fundingBreakDowns[0]?.regular || 0
			),
		0
	);

	const current = data.reduce((accumulator, current) => {
		return (
			accumulator +
			Number(
				currentValuePayableInvestor(current) ||
					findFundingData(current.participationBreakdowns).regular
			)
		);
	}, 0);

	return {
		totalAmount,
		totalInvestorEquity,
		totalRegularPayment,
		current,
	};
};

export const Footer: ComponentType<Props> = ({ data }) => {
	const footerData = getFooterData(data);

	return (
		<div className="flex flex-row h-12 bg-gray-200 rounded-b-2xl">
			<div className="grid grid-cols-8 w-full items-center">
				<Cell format="text" value={`Total: ${data.length}`} bold />
				<Cell format="money" value={footerData.totalAmount} bold />
				<Cell format="money" value={footerData.totalInvestorEquity} bold />
				<Cell format="text" value={"-"} bold />
				<Cell format="money" value={footerData.totalRegularPayment} bold />
				<Cell format="text" value="--" bold />
				<Cell format="text" value="--" bold />
				<Cell
					className="bg-gold-500/[12%] text-gold-500"
					format="money"
					value={footerData.current}
					bold
				/>
			</div>
		</div>
	);
};
