import { useEffect, type FC } from "react";
import Loading from "@/assets/icons/loading";
import type { LoanHistory } from "../../../types/api";
import ManageLoanHistoricalService from "../../../api/loan-historical";
import { useQuery } from "@tanstack/react-query";

interface ExtendedLoanQueryProps {
	setExtended: (value: Array<LoanHistory>) => void;
	loanId: string;
}

const ExtendedLoanQuery: FC<ExtendedLoanQueryProps> = ({
	setExtended,
	loanId,
}) => {
	const { refetch, isLoading } = useQuery(
		["get-loan-historical-by-loan"],
		() => {
			return ManageLoanHistoricalService.getLoanHistoricalLoanId({
				id: loanId || "",
				url: "",
			});
		},
		{
			onSuccess: (data) => {
				if (data) setExtended(data);
			},
		}
	);

	useEffect(() => {
		void refetch();
	}, [loanId]);

	return <>{isLoading && <Loading />}</>;
};

export default ExtendedLoanQuery;
