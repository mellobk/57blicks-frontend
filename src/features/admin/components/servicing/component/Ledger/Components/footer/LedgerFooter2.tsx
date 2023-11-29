/* eslint-disable react-hooks/exhaustive-deps */
import { useState, type FC, useEffect } from "react";
import { LedgerTypeOfPayment, type Ledgers } from "../../types";
import { moneyFormat } from "@/utils/formats";

interface LedgerFooter1Props {
	ledgers: Array<Ledgers>;
}

const LedgerFooter2: FC<LedgerFooter1Props> = ({ ledgers }) => {
	const [totals, setTotals] = useState({
		debits: 0,
		credits: 0,
		balance: 0,
	});

	const calculateTotals = (): void => {
		let debits = 0;
		let credits = 0;
		let balance = 0;

		ledgers.forEach((ledger) => {
			if (ledger.typeOfPayment === LedgerTypeOfPayment.PRINCIPAL) {
				debits += Number(ledger.debit);
				credits += Number(ledger.credit);
			}
		});
		balance += credits - debits;

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
			<div className="w-[97%] absolute bottom-[25px] rounded-xl text-[14px] text-black">
				<ul className="">
					<li
						className={`w-full flex flex-row   pb-1 pt-[6px] pl-4   gap-4 bg-gray-200 font-semibold rounded-b-xl h-10 rounded-b-xl `}
					>
						<div className="w-[100%] text-center ">
							Total Active Loan Amount: {moneyFormat(totals.balance) || "$ 0"}
						</div>
					</li>
				</ul>
			</div>

			{/* <div className="w-[98%] absolute bottom-[25px] rounded-xl">
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
								Total Active Loan Amount:
							</td>
							<td
								style={{
									width: "260px",
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
			</div> */}
		</>
	);
};

export default LedgerFooter2;
