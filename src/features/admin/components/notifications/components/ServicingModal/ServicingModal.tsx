import { type FC, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import LoansService from "@/api/loans.ts";
import { Modal } from "@/components/ui/Modal";
import { approveModalTabs } from "@/features/admin/components/servicing/utils/tabs";
import { Tabs } from "@/features/admin/components/servicing/component/Tabs";
import ManageNotificationService from "../../api/notification";
import { LoanInformation } from "../LoanInformation";
import { BorrowerInformation } from "../BorrowerInformation";
import { LedgerList } from "../Ledger";
import { ModalActions } from "../ModalActions";
import {
	ApprovalLedgerStateType,
	LoanStatusType,
	NotificationType,
} from "@/types/api/notifications.ts";
import { Success } from "../Success";
import { SuccessDecline } from "../SuccessDecline/Success";
import type { Loan } from "../../types/types";

interface ServicingModalProps {
	openModal?: boolean;
	handleOnCLose?: () => void;
	handleRefreshData?: () => void;
	id?: string;
	ledgerId?: string;
	title?: string;
	type?: string;
	status?: string;
}

export const ServicingModal: FC<ServicingModalProps> = ({
	openModal,
	handleOnCLose,
	handleRefreshData,
	id,
	ledgerId,
	title,
	type,
	status,
}) => {
	const approvalQuery = useMutation(async (id: string) => {
		return LoansService.getLoan(id || "");
	});

	const updateLoanQuery = useMutation(async (body: Loan) => {
		return LoansService.updateLoan(body.id || "", {
			status: body.status,
		});
	});

	const updateLedgerQuery = useMutation(async (body: Loan) => {
		return ManageNotificationService.putLedger(body.id || "", {
			id: body.id,
			approvalState: body.approvalState,
		});
	});
	useEffect(() => {
		if (id) {
			approvalQuery.mutate(id);
		}
	}, [id]);

	const [actualTabData, setActualTabData] = useState<string>("loan");
	const [tabTitle, setTabTitle] = useState<string>("Loan Information");
	const [openApproved, setOpenApproved] = useState<boolean>();
	const [openDecline, setOpenDecline] = useState<boolean>();
	const [openApprovedModal, setOpenApprovedModal] = useState<boolean>();
	const [openDeclineModal, setOpenDeclineModal] = useState<boolean>();
	const [typeProcess, setTypeProcess] = useState<string>();

	useEffect(() => {
		if (updateLoanQuery.isSuccess) {
			if (typeProcess === "approve") {
				setOpenApproved(true);
				setOpenApprovedModal(false);
			} else {
				setOpenDecline(true);
				setOpenDeclineModal(false);
			}
			updateLoanQuery.reset();
		}
		if (updateLoanQuery.isError) {
			updateLoanQuery.reset();
		}
	}, [updateLoanQuery]);

	useEffect(() => {
		if (updateLedgerQuery.isSuccess) {
			if (typeProcess === "approve") {
				setOpenApproved(true);
				setOpenApprovedModal(false);
			} else {
				setOpenDecline(true);
				setOpenDeclineModal(false);
			}
			updateLedgerQuery.reset();
		}
		if (updateLedgerQuery.isError) {
			updateLedgerQuery.reset();
		}
	}, [updateLedgerQuery]);

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
				setTabTitle("Ledger");
				break;
			}
			default: {
				setTabTitle("Loan Information");
			}
		}
	}, [actualTabData]);

	const typeData = type === NotificationType.LOAN ? " Loan" : "Ledger";

	return (
		<div className="relative w-[98%]">
			<Modal
				visible={openModal}
				title={title}
				width="98%"
				minHeight="95vh"
				onHide={handleOnCLose}
			>
				<div
					className=" flex absolute  items-center justify-end"
					style={{ right: "65px", top: "24px", zIndex: 1 }}
				>
					<ModalActions
						status={status}
						openApproved={openApprovedModal}
						openDecline={openDeclineModal}
						onOpenApproved={() => {
							setOpenApprovedModal(!openApprovedModal);
						}}
						onOpenDecline={() => {
							setOpenDeclineModal(!openDeclineModal);
						}}
						type={type}
						onSuccess={() => {
							if (ledgerId) {
								updateLedgerQuery.mutate({
									id: ledgerId,
									approvalState: ApprovalLedgerStateType.APPROVED,
								});
							} else {
								updateLoanQuery.mutate({
									id: id,
									status: LoanStatusType.APPROVED,
								});
							}

							setTypeProcess("approve");
						}}
						onDecline={() => {
							if (ledgerId) {
								updateLedgerQuery.mutate({
									id: ledgerId,
									approvalState: ApprovalLedgerStateType.REJECTED,
								});
							} else {
								updateLoanQuery.mutate({
									id: id,
									status: LoanStatusType.REJECTED,
								});
							}

							setTypeProcess("decline");
						}}
					/>
				</div>
				<div
					className=" flex absolute w-full items-center justify-center"
					style={{ left: "0", top: "27px", zIndex: 0 }}
				>
					<div className="w-auto">
						<Tabs
							tabs={approveModalTabs}
							actualTab={actualTabData}
							onClick={tabHandlerData}
						/>
					</div>
				</div>
				{tabTitle === "Loan Information" && (
					<LoanInformation data={approvalQuery?.data} />
				)}
				{tabTitle === "Borrower Information" && (
					<BorrowerInformation
						data={approvalQuery?.data}
						handleRefreshData={handleRefreshData}
					/>
				)}
				{tabTitle === "Ledger" && approvalQuery.data && (
					<LedgerList loan={approvalQuery.data.id} />
				)}
			</Modal>

			<Modal
				visible={openApproved}
				onHide={() => {
					setOpenApproved(false);
				}}
				title={`${typeData} Approved!`}
				width="30vw"
			>
				<Success
					handleClick={() => {
						if (handleRefreshData) {
							setOpenApproved(false);
							handleRefreshData();
						}
					}}
					buttonText="ok"
					subTitle={
						<div className="flex items-center gap-2 justify-center">
							{typeData} has been successfully been
							<div className="font-bold text-green-500">approve!</div>
						</div>
					}
				/>
			</Modal>

			<Modal
				visible={openDecline}
				onHide={() => {
					setOpenDecline(false);
				}}
				title={`${typeData} Declined!`}
				width="30vw"
			>
				<SuccessDecline
					handleClick={() => {
						if (handleRefreshData) {
							setOpenDecline(false);
							handleRefreshData();
						}
					}}
					iconName="close"
					buttonText="ok"
					subTitle={
						<div className="flex items-center gap-2 justify-center">
							{typeData} has been successfully been
							<div className="font-bold  text-red-500">decline!</div>
						</div>
					}
				/>
			</Modal>
		</div>
	);
};
