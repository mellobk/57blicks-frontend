/* eslint-disable no-use-before-define */

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/Modal/Modal";
import { Tabs } from "@/features/servicing/component/Tabs";
import type { User } from "../../types/api";
import UserActivity from "./UserActivity";
import { userTabs } from "@/features/servicing/utils/tabs";

interface UserConfigProps {
	user: User;
	setUser: (user: User | null) => void;
}
const UserConfig: React.FC<UserConfigProps> = ({ user, setUser }) => {
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
				width="90%"
				minHeight="80vh"
				visible={openModal}
				onHide={closeModal}
				title={user.firstName}
			>
				<div className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2   ">
					<div className="">
						<Tabs
							tabs={userTabs}
							actualTab={actualTabData}
							onClick={tabHandlerData}
						/>
					</div>
				</div>

				{actualTabData === "activity" && <UserActivity user={user} />}
				{actualTabData === "permission" && <>permission</>}
				{actualTabData === "edit" && <>edit</>}
			</Modal>
		</div>
	);
};

export default UserConfig;
