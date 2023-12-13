import { Cell } from "@/components/table/Cell";
import type { ComponentType } from "react";
import type { Loan } from "@/types/api/loan";
import moment from "moment";

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
	const totalAmount = data.reduce(
		(accumulator, current) => accumulator + Number(current.totalLoanAmount),
		0
	);
	const totalInvestorEquity = data.reduce(
		(accumulator, current) =>
			accumulator + Number(current.participationBreakdowns[0]?.amount),
		0
	);

	const totalRegularPayment = data.reduce(
		(accumulator, current) =>
			accumulator + Number(current.participationBreakdowns[0]?.regular),
		0
	);

	//if loan.originationDate is equial to actual month, then add sum loan.prorated else add sum loan.regular
	const current = data.reduce((accumulator, current) => {
		return moment(current.originationDate).toDate().getMonth() ===
			new Date().getMonth()
			? accumulator + Number(current.participationBreakdowns[0]?.prorated)
			: accumulator + Number(current.participationBreakdowns[0]?.regular);
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
