/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type FC, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import LoansService from "@/api/loans.ts";
import { Modal } from "@/components/ui/Modal";
import { approveModalTabs } from "@/features/admin/components/servicing/utils/tabs";
import { Tabs } from "@/features/admin/components/servicing/component/Tabs";
import ManageNotificationService, {
	type UpdateLedgerProps,
} from "../../api/notification";
import { LoanInformation } from "../LoanInformation";
import { BorrowerInformation } from "../BorrowerInformation";
import { BorrowerInformation as BorrowerEdit } from "../../../servicing/component/BorrowerInformation";
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
import type { Loan as LoanLedger } from "@/features/admin/components/create-loan/types/fields";
// import type {
// 	Loan,
// } from "@/features/admin/components/servicing/types/api";
// import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import userStore from "@/stores/user-store";
import { RoleType } from "@/types/api/permissions-type";
import { ModalActionsAdmin } from "../ModalActions/ModalActionsAdmin";
import { getLocalStorage } from "@/utils/local-storage";
import { userName } from "@/utils/constant";
import { TextArea } from "@/components/forms/TextArea";
import { LedgerTypeOfPayment } from "../../../servicing/component/Ledger/types";
import { FundingBreakdown } from "../../../servicing/component/FundingBreakdown/FundingBreakdown";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

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
	const localUserName = getLocalStorage(userName);
	const createLedgerQuery = useMutation(async (body: any) => {
		return ManageNotificationService.createNotifications(body);
	});

	const editLoan = userStore((state) => state.editLoan);
	const [handleEdit, setHandleEdit] = useState<boolean>();
	const [comment, setComment] = useState<string>();
	const userLoggedInfo = userStore((state) => state.loggedUserInfo);

	const [loanUpdated, setLoanUpdated] = useState<LoanLedger>();
	const approvalQuery = useMutation(async (id: string) => {
		return LoansService.getLoan(id || "");
	});

	const updateLoanQuery = useMutation(async (body: Loan) => {
		return LoansService.updateLoan(body.id || "", body as any);
	});

	const updateLedgerQuery = useMutation(async (body: UpdateLedgerProps) => {
		return ManageNotificationService.putLedger(body);
	});
	const updateFundingBreakDownQuery = useMutation(async (body: LoanLedger) => {
		return ManageNotificationService.updateFundingBreakdown(body);
	});

	useEffect(() => {
		if (id) {
			approvalQuery.mutate(id);
		}
	}, [id]);

	useEffect(() => {
		return () => {
			setComment("");
		};
	}, []);

	const [actualTabData, setActualTabData] = useState<string>("loan");
	const [tabTitle, setTabTitle] = useState<string>("Loan Information");
	const [openApproved, setOpenApproved] = useState<boolean>();
	const [openDecline, setOpenDecline] = useState<boolean>();
	const [openApprovedModal, setOpenApprovedModal] = useState<boolean>();
	const [openDeclineModal, setOpenDeclineModal] = useState<boolean>();
	const [typeProcess, setTypeProcess] = useState<string>();
	const [validApprove, setValidApprove] = useState<boolean>(true);

	const handleRefreshBorrowerInfo = () => {
		approvalQuery.mutate(id || "");
	};

	useEffect(() => {
		if (updateLoanQuery.isSuccess) {
			if (typeProcess === "approve") {
				setOpenApproved(true);
				setOpenApprovedModal(false);
				approvalQuery.mutate(id || "");
				if (userLoggedInfo?.role?.name === "admin") {
					const dataNotification = { id: editLoan.id, ledgerId: "" };
					createLedgerQuery.mutate({
						title: "Approve Loan",
						timestamp: new Date(),
						content: `admin ${localUserName} modify  ${editLoan.name} ! needs action.`,
						additionalData: JSON.stringify(dataNotification),
						userFullName: localUserName,
						priority: "HIGH",
						type: "LOAN",
						roles: ["super-admin"],
					});
				}
			} else {
				setOpenDecline(true);
				setOpenDeclineModal(false);
				const dataNotification = { id: editLoan.id, ledgerId: "" };
				createLedgerQuery.mutate({
					title: "Rejected Loan",
					timestamp: new Date(),
					content: `Super admin ${localUserName} Reject ${editLoan.name}! needs action.`,
					additionalData: JSON.stringify(dataNotification),
					userFullName: localUserName,
					priority: "HIGH",
					type: "LOAN",
					roles: ["admin"],
				});
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
			case "funding": {
				setTabTitle("Funding Breakdown");
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
			{id && (
				<Modal
					visible={openModal}
					title={title}
					width="98%"
					minHeight="95vh"
					onHide={handleOnCLose}
				>
					<div
						className=" flex absolute  items-center justify-end"
						style={{
							right: tabTitle === "Borrower Information" ? "135px" : "65px",
							top: "24px",
							zIndex: 1,
						}}
					>
						<div>
							{approvalQuery?.data?.status !== "PENDING" && (
								<>
									{approvalQuery?.data?.status === "APPROVED" ? (
										<div className="cursor-pointer">
											<Button
												buttonText="Approved"
												disabled={!validApprove}
												className=" rounded-3xl bg-green-900 text-green-500"
											/>
										</div>
									) : (
										userLoggedInfo?.role?.name === RoleType.SUPER_ADMIN && (
											<div className="cursor-pointer">
												<Button
													buttonText="Declined"
													className=" rounded-3xl bg-red-200 text-red-500"
												/>
											</div>
										)
									)}
								</>
							)}
						</div>
						<>
							<div>
								{tabTitle === "Borrower Information" && (
									<div className="text-gray-1000 text-[14px] cursor-pointer ">
										<Button
											icon={<Icon name="openEye" color="#0085ff" width="20" />}
											buttonText="View Only"
											className=" rounded-3xl border-2 border-blue-200 bg-blue-70 text-blue-200"
											onClick={() => {
												setHandleEdit(!handleEdit);
											}}
										/>
									</div>
								)}
							</div>
							{userLoggedInfo?.role?.name === RoleType.SUPER_ADMIN
								? approvalQuery?.data?.status === "PENDING" &&
								  tabTitle !== "Borrower Information" && (
										<ModalActions
											comment={
												ledgerId ? null : (
													<TextArea
														value={comment}
														onChange={(e): void => {
															setComment(e.target.value);
														}}
														label="Comment"
														className="w-full border-[1px] border-black rounded-md"
													></TextArea>
												)
											}
											status={status}
											validApprove={validApprove}
											openApproved={openApprovedModal}
											openDecline={openDeclineModal}
											handleViewOnly={(): void => {
												setHandleEdit(!handleEdit);
											}}
											onOpenApproved={(): void => {
												setOpenApprovedModal(!openApprovedModal);
											}}
											onOpenDecline={(): void => {
												setOpenDeclineModal(!openDeclineModal);
											}}
											type={type}
											onSuccess={(): void => {
												if (ledgerId) {
													updateFundingBreakDownQuery.mutate(
														loanUpdated as unknown as LoanLedger
													);

													updateLedgerQuery.mutate({
														id: ledgerId,
														approvalState: ApprovalLedgerStateType.APPROVED,
														typeOfPayment: LedgerTypeOfPayment.PRINCIPAL,
														loan: loanUpdated,
													} as unknown as UpdateLedgerProps);
												} else {
													const editData = {
														...editLoan,
														status: LoanStatusType.APPROVED,
													};
													updateLoanQuery.mutate(editData as any);
												}

												setTypeProcess("approve");
											}}
											onDecline={(): void => {
												if (ledgerId) {
													updateLedgerQuery.mutate({
														id: ledgerId,
														approvalState: ApprovalLedgerStateType.REJECTED,
													} as unknown as UpdateLedgerProps);
												} else {
													updateLoanQuery.mutate({
														id: id,
														comment: comment,
														status: LoanStatusType.REJECTED,
													});
												}

												setTypeProcess("decline");
											}}
										/>
								  )
								: approvalQuery?.data?.status !== "APPROVED" && (
										<ModalActionsAdmin
											handleViewOnly={(): void => {
												setHandleEdit(!handleEdit);
											}}
											onOpenApproved={(): void => {
												const editData = {
													...editLoan,
													status: LoanStatusType.PENDING,
												};
												updateLoanQuery.mutate(editData as any);
												setTypeProcess("approve");
											}}
										/>
								  )}
						</>
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
					{tabTitle === "Loan Information" && approvalQuery?.data && (
						<LoanInformation
							data={approvalQuery?.data}
							edit={handleEdit}
							setValidApprove={setValidApprove}
						/>
					)}
					{tabTitle === "Borrower Information" &&
						(handleEdit ? (
							<BorrowerEdit
								data={{ loan: approvalQuery?.data as never } as any}
								handleRefreshData={handleRefreshBorrowerInfo}
							/>
						) : (
							<BorrowerInformation
								data={approvalQuery?.data}
								handleRefreshData={handleRefreshData}
								setValidApprove={setValidApprove}
							/>
						))}
					{tabTitle === "Ledger" && approvalQuery.data && (
						<LedgerList
							loan={approvalQuery.data as unknown as LoanLedger}
							setValidApprove={setValidApprove}
							setLoanUpdated={setLoanUpdated}
						/>
					)}

					{tabTitle === "Funding Breakdown" && approvalQuery.data && (
						<FundingBreakdown data={approvalQuery.data} />
					)}
				</Modal>
			)}
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
