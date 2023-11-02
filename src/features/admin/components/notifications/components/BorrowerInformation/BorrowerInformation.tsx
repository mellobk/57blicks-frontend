import type { FC } from "react";
import { formatPhoneNumber } from "@/utils/common-funtions";
import {Loan} from "@/types/api/loan";

import { LoanCard } from "../LoanCard";

interface InvestorBankInfoProps {
	data?: Loan;
	handleRefreshData?: () => void;
}

export const BorrowerInformation: FC<InvestorBankInfoProps> = ({ data }) => {
	return (
		<div
			className={` flex  w-full   gap-5 text-gray-1000  justify-center p-[5px] rounded-[16px]  overflow-hidden`}
			style={{ height: "80vh !important" }}
		>
			<div className="w-[33.33%]  border-r border-gray-200 pr-4 opacity-40">
				<div className="mb-20 flex gap-2 flex-col">
					<LoanCard title="Borrower LLC" text={data?.borrower?.llc} />

					<LoanCard title="EIN/SSN" text={data?.borrower?.ssnEin} background />
				</div>

				<div className="flex gap-2 flex-col">
					<LoanCard
						title="First Name"
						text={`${data?.borrower?.user.firstName}`}
						background
					/>

					<LoanCard title="Last Name" text={data?.borrower?.user.lastName} />
				</div>
			</div>

			<div className="w-[33.33%] flex gap-2 flex-col  opacity-40">
				<LoanCard
					title="Phone Number"
					text={formatPhoneNumber(data?.borrower?.user.phoneNumber || "")}
				/>

				<LoanCard
					title="Email Address"
					text={data?.borrower?.user.email}
					background
				/>

				<LoanCard
					title="Mailing Address"
					text={data?.borrower?.user.mailingAddress}
				/>
			</div>

			<div className="w-[33.33%]  flex gap-2 flex-col overflow-auto border-l border-gray-200 pl-3.5  opacity-40">
				<LoanCard
					title="Banking Name"
					text={data?.borrower?.bankingName}
					background
				/>

				<LoanCard title="Routing Number" text={data?.borrower?.routingNumber} />
				<LoanCard
					title="Account Number"
					text={data?.borrower?.accountNumber}
					background
				/>

				<LoanCard title="Account Type" text={data?.borrower?.accountType} />
			</div>
		</div>
	);
};
