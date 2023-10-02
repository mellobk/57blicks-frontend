/* eslint-disable no-use-before-define */

import type { Investor, User } from "../../types/api";
import { useEffect, useState } from "react";

import { EditAccounting } from "./EditAccounting";
import { EditAdmin } from "./EditAdmin";
import { EditInvestor } from "./EditInvestor";
import { Modal } from "@/components/ui/Modal/Modal";
import { Tabs } from "@/features/servicing/component/Tabs";
import UserActivity from "./UserActivity";
import { userTabs } from "@/features/servicing/utils/tabs";

interface UserConfigProps {
	user?: User;
	investor?: Investor;
	setUser: (user: User | Investor | null) => void;
	type: "admin" | "investor" | "accounting";
	callBack: () => void;
}
const UserConfig: React.FC<UserConfigProps> = ({
	user,
	investor,
	type,
	setUser,
	callBack,
}) => {
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

	const handleSetUser = (user: User | Investor): void => {
		setUser(user);
		setUser(null);
		callBack ? callBack() : null;
	};

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
				{actualTabData === "activity" && user && <UserActivity user={user} />}
				{actualTabData === "activity" && investor?.user && (
					<UserActivity user={investor.user} />
				)}
				{actualTabData === "permission" && <></>}
				{actualTabData === "edit" && (
					<>
						{type === "admin" && user && (
							<EditAdmin user={user} setUser={handleSetUser} />
						)}
						{type === "accounting" && user && (
							<EditAccounting user={user} setUser={handleSetUser} />
						)}
						{type === "investor" && investor && (
							<EditInvestor investor={investor} setUser={handleSetUser} />
						)}
					</>
				)}
			</Modal>
		</div>
	);
};

export default UserConfig;
