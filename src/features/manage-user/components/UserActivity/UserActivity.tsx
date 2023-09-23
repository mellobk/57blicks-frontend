/* eslint-disable no-use-before-define */
import { useEffect, useState } from "react";

import LastLogin from "./LastLogin";
import ManageLogService from "../../api/logs";
import { Modal } from "@/components/ui/Modal/Modal";
import NumberOfLogin from "./NumberOfLogin";
import { Tabs } from "@/features/servicing/component/Tabs";
import TimeUsage from "./TimeUsage";
import type { User } from "../../types/api";
import { useQuery } from "@tanstack/react-query";
import { userTabs } from "@/features/servicing/utils/tabs";

interface UserActivityProps {
	user: User;
	setUser: (user: User | null) => void;
}
const UserActivity: React.FC<UserActivityProps> = ({ user, setUser }) => {
	const [actualTabData, setActualTabData] = useState<string>("activity");
	const [openModal, setOpenModal] = useState<boolean>(true);

	const userActivity = useQuery(
		["logs-user-activity"],
		() => {
			return ManageLogService.getUserActivity(user.id || "", new Date());
		},
		{ enabled: true, staleTime: 1000 * 60 }
	);

	const closeModal = (): void => {
		setOpenModal(false);
		setUser(null);
	};

	const tabHandlerData = (value: string): void => {
		setActualTabData(value);
	};

	useEffect(() => {
		setOpenModal(true);
		void getUserActivity();
	}, [user]);

	const getUserActivity = async (): Promise<void> => {
		await userActivity.refetch();
	};

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

				<div className="flex mb-4 gap-10">
					<div className="lg:w-1/2 md:w-full p-5 shadow-lg rounded-lg h-1/2 ">
						{userActivity.data && <LastLogin data={userActivity.data} />}
					</div>
					<div className="lg:w-1/2 md:w-full p-5 shadow-lg rounded-lg h-1/2">
						{userActivity.data && <NumberOfLogin data={userActivity.data} />}
					</div>
				</div>
				<div className="flex mb-4">
					<div className="w-full p-5 shadow-lg rounded-lg h-1/2">
						<TimeUsage />
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default UserActivity;
