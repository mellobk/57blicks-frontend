import type { FC } from "react";
import { LoanCard } from "../LoanCard";
import { LoanLinkCard } from "../LoanLinkCard";

interface LoginTitleProps {
	title?: string;
	text?: string;
	background?: boolean;
}

export const LoanCollateralCard: FC<LoginTitleProps> = ({ background }) => {
	return (
		<div
			className={`${
				background ? "bg-gray-150 " : "bg-transparent "
			} flex flex-col    text-gray-1000  p-[5px] gap-2 border-b border-gray-200`}
		>
			<LoanCard
				title="Collateral Address"
				text="2802 Avenue M NW # a, Winter Haven FL 33881"
			/>

			<LoanCard
				title="Insurance Expiration Date"
				text="09-09-2023"
				background
			/>

			<LoanLinkCard
				title="Tax URL"
				text="https://www.link.com"
				background="#f4f2ec"
				colorIcon="#cda874"
			/>

			<LoanLinkCard
				title="Collateral Link (Google Drive)"
				text="https://www.link.com"
				background="#dcefff"
				colorIcon="#0085ff"
			/>

			<LoanCard title="Asset Class" text="Asset Class" />
		</div>
	);
};
