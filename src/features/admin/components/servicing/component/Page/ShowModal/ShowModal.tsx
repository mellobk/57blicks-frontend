/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type FC, useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { LoanInformation } from "../../LoanInformation";
import { BorrowerInformation } from "../../BorrowerInformation";
import { LedgerList } from "../../Ledger";
import { InvoiceScreen } from "../../Invoice";
import { FundingBreakdown } from "@/features/admin/components/servicing/component/FundingBreakdown/FundingBreakdown.tsx";
// import { useQuery } from "@tanstack/react-query";
// import LoansService from "@/api/loans";
import userStore from "@/stores/user-store";
import { PermissionType } from "@/types/api/permissions-type";
import { findPermission } from "@/utils/common-functions";
import BorrowerNotifications from "../../BorrowerNotifications";
import Payable from "../../Payable";
import { useQuery } from "@tanstack/react-query";
import LoansService from "@/api/loans";
import { DeleteLoan } from "../../DeleteLoan";

interface Props {
	openModal?: boolean;
	handleOnCLose?: () => void;
	handleRefreshData?: () => void;
	data?: any;
	tab?: string;
}

const tabsPermissions = {
	loan: { label: "Loan", title: "Loan Information" },
	borrower: { label: "Borrower", title: "Borrower Information" },
	ledger: { label: "Ledger", title: "Ledger" },
	receivable: { label: "Receivable", title: "Receivable" },
	payable: { label: "Payable", title: "Payable" },
	funding: { label: "Funding", title: "Funding Breakdown" },
	invoice: { label: "Invoices", title: "Invoices" },
	empty: { label: "", title: "" },
};

export const ShowModal: FC<Props> = ({
	openModal,
	handleOnCLose,
	handleRefreshData,
	data,
	tab,
}) => {
	const userInfo = userStore((state) => state.loggedUserInfo);

	const TABS = [
		findPermission(
			userInfo?.role,
			userInfo?.permissionGroup?.permissions || [],
			PermissionType.VIEW_LOANS
		)
			? tabsPermissions.loan
			: tabsPermissions.empty,
		findPermission(
			userInfo?.role,
			userInfo?.permissionGroup?.permissions || [],
			PermissionType.EDIT_BORROWERS
		)
			? tabsPermissions.borrower
			: tabsPermissions.empty,

		findPermission(
			userInfo?.role,
			userInfo?.permissionGroup?.permissions || [],
			PermissionType.INPUT_TRANSACTIONS_LEDGER
		)
			? tabsPermissions.receivable
			: tabsPermissions.empty,
		findPermission(
			userInfo?.role,
			userInfo?.permissionGroup?.permissions || [],
			PermissionType.INPUT_TRANSACTIONS_LEDGER
		)
			? tabsPermissions.payable
			: tabsPermissions.empty,
		tabsPermissions.funding,
		tabsPermissions.invoice,
	];

	const [actualTabData, setActualTabData] = useState<{
		label: string;
		title: string;
	}>();
	useEffect(() => {
		if (!actualTabData) {
			const findTab = TABS.find((tabInfo) => tabInfo.label === (tab || "Loan"));
			setActualTabData(findTab as any);
			console.log(findTab, tab);
		}
	}, [TABS]);

	const loanQuery = useQuery(
		["loan-query", data?.loan.id],
		() => LoansService.getLoan(data?.loan.id),
		{ enabled: !!data?.loan.id }
	);

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
					<div className="flex w-full h-full gap-1 text-gray-1000 items-center justify-center p-[5px] bg-gray-200 rounded-[16px]">
						{TABS?.map(
							(tab, index) =>
								tab.label && (
									<div
										key={index}
										onClick={(): void => {
											setActualTabData(tab);
										}}
										className={`px-5 cursor-pointer ${
											tab.label === actualTabData?.label
												? "bg-white text-black"
												: ""
										} rounded-[16px] text-[13px]`}
									>
										{tab.label}
									</div>
								)
						)}
					</div>
				</div>
			</div>

			{actualTabData?.label === "Loan" && (
				<>
					<BorrowerNotifications
						single={true}
						data={data}
						right="70px"
						top="25px"
						className="absolute "
					/>
					<DeleteLoan
						loan={data?.loan}
						handleOnCLose={handleOnCLose}
						handleRefreshData={handleRefreshData}
					/>
					<LoanInformation data={data} handleRefreshData={handleRefreshData} />
				</>
			)}
			{actualTabData?.label === "Borrower" && (
				<BorrowerInformation
					data={data}
					handleRefreshData={handleRefreshData}
				/>
			)}
			{actualTabData?.label === "Receivable" && data && (
				<LedgerList
					loan={loanQuery.data as any}
					handleRefreshData={handleRefreshData}
				/>
			)}
			{actualTabData?.label === "Payable" && data && (
				<Payable loan={data.loan} />
			)}
			{actualTabData?.label === "Funding" && data && (
				<FundingBreakdown data={loanQuery.data} />
			)}
			{actualTabData?.label === "Invoices" && data && (
				<InvoiceScreen loan={data.loan} />
			)}
		</Modal>
	);
};
