import { type FC, useEffect, useState } from "react";

import { Modal } from "@/components/ui/Modal/Modal";
import { Tabs } from "@/features/admin/components/servicing/component/Tabs";
import type { User } from "../../types/api";

import { userTabs } from "@/features/admin/components/servicing/utils/tabs";
import UserActivity from "../UserConfig/UserActivity";

interface UserConfigProps {
	user: User;
	setUser: (user: User | null) => void;
	deleteUser: (id: string) => void;
	setOpenActivityModal?: (value: boolean) => void;
	activityModal?: boolean;
}

const UserConfig: FC<UserConfigProps> = ({
	user,
	setUser,
	deleteUser,
	setOpenActivityModal,
	activityModal,
}) => {
	const [actualTabData, setActualTabData] = useState<string>("activity");

	const closeModal = (): void => {
		if (setOpenActivityModal) {
			setOpenActivityModal(true);
		}
		setUser(null);
	};

	const tabHandlerData = (value: string): void => {
		setActualTabData(value);
	};

	useEffect(() => {
		if (setOpenActivityModal) {
			setOpenActivityModal(true);
		}
	}, [user]);

	return (
		<div>
			<Modal
				width="90%"
				minHeight="80vh"
				visible={activityModal}
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

				{actualTabData === "activity" && (
					<UserActivity user={user} deleteUser={deleteUser} />
				)}
				{actualTabData === "permission" && <>permission</>}
				{actualTabData === "edit" && <>edit</>}
			</Modal>
		</div>
	);
};

export default UserConfig;
