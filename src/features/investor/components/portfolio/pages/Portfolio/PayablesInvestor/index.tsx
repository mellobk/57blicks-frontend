/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {
	type ColumInvestorPayable,
	getLoanColumnsInvestor,
} from "@/utils/investors";

import type { FC } from "react";
import InvestorsService from "@/api/investors";
import type { Loan } from "@/types/api/loan";
import type { Payable } from "@/features/admin/components/servicing/component/Payable/types";
import { Table } from "@/components/ui/Table";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Loading from "@/assets/icons/loading";

interface PayablesInvestorProps {
	year: number;
	loan?: Array<Loan>;
}

const fillDataLoansPayables = (
	payables: Array<Payable>,
	loan: Array<Loan>
): Array<ColumInvestorPayable> => {
	const data: Array<ColumInvestorPayable> = [];
	loan?.forEach((item) => {
		data.push({
			borrower: item.borrower?.user.firstName || "",
			loanId: item.id || "",
			january: 0,
			february: 0,
			march: 0,
			april: 0,
			may: 0,
			june: 0,
			july: 0,
			august: 0,
			september: 0,
			october: 0,
			november: 0,
			december: 0,
			total: 0,
		});
	});

	payables.forEach((payable) => {
		//get the mont in test moment
		const mont = moment(payable.month).format("MMMM").toLocaleLowerCase();
		const value: number =
			(payable.payableDetails
				? payable.payableDetails[0]?.credit
				: undefined) || 0;
		//get the index of the month
		const index =
			data.findIndex((item) => item.loanId === payable.loan?.id) || -1;
		//set the value in the index of the month in the array

		try {
			const key = mont as keyof ColumInvestorPayable;
			data[index]![key] = value as never;
		} catch {
			/* empty */
		}
	});

	//sum all rows in the array and set the total
	data.forEach((item) => {
		let total = 0;
		for (const key in item) {
			if (key !== "loanId" && key !== "borrower") {
				total += Number(item[key as keyof ColumInvestorPayable]) || 0;
			}
		}

		item.total = total;
	});

	return data;
};

const PayablesInvestor: FC<PayablesInvestorProps> = ({ year, loan }) => {
	const investorsQuery = useQuery(["payables-by-investors"], () =>
		InvestorsService.getPayablesByInvestor(year)
	);

	useEffect(() => {
		investorsQuery.refetch();
	}, [year]);

	if (investorsQuery.isLoading || investorsQuery.isFetching) {
		return (
			<div className="flex flex-col rounded-3xl bg-white gap-6 divide-y divide-gray-200 w-screen p-6 h-full overflow-y-auto">
				<div className="flex flex-col w-full  items-center justify-items-center justify-center">
					<div>
						<Loading />
					</div>
					<div className="pt-6">Saving please wait...</div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<Table
				className="flex flex-col bg-white rounded-2xl p-0 m-0 overflow-y-auto"
				columns={getLoanColumnsInvestor()}
				data={fillDataLoansPayables(investorsQuery.data || [], loan || [])}
				progressPending={false}
				fixedHeader
			/>
		</div>
	);
};

export default PayablesInvestor;
