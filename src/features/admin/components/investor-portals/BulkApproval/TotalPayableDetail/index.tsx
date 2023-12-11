import { useEffect, useState } from "react";

import type { FC } from "react";
import type { PayableApproval } from "../../../servicing/api/payable";
import { moneyFormat } from "@/utils/formats";
import { round } from "@/utils/common-functions";

interface TotalPayableDetailProps {
	payable: Array<PayableApproval>;
}
const TotalPayableDetail: FC<TotalPayableDetailProps> = ({ payable }) => {
	const [totalPayable, setTotalPayable] = useState<number>(0);

	const calculateTotalPayable = () => {
		let total = 0;
		payable.forEach((payableItem) => {
			if (
				payableItem &&
				payableItem.payableDetails &&
				payableItem.payableDetails[0]
			) {
				total += Number(payableItem.payableDetails[0]?.credit);
			}
		});
		setTotalPayable(round(total, 2));
	};

	useEffect(() => {
		calculateTotalPayable();
	}, [payable]);

	return (
		<>
			<div className="flex flex-row w-full bg-gold-100 h-10 pt-2">
				<div className="w-[20%]"></div>
				<div className="w-[45%]"></div>
				<div className="w-[15%] font-bold">Total</div>
				<div className="w-[20%] bg-gold-100 text-gold text-right pr-8 h-8 font-bold">
					{moneyFormat(totalPayable)}
				</div>
			</div>
		</>
	);
};

export default TotalPayableDetail;
