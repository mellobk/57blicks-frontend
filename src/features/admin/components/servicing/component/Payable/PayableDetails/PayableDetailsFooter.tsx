/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import type { FC } from "react";
import type { PayableDetail } from "../types/payable-details";
import { moneyFormat } from "@/utils/formats";

interface PayableDetailsFooterProps {
	payableDetail: Array<PayableDetail>;
}

const PayableDetailsFooter: FC<PayableDetailsFooterProps> = ({
	payableDetail,
}) => {
	const [totalDebit, setTotalDebit] = useState(0);
	const [totalCredit, setTotalCredit] = useState(0);

	const getDebitTotal = (): void => {
		let debit = 0;
		let credit = 0;

		payableDetail.forEach((item) => {
			debit += Number.parseFloat(`${item.debit}`);
			credit += Number.parseFloat(`${item.credit}`);
		});

		setTotalDebit(debit);
		setTotalCredit(credit);
	};

	useEffect(() => {
		getDebitTotal();
	}, [payableDetail]);

	return (
		<>
			<div
				className={`w-full flex flex-row h-[40px]  pb-2 pt-[6px] pl-4   gap-4  bg-gray-200  font-semibold rounded-b-xl mb-4`}
				style={{ borderBottom: "2px solid #F3F7F9" }}
			>
				<div className="w-[20%] "></div>
				<div className="w-[10%] "></div>
				<div className="w-[7%] "></div>
				<div className="w-[7%] "></div>
				<div className="w-[10%] text-right">{moneyFormat(totalDebit)}</div>
				<div className="w-[10%] text-right">{moneyFormat(totalCredit)}</div>
				<div className="w-[5%] text-right"></div>
				<div className="w-[10%] text-right"></div>
				<div className="w-[10%] text-right"></div>
			</div>
		</>
	);
};

export default PayableDetailsFooter;
