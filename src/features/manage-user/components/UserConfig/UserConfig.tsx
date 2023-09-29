/* eslint-disable no-use-before-define */

import { useEffect, useState } from "react";

import { EditUser } from "./EditUser";
import { Modal } from "@/components/ui/Modal/Modal";
import { Tabs } from "@/features/servicing/component/Tabs";
import type { User } from "../../types/api";
import UserActivity from "./UserActivity";
import { userTabs } from "@/features/servicing/utils/tabs";

interface UserConfigProps {
	user: User;
	setUser: (user: User | null) => void;
	type: "admin" | "investor" | "accounting";
}
const UserConfig: React.FC<UserConfigProps> = ({ user, type, setUser }) => {
	const [actualTabData, setActualTabData] = useState<string>("activity");

	const [openModal, setOpenModal] = useState<boolean>(true);

	const closeModal = (): void => {
		setOpenModal(false);
		setUser(null);
	};

	const tabHandlerData = (value: string): void => {
		setActualTabData(value);
	};

	useEffect(() => {
		setOpenModal(true);
	}, [user]);

	return (
		<div>
			<Modal
				onHide={closeModal}
				width="90%"
				minHeight="80vh"
				visible={openModal}
				title={
					<>
						<div className="top-0 flex justify-between items-center ">
							<div className="flex space-x-2">
								<div className="pr-1 pt-1 font-bold  text-1xl	">
									{user.firstName}
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
				{actualTabData === "activity" && <UserActivity user={user} />}
				{actualTabData === "permission" && <></>}
				{actualTabData === "edit" && (
					<>
						<EditUser user={user} />
					</>
				)}
			</Modal>
		</div>
	);
};

export default UserConfig;
