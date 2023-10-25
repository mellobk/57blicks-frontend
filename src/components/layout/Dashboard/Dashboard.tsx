/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type FC, type ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/router";
import { Icon } from "@/components/ui/Icon";
import "@/assets/images/png/LogoGold_2x.png";
import LogoGold from "@/assets/images/png/LogoGold.png";
import { Avatar } from "@/components/ui/Avatar";
import { NavbarRoutes } from "@/features/dashboard/routes/DashboardRouter";
import "./Dashboard.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import ManageUsersService from "@/features/manage-user/api/investors";
import { getLocalStorage, sendToLocalStorage } from "@/utils/local-storage";
import { sub, userBasicInformation, userName } from "@/utils/constant";
import { LogOff } from "@/features/profile/component/LogOff/LogOff";
import DkcLendersService from "@/features/servicing/api/servicing";
import servicingStore from "@/features/servicing/stores/servicing-store";
import socket from "../../../socket";
import type { User } from "@/features/servicing/types/api";

import type { UserNotification } from "../types/notifications";
import { ServicingModal } from "@/features/notifications/components/ServicingModal/ServicingModal";
import { Notification } from "@/features/notifications/components/Notification/Notification";
import { Button } from "@/components/ui/Button";
import ManageNotificationService from "@/features/notifications/api/notification";

type Props = {
	children?: ReactNode;
};

