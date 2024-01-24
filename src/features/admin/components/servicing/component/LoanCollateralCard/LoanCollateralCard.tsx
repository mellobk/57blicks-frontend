/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import { LoanCard } from "../LoanCard";
import { LoanLinkCard } from "../LoanLinkCard";
import type { Collateral } from "../../types/api";
import { formatDate } from "@/utils/formats";
import CollateralEdit from "../LoanInformation/CollateralEdit";

interface LoginTitleProps {
	title?: string;
	text?: string;
	background?: boolean;
	data?: Collateral;
	handleRefreshData?: () => void;
}

export const LoanCollateralCard: FC<LoginTitleProps> = ({
	background,
	data,
	handleRefreshData,
}) => {
	return (
		<div
			className={`${
				background ? "bg-gray-150 " : "bg-transparent "
			} flex flex-col    text-gray-1000  p-[5px] gap-2 border-b border-gray-200`}
		>
			<LoanCard title="Collateral Address" text={data?.address} />

			<LoanCard
				title="Insurance Expiration Date"
				className="relative"
				text={formatDate(data?.insuranceExpirationDate.toString() || "")}
				background
			>
				{" "}
				{data && (
					<CollateralEdit
						loan={data as any}
						handleRefreshData={handleRefreshData}
					/>
				)}
			</LoanCard>
			<div>
				<a href={data?.taxUrl} target="_blank" rel="noopener noreferrer">
					<LoanLinkCard
						title="Tax URL"
						text={data?.taxUrl}
						background="#f4f2ec"
						colorIcon="#cda874"
					/>
				</a>
			</div>

			<div>
				<a href={data?.link} target="_blank" rel="noopener noreferrer">
					<LoanLinkCard
						title="Collateral Link (Google Drive)"
						text={data?.link}
						background="#dcefff"
						colorIcon="#0085ff"
					/>
				</a>
			</div>

			<LoanCard title="Asset Type" text={data?.assetType} />
		</div>
	);
};
