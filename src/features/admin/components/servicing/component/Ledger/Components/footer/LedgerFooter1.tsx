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
			if (ledger.typeOfPayment === LedgerTypeOfPayment.PRINCIPAL) {
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
			<div className="w-[98%] absolute bottom-[65px] rounded-xl">
				<table className="w-full  rounded-xl bg-white flex flex-col justify-between  ">
					<tfoot className="bg-gray-200 h-10 ">
						<tr>
							<td
								style={{
									width: "460px",
									paddingLeft: "200px",
									verticalAlign: "middle",
									textAlign: "left",
									paddingTop: "5px",
									fontWeight: "bold",
								}}
							>
								Current Balances
							</td>
							<td style={{ width: "100px", paddingLeft: "20px" }}></td>
							<td style={{ width: "230px", paddingLeft: "20px" }}></td>
							<td
								style={{
									width: "260px",
									paddingLeft: "20px",
									fontWeight: "bold",
								}}
							>
								{moneyFormat(totals.debits) || "$ 0"}
							</td>
							<td
								style={{
									width: "220px",
									paddingLeft: "20px",
									fontWeight: "bold",
								}}
							>
								{moneyFormat(totals.credits) || "$ 0"}
							</td>
							<td
								style={{
									width: "150px",
									paddingLeft: "20px",
									fontWeight: "bold",
								}}
							>
								{moneyFormat(totals.balance) || "$ 0"}
							</td>
							<td style={{ width: "10px" }}></td>
						</tr>
					</tfoot>
				</table>
			</div>
		</>
	);
};

export default LedgerFooter1;
