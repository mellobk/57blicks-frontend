import { FC, useState } from "react";
import { DueToDraws } from "@/features/loan-overview/components/DueToDraws/DueToDraws";
import { Subtitle } from "@/features/loan-overview/components/Subtitle/Subtitle";
import { Value } from "@/features/loan-overview/components/Value/Value";
import { LoanOverviewFields } from "@/features/loan-overview/types/fields";

type Props = {
	data: LoanOverviewFields;
};

export const Overviews: FC<Props> = ({ data }) => {
	const [openDueToDrawsModal, setOpenDueToDrawsModal] =
		useState<boolean>(false);

	return (
		<>
			<div className="rounded-2xl bg-white">
				<Subtitle text="Principle Overview" />
				<Value label="Total Loans" value={data.totalLoans} />
				<Value label="Loans Drawn Down" value={data.loansDrawnDown} />
				<Value
					label="Due to Draws"
					action={() => setOpenDueToDrawsModal(true)}
					value={data.dueToDraws}
				/>
				<Value
					label="Check and Balance"
					value={data.checkAndBalancePrinciple}
					checkAndBalance
				/>
			</div>
			<div className="rounded-2xl bg-white">
				<Value label="Trust Account Balance" value={data.trustAccountBalance} />
			</div>
			<div className="rounded-2xl bg-white">
				<Subtitle text="Interest Overview" />
				<Value label="Total Collectibles" value={data.totalCollectibles} />
				<Value
					label="Total Participants Payable"
					value={data.totalParticipantsPayable}
				/>
				<Value label="Servicing Fee" value={data.servicingFee} />
				<Value label="Yield Spread" value={data.yieldSpread} />
				<Value
					label="Check and Balance"
					value={data.checkAndBalanceInterest}
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
