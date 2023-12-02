import { useState, type FC, useEffect } from "react";
import type { PayableDetail } from "@/features/admin/components/servicing/component/Payable/types/payable-details";
import { PayableType } from "@/features/admin/components/servicing/component/Payable/types";
import PayableInvestorsDetail from "./PayableInvestorsDetail";

interface PayableInvestorsProps {
	payableDetails: Array<PayableDetail>;
}

const PayableInvestors: FC<PayableInvestorsProps> = ({ payableDetails }) => {
	const [payableDetailsInvestors, setPayableDetailsInvestors] = useState<
		Array<PayableDetail>
	>([]);

	useEffect(() => {
		//loop payableDetails if 	payableDetails.type = "Investor" then push to payableDetailsInvestors array
		const payableDetailsInvestors: Array<PayableDetail> = [];
		payableDetails.forEach((payableDetail) => {
			if (payableDetail.type === PayableType.INVESTOR) {
				payableDetailsInvestors.push(payableDetail);
			}
		});
		setPayableDetailsInvestors(payableDetailsInvestors);
	}, [payableDetails]);

	return (
		<>
			{payableDetailsInvestors.map((payableDetailsInvestor) => {
				return (
					<PayableInvestorsDetail payableDetail={payableDetailsInvestor} />
				);
			})}
		</>
	);
};

export default PayableInvestors;
