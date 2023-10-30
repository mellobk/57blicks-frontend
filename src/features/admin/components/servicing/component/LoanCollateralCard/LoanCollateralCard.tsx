import type { FC } from "react";
import { LoanCard } from "../LoanCard";
import { LoanLinkCard } from "../LoanLinkCard";
import type { Collateral } from "../../types/api";

interface LoginTitleProps {
	title?: string;
	text?: string;
	background?: boolean;
	data?: Collateral;
}

export const LoanCollateralCard: FC<LoginTitleProps> = ({
	background,
	data,
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
				text={data?.insuranceExpirationDate.toString()}
				background
			/>

			<LoanLinkCard
				title="Tax URL"
				text={data?.taxUrl}
				background="#f4f2ec"
				colorIcon="#cda874"
			/>

			<LoanLinkCard
				title="Collateral Link (Google Drive)"
				text={data?.link}
				background="#dcefff"
				colorIcon="#0085ff"
			/>

			<LoanCard title="Asset Class" text={data?.assetType} />
		</div>
	);
};
