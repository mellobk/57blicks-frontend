import { Modal } from "@/components/ui/Modal";
import { servicingModalTabs } from "../../utils/tabs";
import { Tabs } from "../Tabs";
import { useEffect, useState } from "react";
import { LoanInformation } from "../LoanInformation";

export const ServicingModal: React.FC = () => {
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
				setTabTitle("Loan Information");
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
			<Modal visible={false} title={tabTitle} width="98%" minHeight="95vh">
				<div
					className=" flex absolute w-full items-center justify-center"
					style={{ left: "0", top: "30px" }}
				>
					<div className="w-auto">
						<Tabs
							tabs={servicingModalTabs}
							actualTab={actualTabData}
							onClick={tabHandlerData}
						/>
					</div>
				</div>

				<LoanInformation />
			</Modal>
		</div>
	);
};
