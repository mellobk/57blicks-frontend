/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Investor, User } from "../../types/api";
import { type FC, useEffect, useState } from "react";

import { EditAccounting } from "./EditAccounting";
import { EditAdmin } from "./EditAdmin";
import { EditInvestor } from "./EditInvestor";
import ManageRoleService from "../../api/roles";
import { Modal } from "@/components/ui/Modal/Modal";
import { Tabs } from "@/features/admin/components/servicing/component/Tabs";
import UserActivity from "./UserActivity";
import { useQuery } from "@tanstack/react-query";
import { userTabsData } from "@/features/admin/components/servicing/utils/tabs";
import { PermissionsAdmin } from "./PermissionsAdmin";
import userStore from "@/stores/user-store.ts";
import { PermissionType, RoleType } from "@/types/api/permissions-type";
import { findPermission } from "@/utils/common-funtions";

interface UserConfigProps {
	user?: User;
	investor?: Investor;
	setUser?: (user: any) => void;
	type: "admin" | "investor" | "accounting";
	callBack: () => void;
	deleteUser: (id: string) => void;
	enableUser?: (id: string) => void;
	setOpenActivityModal?: (value: boolean) => void;
	activityModal?: boolean;
}

const UserConfig: FC<UserConfigProps> = ({
	user,
	investor,
	type,
	setUser,
	callBack,
	deleteUser,
	setOpenActivityModal,
	activityModal,
	enableUser,
}) => {
	const userLoggedInfo = userStore((state) => state.loggedUserInfo);
	const [searchValue, setSearchValue] = useState<string>("");
	const [role, setRole] = useState<string>();
	const userInfo = userStore((state) => state.loggedUserInfo);
	const setUserInfo = userStore((state) => state.setUserInfo);

	const dkcRoleQuery = useQuery(
		["dkc-role-by-id-query"],
		() => {
			return ManageRoleService.getRoleByUser(searchValue);
		},
		{ enabled: false, staleTime: 1000 * 60 }
	);

	const [actualTabData, setActualTabData] = useState<string>("activity");
	const closeModal = (): void => {
		if (setOpenActivityModal) {
			setOpenActivityModal(true);
		}
		if (setUser) {
			setUser(null);
		}
		setUserInfo({});
	};

	const tabHandlerData = (value: string): void => {
		setActualTabData(value);
	};

	useEffect(() => {
		//TODO: change roles are defined in the backend
		if (userInfo) {
			setSearchValue(userInfo.id || "");
			void dkcRoleQuery.refetch();
		}
	}, [userInfo]);

	useEffect(() => {
		//TODO: change roles are defined in the backend
		if (dkcRoleQuery.data) {
			setRole(dkcRoleQuery.data.name || "");
		}
	}, [dkcRoleQuery.data]);

	useEffect(() => {
		if (setOpenActivityModal) {
			setOpenActivityModal(true);
		}
	}, [user]);

	const handleSetUser = (user: User | Investor): void => {
		if (setUser) {
			setUser(user);
			setUser(null);
		}

		callBack ? callBack() : null;
	};

	console.log(type);

	return (
		<div>
			<Modal
				onHide={closeModal}
				width="90%"
				minHeight="80vh"
				visible={activityModal}
				title={
					<>
						<div className="top-0 flex justify-between items-center ">
							<div className="flex space-x-2">
								<div className="pr-1 pt-1 font-bold  text-1xl	">
									{user?.firstName}
									{investor?.user?.firstName}
								</div>
								<div className="bg-blue-50 text-blue-200  rounded-2xl   font-medium text-[9px] pl-4 pr-4 h-6 flex items-center justify-center mt-2">
									{type === "admin" && "Admin"}
									{type === "accounting" && "Accounting"}
									{type === "investor" && "Investor"}
								</div>
							</div>
						</div>
						<div className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-normal ">
							<Tabs
								tabs={[
									userTabsData.activity,
									userLoggedInfo?.role?.name === RoleType.SUPER_ADMIN
										? userTabsData.permission
										: userTabsData.empty,
									(findPermission(
										userLoggedInfo?.role,
										userLoggedInfo?.permissionGroup?.permissions || [],
										PermissionType.EDIT_ADMINS
									) &&
										type === "admin") ||
									(findPermission(
										userLoggedInfo?.role,
										userLoggedInfo?.permissionGroup?.permissions || [],
										PermissionType.EDIT_ACCOUNTING
									) &&
										type === "accounting") ||
									(findPermission(
										userLoggedInfo?.role,
										userLoggedInfo?.permissionGroup?.permissions || [],
										PermissionType.EDIT_INVESTORS
									) &&
										type === "investor")
										? userTabsData.edit
										: userTabsData.empty,
								]}
								actualTab={actualTabData}
								onClick={tabHandlerData}
							/>
						</div>
					</>
				}
			>
				{actualTabData === "activity" && user && (
					<UserActivity user={user} deleteUser={deleteUser} />
				)}
				{actualTabData === "activity" && investor?.user && (
					<UserActivity
						user={investor.user}
						deleteUser={deleteUser}
						enableUser={enableUser}
					/>
				)}

				{actualTabData === "permission" &&
					user &&
					userLoggedInfo?.role?.name === RoleType.SUPER_ADMIN && (
						<PermissionsAdmin
							user={user}
							deleteUser={deleteUser}
							callBack={callBack}
						/>
					)}
				{actualTabData === "permission" &&
					investor?.user &&
					userLoggedInfo?.role?.name === RoleType.SUPER_ADMIN && (
						<PermissionsAdmin
							callBack={callBack}
							user={investor.user}
							deleteUser={deleteUser}
							enableUser={enableUser}
						/>
					)}
				{actualTabData === "edit" && (
					<>
						{type === "admin" &&
							user &&
							findPermission(
								userLoggedInfo?.role,
								userLoggedInfo?.permissionGroup?.permissions || [],
								PermissionType.EDIT_ADMINS
							) && (
								<EditAdmin
									user={user}
									setUser={handleSetUser}
									role={role || ""}
									deleteUser={deleteUser}
								/>
							)}
						{type === "accounting" &&
							user &&
							findPermission(
								userLoggedInfo?.role,
								userLoggedInfo?.permissionGroup?.permissions || [],
								PermissionType.EDIT_ACCOUNTING
							) && (
								<EditAccounting
									user={user}
									setUser={handleSetUser}
									role={role || ""}
									deleteUser={deleteUser}
								/>
							)}
						{type === "investor" &&
							investor &&
							findPermission(
								userLoggedInfo?.role,
								userLoggedInfo?.permissionGroup?.permissions || [],
								PermissionType.EDIT_INVESTORS
							) && (
								<EditInvestor
									investor={investor}
									setUser={handleSetUser}
									role={role || ""}
									deleteUser={deleteUser}
									enableUser={enableUser}
								/>
							)}
					</>
				)}
			</Modal>
		</div>
	);
};

export default UserConfig;
