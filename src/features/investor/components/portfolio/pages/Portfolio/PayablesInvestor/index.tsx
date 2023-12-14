/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {
	fillDataLoansPayables,
	getLoanColumnsInvestor,
} from "@/utils/investors";

import type { FC } from "react";
import InvestorsService from "@/api/investors";
import Loading from "@/assets/icons/loading";
import type { Loan } from "@/types/api/loan";
import { Table } from "@/components/ui/Table";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface PayablesInvestorProps {
	year: number;
	loan?: Array<Loan>;
}

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