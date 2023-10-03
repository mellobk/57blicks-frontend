/* eslint-disable no-use-before-define */
import { useEffect, useState } from "react";

import { CalendarModal } from "@/components/ui/CalendarModal/CalendarModal";
import { Icon } from "@/components/ui/Icon";
import LastLogin from "./LastLogin";
import ManageLogService from "../../api/logs";
import NumberOfLogin from "./NumberOfLogin";
import TimeUsage from "./TimeUsage";
import type { User } from "../../types/api";
import { useQuery } from "@tanstack/react-query";

interface UserActivityProps {
	user: User;
	deleteUser?: (id: string) => void;
}
const UserActivity: React.FC<UserActivityProps> = ({ user, deleteUser }) => {
	const [showModal, setShowModal] = useState(false);
	const [date, setDate] = useState<Date>(new Date());

	const userActivity = useQuery(
		["logs-user-activity"],
		() => {
			return ManageLogService.getUserActivity(user.id || "", date);
		},
		{ enabled: true, staleTime: 1000 * 60 }
	);

	useEffect(() => {
		void getUserActivity();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	useEffect(() => {
		void getUserActivity();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date]);

	const getUserActivity = async (): Promise<void> => {
		await userActivity.refetch();
	};

	const handleSetDate = async (
		date: string | Date | Array<Date> | null
	): Promise<void> => {
		setDate(date as Date);

		await userActivity.refetch();
	};

	return (
		<>
			<div
				className="absolute top-10 right-12 cursor-pointer	 transform -translate-x-1/2 -translate-y-1/2 bg-gold-100 pt-1 pb-1.5 pl-4 pr-4 text-gold-500 text-sm font-semibold rounded-3xl hover:bg-gold-350"
				onClick={() => {
					setShowModal(true);
				}}
			>
				Select Dates
			</div>

			<div
				onClick={(): void => {
					if (deleteUser) {
						deleteUser(user.id || "");
					}
				}}
				className="absolute w-8 h-8 text-gray-1200 border-0 bg-gray-100 rounded-full transition duration-200  flex items-center justify-center cursor-pointer"
				style={{ right: "63px", top: "24px" }}
			>
				<Icon name="trashBin" width="14" color="#ff0033" />
			</div>

			<div className="flex mb-4 gap-10">
				<div className="lg:w-1/2 md:w-full p-5 shadow-lg rounded-lg h-1/2 bg-white ">
					{userActivity.data && <LastLogin data={userActivity.data} />}
				</div>
				<div className="lg:w-1/2 md:w-full p-5 shadow-lg rounded-lg h-1/2 bg-white">
					{userActivity.data && <NumberOfLogin data={userActivity.data} />}
				</div>
			</div>
			<div className="flex mb-4">
				<div className="w-full p-5 shadow-lg rounded-lg h-1/2 bg-white">
					{userActivity.data && (
						<TimeUsage data={userActivity.data} date={date} />
					)}
				</div>
			</div>
			<CalendarModal
				show={showModal}
				setShow={setShowModal}
				date={date}
				setDate={handleSetDate}
				closeOnSelect={true}
			/>
		</>
	);
};

export default UserActivity;