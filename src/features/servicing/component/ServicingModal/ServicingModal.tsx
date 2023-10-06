import { Modal } from "@/components/ui/Modal";
import { servicingModalTabs } from "../../utils/tabs";
import { Tabs } from "../Tabs";
import { useEffect, useState } from "react";
import { LoanInformation } from "../LoanInformation";
import { BorrowerInformation } from "../BorrowerInformation";
import "./ServicingModal.css";
import type { FundingBreakdown } from "../../types/api";
import { Ledger } from "../Ledger";

interface ServicingModalProps {
	openModal?: boolean;
	handleOnCLose?: () => void;
	handleRefreshData?: () => void;
	data?: FundingBreakdown;
}

export const ServicingModal: React.FC<ServicingModalProps> = ({
	openModal,
	handleOnCLose,
	handleRefreshData,
	data,
}) => {
	const [actualTabData, setActualTabData] = useState<string>("loan");
	const [tabTitle, setTabTitle] = useState<string>("Loan Information");
	const tabHandlerData = (value: string): void => {
		setActualTabData(value);
	};

	useEffect(() => {
		switch (actualTabData) {
			case "loan": {
				setTabTitle("Loan Information");
				break;
			}
			case "borrower": {
				setTabTitle("Borrower Information");
				break;
			}
			case "ledger": {
				setTabTitle("ledger");
				break;
			}
			case "funding": {
				setTabTitle("Loan Information");
				break;
			}
			case "invoices": {
				setTabTitle("Loan Information");
				break;
			}
			default: {
				setTabTitle("Loan Information");
			}
		}
	}, [actualTabData]);

	return (
		<div className="relative w-[98%]">
			<Modal
				visible={openModal}
				title={tabTitle}
				width="98%"
				minHeight="95vh"
				onHide={handleOnCLose}
			>
				<div
					className=" flex absolute w-full items-center justify-center"
					style={{ left: "0", top: "30px", zIndex: 0 }}
				>
					<div className="w-auto">
						<Tabs
							tabs={servicingModalTabs}
							actualTab={actualTabData}
							onClick={tabHandlerData}
						/>
					</div>
				</div>
				{tabTitle === "Loan Information" && <LoanInformation data={data} />}
				{tabTitle === "Borrower Information" && (
					<BorrowerInformation
						data={data}
						handleRefreshData={handleRefreshData}
					/>
				)}
				{tabTitle === "ledger" && (
					<Ledger data={data} handleRefreshData={handleRefreshData} />
				)}
			</Modal>
		</div>
	);
};
