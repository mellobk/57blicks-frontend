import type { Investor, User } from "../../types/api";
import { FC, useEffect, useState } from "react";

import { EditAccounting } from "./EditAccounting";
import { EditAdmin } from "./EditAdmin";
import { EditInvestor } from "./EditInvestor";
import ManageRoleService from "../../api/roles";
import { Modal } from "@/components/ui/Modal/Modal";
import { Tabs } from "@/features/servicing/component/Tabs";
import UserActivity from "./UserActivity";
import { getLocalStorage } from "@/utils/local-storage";
import { useQuery } from "@tanstack/react-query";
import { userBasicInformation } from "@/utils/constant";
import { userTabs } from "@/features/servicing/utils/tabs";
import { PermissionsAdmin } from "./PermissionsAdmin";

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
	const [searchValue, setSearchValue] = useState<string>("");
	const [role, setRole] = useState<string>();
	const userData = getLocalStorage(userBasicInformation);
	const parseData = JSON.parse(userData || "") as User;

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
	};

	const tabHandlerData = (value: string): void => {
		setActualTabData(value);
	};

	useEffect(() => {
		//TODO: change roles are defined in the backend
		if (parseData) {
			setSearchValue(parseData.id || "");
			void dkcRoleQuery.refetch();
		}
	}, [parseData]);

	useEffect(() => {
		//TODO: change roles are defined in the backend
		if (dkcRoleQuery.data) {
			console.log(
				"🚀 ~ file: UserConfig.tsx:75 ~ useEffect ~ dkcRoleQuery.data:",
				dkcRoleQuery.data.name
			);
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
								tabs={userTabs}
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

				{actualTabData === "permission" && user && (
					<PermissionsAdmin user={user} deleteUser={deleteUser} />
				)}
				{actualTabData === "permission" && investor?.user && (
					<PermissionsAdmin
						user={investor.user}
						deleteUser={deleteUser}
						enableUser={enableUser}
					/>
				)}
				{actualTabData === "edit" && (
					<>
						{type === "admin" && user && (
							<EditAdmin
								user={user}
								setUser={handleSetUser}
								role={role || ""}
								deleteUser={deleteUser}
							/>
						)}
						{type === "accounting" && user && (
							<EditAccounting
								user={user}
								setUser={handleSetUser}
								role={role || ""}
								deleteUser={deleteUser}
							/>
						)}
						{type === "investor" && investor && (
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
