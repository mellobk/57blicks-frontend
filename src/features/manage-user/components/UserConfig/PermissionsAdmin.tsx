import { Button } from "@/components/ui/Button";
import { FC, useEffect, useState } from "react";
import type { Permissions, User } from "@/features/manage-user/types/api";

import ManageUsersService from "../../api/investors";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@/components/ui/Icon";
import {
	PermissionToggle,
	type PermissionToggleProps,
} from "../PermissionToggle/PermissionToggle";

interface PermissionsAdmin {
	user: User;
	setUser?: (user: User) => void;
	role?: string;
	enableUser?: (id: string) => void;
	deleteUser?: (id: string) => void;
}

export const PermissionsAdmin: FC<PermissionsAdmin> = ({
	user,
	deleteUser,
	enableUser,
}) => {
	const [permissionsArrayData, setPermissionArrayData] =
		useState<Array<PermissionToggleProps>>();
	const roleData = useQuery(
		["role-query"],
		() => {
			return ManageUsersService.permissionRoleById(user?.role?.id || "");
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	useEffect(() => {
		return () => {
			roleData.remove();
		};
	}, []);

	const getDataPermissions = async () => {
		if (roleData.data && !permissionsArrayData?.length) {
			const permissionData = roleData?.data as unknown as Permissions;
			const permissionArray: Array<PermissionToggleProps> = [
				{
					id: 1,
					permission: "Invite Admins",
					permissionStatus: permissionData.inviteAdmins,
					description: "Permission to invite Admins",
					visible: false,
				},
				{
					id: 2,
					permission: "Invite Accounters",
					permissionStatus: permissionData.inviteAccounters,
					description: "Permission to invite Accounters",
					visible: false,
				},

				{
					id: 3,
					permission: "Invite Investors",
					permissionStatus: permissionData.inviteInvestors,
					description: "Permission to invite Investors",
					visible: false,
				},
				{
					id: 4,
					permission: "View Investors",
					permissionStatus: permissionData.viewInvestors,
					description: "Permission to view Investors",
					visible: false,
				},
				{
					id: 5,
					permission: "View Admins",
					permissionStatus: permissionData.viewAdmins,
					description: "Permission to view Admins",
					visible: false,
				},
				{
					id: 6,
					permission: "View Accounts",
					permissionStatus: permissionData.viewAccounts,
					description: "Permission to view Accounts",
					visible: false,
				},
				{
					id: 7,
					permission: "Edit Admins",
					permissionStatus: permissionData.editAdmins,
					description: "Permission to edit Admins",
					visible: false,
				},
				{
					id: 8,
					permission: "Edit Investors",
					permissionStatus: permissionData.editInvestors,
					description: "Permission to edit Investors",
					visible: false,
				},
				{
					id: 9,
					permission: "Edit Accounting",
					permissionStatus: permissionData.editAccounting,
					description: "Permission to edit Accounting records",
					visible: false,
				},
				{
					id: 10,
					permission: "Edit Borrowers",
					permissionStatus: permissionData.editBorrowers,
					description: "Permission to edit Borrowers",
					visible: false,
				},
				{
					id: 11,
					permission: "Disable Users",
					permissionStatus: permissionData.disableUsers,
					description: "Permission to disable users",
					visible: false,
				},
				{
					id: 12,
					permission: "Approve User Modifications",
					permissionStatus: permissionData.approveUsersModifications,
					description: "Permission to approve user modifications",
					visible: false,
				},
				{
					id: 13,
					permission: "Grant Permissions",
					permissionStatus: permissionData.grantPermissions,
					description: "Permission to grant permissions",
					visible: false,
				},
				{
					id: 14,
					permission: "Create Loan",
					permissionStatus: permissionData.createLoan,
					description: "Permission to create loans",
					visible: false,
				},
				{
					id: 15,
					permission: "View Loans",
					permissionStatus: permissionData.viewLoans,
					description: "Permission to view loans",
					visible: false,
				},
				{
					id: 16,
					permission: "Input Transactions Ledger",
					permissionStatus: permissionData.inputTransactionsLedger,
					description: "Permission to input transactions into ledger",
					visible: false,
				},
				{
					id: 17,
					permission: "Approve New Loans",
					permissionStatus: permissionData.approveNewLoans,
					description: "Permission to approve new loans",
					visible: false,
				},
				{
					id: 18,
					permission: "Approve Loan Changes",
					permissionStatus: permissionData.approveLoanChanges,
					description: "Permission to approve loan changes",
					visible: false,
				},
				{
					id: 19,
					permission: "Send Invoice",
					permissionStatus: permissionData.sendInvoice,
					description: "Permission to send invoices",
					visible: false,
				},
				{
					id: 20,
					permission: "Loan Overview",
					permissionStatus: permissionData.loanOverview,
					description: "Permission for loan overview",
					visible: false,
				},
				{
					id: 21,
					permission: "Create Opportunity",
					permissionStatus: permissionData.createOpportunity,
					description: "Permission to create opportunities",
					visible: false,
				},
				{
					id: 22,
					permission: "View Opportunities",
					permissionStatus: permissionData.viewOpportunities,
					description: "Permission to view opportunities",
					visible: false,
				},
				{
					id: 23,
					permission: "Edit Opportunities",
					permissionStatus: permissionData.editOpportunities,
					description: "Permission to edit opportunities",
					visible: false,
				},
				{
					id: 24,
					permission: "Send Opportunities",
					permissionStatus: permissionData.sendOpportunities,
					description: "Permission to send opportunities",
					visible: false,
				},
				{
					id: 25,
					permission: "Download Opportunities",
					permissionStatus: permissionData.downloadOpportunities,
					description: "Permission to download opportunities",
					visible: false,
				},
				{
					id: 26,
					permission: "Edit PQRS",
					permissionStatus: permissionData.editPqrs,
					description: "Permission to edit PQRS",
					visible: false,
				},
				{
					id: 27,
					permission: "Approve Opportunities",
					permissionStatus: permissionData.approveOpportunities,
					description: "Permission to Approve Opportunities",
					visible: false,
				},
				{
					id: 28,
					permission: "View PQRS",
					permissionStatus: permissionData.viewPqrs,
					description: "Permission to view PQRS",
					visible: false,
				},
				{
					id: 29,
					permission: "Edit PQRS",
					permissionStatus: permissionData.editPqrs,
					description: "Permission to edit PQRS",
					visible: false,
				},
			];

			setPermissionArrayData(permissionArray);
		}
	};
	useEffect(() => {
		void getDataPermissions();
	}, [roleData]);

	const enablePermission = (id: number): void => {
		const enableData = permissionsArrayData?.map((item) => {
			if (item.id === id) {
				return {
					...item,
					permissionStatus: !item.permissionStatus,
				};
			}
			return item;
		});
		setPermissionArrayData(enableData);
	};

	const enableVisible = (id: number): void => {
		const enableData = permissionsArrayData?.map((item) => {
			if (item.id === id) {
				return {
					...item,
					visible: !item.visible,
				};
			}
			return item;
		});
		setPermissionArrayData(enableData);
	};
	return (
		<div className="h-full w-full rounded-3x p-2 bg-white">
			<div className="flex justify-between items-center w-full">
				<div className="flex items-center gap-3 w-full">
					<div className=" flex flex-col w-full p-5 gap-5">
						{permissionsArrayData?.map((data: PermissionToggleProps) => {
							return (
								<PermissionToggle
									key={data.id}
									permission={data.permission}
									permissionStatus={data.permissionStatus}
									description={data.description}
									visible={data.visible}
									handleOnClick={() => {
										enablePermission(data.id || 0);
									}}
									handleEyesOnClick={() => {
										enableVisible(data.id || 0);
									}}
								/>
							);
						})}
					</div>

					<div
						onClick={(): void => {
							if (deleteUser) {
								deleteUser(user.id || "");
							}
						}}
						className={`absolute w-8 h-8 text-gray-1200 border-0 bg-gray-100 rounded-full transition duration-200  flex items-center justify-center cursor-pointer`}
						style={{
							right: enableUser && !user.isActive ? "175px" : "63px",
							top: "24px",
						}}
					>
						<Icon name="trashBin" width="14" color="#ff0033" />
					</div>

					{enableUser && !user.isActive && (
						<div
							className="absolute top-10 right-[8px] cursor-pointer	 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 pt-1 pb-1.5 pl-4 pr-4 text-black-500 text-sm font-semibold rounded-3xl"
							onClick={() => {
								if (enableUser) {
									enableUser(user?.id || "");
								}
							}}
						>
							Enable User
						</div>
					)}
				</div>
				<Button
					buttonText="Save"
					className={`absolute top-[25px] ${
						enableUser && !user.isActive ? "right-[215px]" : "right-[102px]"
					} py-[3px] px-[10px] bg-gray-250 text-white rounded-3xl`}
				/>
			</div>
		</div>
	);
};