export const DashboardLayout: FC<Props> = ({ children }: Props) => {
	const navigate = useNavigate();
	const createLoanTo: string = "/create-loan";
	const localSub = getLocalStorage(sub);
	const localUserName = getLocalStorage(userName);
	const [enabled, setEnabled] = useState<boolean>(!getLocalStorage(userName));
	const [notifications, setNotifications] = useState<Array<UserNotification>>();
	const [openLoanId, setLoanId] = useState<string>();
	const [ledgerId, setLedgerId] = useState<string>();
	const [typeNotification, setTypeNotification] = useState<string>();
	const [openNotificationTitle, setNotificationTitle] = useState<string>();
	const [openModalUser, setOpenModalUser] = useState<boolean>();
	const [openModalLoan, setOpenModalLoan] = useState<boolean>();
	const [openModalNotification, setOpenModalNotification] = useState<boolean>();
	const setLenderData = servicingStore((state) => state.setLender);
	const lenderData = servicingStore((state) => state.lenders);
	const userData = getLocalStorage(userBasicInformation);
	const parseData = userData && (JSON.parse(userData || "") as User);

	const userQuery = useQuery(
		["user-query"],
		() => {
			return ManageUsersService.getUser(localSub);
		},
		{ enabled }
	);

	const userNotification = useQuery(
		["user-notification-query"],
		() => {
			return ManageNotificationService.getUserNotification();
		},
		{ enabled: true }
	);

	const dkcLendersQuery = useQuery(
		["dkc-lenders-query"],
		() => {
			return DkcLendersService.getLenders();
		},
		{ enabled: lenderData.length <= 0 }
	);

	const updateNotificationQuery = useMutation(
		async (body: UserNotification) => {
			return ManageNotificationService.putUserNotification(body.id || "", {
				status: body.status,
			});
		}
	);

	useEffect(() => {
		if (parseData) {
			socket.emit("join", parseData.id);

			socket.on("notification", () => {
				void userNotification.refetch();
			});
		}
		return () => {
			socket.off("notification");
		};
	}, [parseData]);

	useEffect(() => {
		if (userQuery.data && !getLocalStorage(userName)) {
			sendToLocalStorage(
				userName,
				`${userQuery.data?.firstName} ${userQuery.data?.lastName}`
			);
			sendToLocalStorage(userBasicInformation, JSON.stringify(userQuery.data));
			setEnabled(false);
		}
	}, [userQuery]);

	useEffect(() => {
		setNotifications(userNotification.data?.data || []);
	}, [userNotification.isFetching]);

	useEffect(() => {
		if (updateNotificationQuery.isSuccess) {
			void userNotification.refetch();
			updateNotificationQuery.reset();
		}
	}, [updateNotificationQuery]);

	useEffect(() => {
		if (lenderData.length <= 0) {
			setLenderData(dkcLendersQuery?.data?.data || []);
		}
	}, [dkcLendersQuery.isSuccess]);

	const handleOpenModal = (): void => {
		setOpenModalUser(!openModalUser);
	};
	const handleOpenModalNotification = (): void => {
		setOpenModalNotification(!openModalNotification);
	};

	const navigateToProfile = (): void => {
		void navigate({ to: `/profile` });
	};

	const navigateToPermission = (): void => {
		void navigate({ to: `/permissions` });
	};
	return (
		<div className="flex flex-col h-screen bg-gradient relative">
			<div className="flex items-center justify-between px-12 py-4">
				<img src={LogoGold} alt="DKC Logo" />
				<ul className="flex space-x-2">
					{NavbarRoutes.map((route) => (
						<Link
							key={route.path}
							to={route.path}
							className="link-text font-inter font-semibold px-4 py-2"
							activeProps={{ className: "text-white" }}
							inactiveProps={{ className: "opacity-40 text-gray-1000" }}
							params={{}}
							search={{}}
						>
							{route.name}
						</Link>
					))}
				</ul>
				<div className="flex space-x-2 items-center">
					<Link
						className="button-text px-4 py-2 rounded-2xl bg-white font-bold"
						to={createLoanTo}
						params={{}}
						search={{}}
					>
						Create Loan
					</Link>
					<div
						onClick={handleOpenModalNotification}
						className="relative cursor-pointer"
					>
						{userNotification.data?.data?.filter(
							(data) => data?.status === "SENT"
						)?.length !== 0 && (
							<div
								className="w-[15px] h-[15px] rounded-full  bg-red-500 absolute text-[10px] justify-center items-center flex text-white"
								style={{
									top: "-5px",
									right: "-2px",
								}}
							>
								{
									userNotification.data?.data?.filter(
										(data) => data?.status === "SENT"
									)?.length
								}
							</div>
						)}
						<Icon name="notification" color={"#dcdfe0"} width="25" />
					</div>
					<div onClick={handleOpenModal} className="flex cursor-pointer">
						<Avatar />
					</div>
				</div>
			</div>

			<div className="flex m-2 h-screen overflow-y-auto">{children}</div>
			{openModalUser && (
				<>
					<div
						className="w-full h-full absolute bg-gray-400 opacity-30 z-30"
						onClick={handleOpenModal}
					></div>
					<div
						className="absolute rounded-[13px] bg-white flex flex-col gap-2 "
						style={{
							width: "15%",
							right: "50px",
							top: "55px",
							padding: "10px",
							zIndex: "100",
						}}
					>
						<div className="border-b border-gray-200 pb-2 flex gap-2 items-center">
							<Avatar name={localUserName} />
							{localUserName}
						</div>

						<div
							className=" flex gap-3 items-center p-1 cursor-pointer"
							onClick={navigateToProfile}
						>
							<Icon name="passwordProfile" color="black" width="20" />
							My profile
						</div>

						<div
							className=" flex gap-3 items-center p-1 cursor-pointer"
							onClick={navigateToPermission}
						>
							<Icon name="permission" color="black" width="20" />
							Permission
						</div>
						<LogOff />
					</div>
				</>
			)}

			{openModalNotification && (
				<>
					<div
						className="w-full h-full absolute bg-gray-400 opacity-30 z-30"
						onClick={handleOpenModalNotification}
					></div>
					<div
						className="absolute rounded-[13px] bg-white flex flex-col gap-2 "
						style={{
							width: "350px",
							right: "100px",
							top: "60px",
							padding: "15px",
							zIndex: "100",
							maxHeight: "80%",
							overflow: "overlay",
						}}
					>
						<div className="border-b border-gray-200 pb-2 flex gap-2 items-center justify-between">
							<div className="text-[18px]">Notifications</div>{" "}
							<div
								className="w-[24px] h-[24px] rounded-full flex justify-center items-center bg-gray-200 cursor-pointer"
								onClick={() => {
									setOpenModalNotification(false);
								}}
							>
								<Icon name="close" width="10" />
							</div>
						</div>

						<div className="flex flex-col gap-2">
							{notifications?.map((data: UserNotification) => {
								return (
									<Notification
										text={data.notification?.content}
										userFullName={data.notification?.userFullName}
										state={data.status}
										date={data.createdAt?.toString()}
										handleOnClick={() => {
											const parseData = data.notification?.redirectPath;
											const jsonString = parseData?.replace(
												/: ([a-f0-9\-]{36}),/g,
												': "$1",'
											);

											if (parseData) {
												const data = JSON.parse(jsonString || "") as {
													id: string;
													ledgerId: string;
												};
												setLoanId(data.id);
												setLedgerId(data.ledgerId);
											}

											setOpenModalLoan(true);
											setNotificationTitle(data?.notification?.title);
											setTypeNotification(data.notification?.type);
											if (data.status !== "READ") {
												updateNotificationQuery.mutate({
													id: data.id,
													status: "READ",
												});
											}
										}}
									/>
								);
							})}
						</div>

						<div className="border-t border-gray-200 pt-2 flex gap-2 items-center w-full justify-end ">
							<Button
								buttonText="Mark all as read"
								className="rounded-3xl mt-2 text-black bg-gray-200"
							/>
						</div>
					</div>
				</>
			)}

			<ServicingModal
				title={openNotificationTitle}
				id={openLoanId}
				ledgerId={ledgerId}
				openModal={openModalLoan}
				handleRefreshData={() => {
					void userNotification.refetch();
					setOpenModalLoan(false);
				}}
				handleOnCLose={(): void => {
					setOpenModalLoan(false);
				}}
				type={typeNotification}
			/>
		</div>
	);
};
