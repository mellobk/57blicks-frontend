/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { type FC, useState, useEffect } from "react";
import { DueToDraws } from "@/features/admin/components/loan-overview/components/DueToDraws/DueToDraws";
import { Subtitle } from "@/features/admin/components/loan-overview/components/Subtitle/Subtitle";
import { Value } from "@/features/admin/components/loan-overview/components/Value/Value";
import type { ILoanOverview } from "../../types/fields";
import { round } from "@/utils/common-functions";
import { ServicingModal } from "../servicingModal/ServicingModal";
import { YieldSpreadModal } from "../yieldSpreadModal/YieldSpreadModal";

type Props = {
	data: ILoanOverview;
};

export const Overviews: FC<Props> = ({ data }) => {
	const [openDueToDrawsModal, setOpenDueToDrawsModal] =
		useState<boolean>(false);
	const [openServicingModal, setOpenServicingModal] = useState<boolean>(false);
	const [openYieldSpreadModal, setOpenYieldSpreadModal] =
		useState<boolean>(false);

	const [overviewInvestorData, setOverviewInvestorData] = useState(0);

	useEffect(() => {
		if (data.overviewByInvestors) {
			const overData = data.overviewByInvestors.find(
				(data) => data.name === "DKC Lending LLC"
			);

			overData &&
				setOverviewInvestorData(
					overData?.trustUnallocated + overData?.trustAllocated
				);
		}
	}, [data]);

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
					label="Construction Holdback"
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
				<Value label="Trust Account Balance" value={overviewInvestorData} />
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
					action={() => {
						setOpenServicingModal(true);
					}}
				/>
				<Value
					label="Yield Spread"
					value={data.interestOverview.yieldSpread}
					action={() => {
						setOpenYieldSpreadModal(true);
					}}
				/>
				<Value
					label="Check and Balance"
					value={Math.abs(round(data.interestOverview.checkAndBalance, 0))}
					checkAndBalance
				/>
			</div>
			<DueToDraws
				data={data}
				openModal={openDueToDrawsModal}
				setOpenModal={setOpenDueToDrawsModal}
			/>
			<ServicingModal
				data={data}
				openModal={openServicingModal}
				setOpenModal={setOpenServicingModal}
			/>
			<YieldSpreadModal
				data={data}
				openModal={openYieldSpreadModal}
				setOpenModal={setOpenYieldSpreadModal}
			/>
		</>
	);
};
