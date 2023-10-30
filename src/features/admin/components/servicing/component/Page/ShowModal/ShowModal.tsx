import { type FC, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { LoanInformation } from "../../LoanInformation";
import { BorrowerInformation } from "../../BorrowerInformation";
import { LedgerList } from "../../Ledger";
import { InvoiceScreen } from "../../Invoice";

interface Props {
	openModal?: boolean;
	handleOnCLose?: () => void;
	handleRefreshData?: () => void;
	data?: any;
}

const TABS = [
	{ label: "Loan", title: "Loan Information" },
	{ label: "Borrower", title: "Borrower Information" },
	{ label: "Ledger", title: "Ledger" },
	{ label: "Funding", title: "Funding Breakdown" },
	{ label: "Invoices", title: "Invoices" },
];

export const ShowModal: FC<Props> = ({
	openModal,
	handleOnCLose,
	handleRefreshData,
	data,
}) => {

  console.log(data)
	const [actualTabData, setActualTabData] = useState(TABS[0]);

	return (
		<Modal
			visible={openModal}
			title={actualTabData?.title}
			width="98%"
			minHeight="95vh"
			onHide={handleOnCLose}
		>
			<div
				className="flex absolute w-full items-center justify-center"
				style={{ left: "0", top: "30px", zIndex: 0 }}
			>
				<div className="w-auto">
					<div className="flex  w-full h-full  gap-1 text-gray-1000 items-center justify-center p-[5px] bg-gray-200 rounded-[16px]">
						{TABS?.map((tab, index) => (
							<div
								key={index}
								onClick={() => setActualTabData(tab)}
								className={`px-5 cursor-pointer ${
									tab.label === actualTabData?.label
										? "bg-white text-black"
										: ""
								} rounded-[16px] text-[13px]`}
							>
								{tab.label}
							</div>
						))}
					</div>
				</div>
			</div>
			{actualTabData?.label === "Loan" && <LoanInformation data={data} />}
			{actualTabData?.label === "Borrower" && (
				<BorrowerInformation
					data={data}
					handleRefreshData={handleRefreshData}
				/>
			)}
			{actualTabData?.label === "Ledger" && data && (
				<LedgerList loan={data.loan} />
			)}
			{/*{tabTitle === "Funding Breakdown" && data && (*/}
			{/*	<FundingBreakdown loan={data.loan} />*/}
			{/*)}*/}
			{actualTabData?.label === "Invoices" && data && (
				<InvoiceScreen loan={data.loan} />
			)}
		</Modal>
	);
};
