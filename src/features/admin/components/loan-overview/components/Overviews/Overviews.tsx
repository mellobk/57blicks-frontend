import { type FC, useState } from "react";
import { DueToDraws } from "@/features/admin/components/loan-overview/components/DueToDraws/DueToDraws";
import { Subtitle } from "@/features/admin/components/loan-overview/components/Subtitle/Subtitle";
import { Value } from "@/features/admin/components/loan-overview/components/Value/Value";
import type { ILoanOverview } from "../../types/fields";

type Props = {
	data: ILoanOverview;
};

export const Overviews: FC<Props> = ({ data }) => {
	const [openDueToDrawsModal, setOpenDueToDrawsModal] =
		useState<boolean>(false);

	return (
		<>
			<div className="rounded-2xl bg-white">
				<Subtitle text="Principle Overview" />
				<Value label="Total Loans" value={data.principleOverview.totalLoans} />
				<Value
					label="Loans Drawn Down"
					value={data.principleOverview.loansDrawnDown}
				/>
				<Value
					label="Due to Draws"
					action={() => {
						setOpenDueToDrawsModal(true);
					}}
					value={data.principleOverview.dueToDraws}
				/>
				<Value
					label="Check and Balance"
					value={data.principleOverview.checkAndBalance}
					checkAndBalance
				/>
			</div>
			<div className="rounded-2xl bg-white">
				<Value label="Trust Account Balance" value={data.trustAccountBalance} />
			</div>
			<div className="rounded-2xl bg-white">
				<Subtitle text="Interest Overview" />
				<Value
					label="Total Collectibles"
					value={data.interestOverview.totalCollectibles}
				/>
				<Value
					label="Total Participants Payable"
					value={data.interestOverview.totalParticipantsPayable}
				/>
				<Value
					label="Servicing Fee"
					value={data.interestOverview.servicingFee}
				/>
				<Value label="Yield Spread" value={data.interestOverview.yieldSpread} />
				<Value
					label="Check and Balance"
					value={data.interestOverview.checkAndBalance}
					checkAndBalance
				/>
			</div>

			<DueToDraws
				data={data}
				openModal={openDueToDrawsModal}
				setOpenModal={setOpenDueToDrawsModal}
			/>
		</>
	);
};
