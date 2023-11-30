/* eslint-disable react-hooks/exhaustive-deps */
import { useState, type FC, useEffect } from "react";
import { LedgerTypeOfPayment, type Ledgers } from "../../types";
import { moneyFormat } from "@/utils/formats";

interface LedgerFooter1Props {
	ledgers: Array<Ledgers>;
}

const LedgerFooter1: FC<LedgerFooter1Props> = ({ ledgers }) => {
	const [, setLength] = useState(0);
	const [totals, setTotals] = useState({
		debits: 0,
		credits: 0,
		balance: 0,
	});

	const calculateTotals = (): void => {
		let debits = 0;
		let credits = 0;
		let balance = 0;
		let lengthLedger = 0;
		ledgers.forEach((ledger) => {
			if (ledger.typeOfPayment !== LedgerTypeOfPayment.CONSTRUCTION_HOLD_BACK) {
				debits += Number(ledger.debit);
				credits += Number(ledger.credit);
				lengthLedger += 1;
			}
		});
		balance += credits - debits;
		setLength(lengthLedger);
		setTotals({
			debits,
			credits,
			balance,
		});
	};

	useEffect(() => {
		calculateTotals();
	}, [ledgers]);

	return (
		<>
			<div className="w-[97%] absolute bottom-[60px] rounded-xl text-[14px] text-black">
				<ul className="">
					<li
						className={`w-full flex flex-row   pb-1 pt-[6px] pl-4   gap-4 bg-gray-200 font-semibold h-10`}
					>
						<div className="w-[53%] text-center ">Current Balances</div>
						<div className="w-[15%] text-right">
							{moneyFormat(totals.debits) || "$ 0"}
						</div>
						<div className="w-[15%] text-right |">
							{moneyFormat(totals.credits) || "$ 0"}
						</div>
						<div className="w-[15%] text-right">
							{moneyFormat(totals.balance) || "$ 0"}
						</div>
						<div className="w-[15%] text-right"></div>
					</li>
				</ul>
			</div>
		</>
	);
};

export default LedgerFooter1;
