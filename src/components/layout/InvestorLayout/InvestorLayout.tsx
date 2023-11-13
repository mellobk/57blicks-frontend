import { type FC, type ReactNode, useEffect, useState } from "react";
import "@/assets/images/png/LogoGold_2x.png";
import "./InvestorLayout.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import userStore from "@/stores/user-store.ts";
import { getLocalStorage, sendToLocalStorage } from "@/utils/local-storage";
import { userName } from "@/utils/constant";
import UserService from "../../../api/user.ts";
import { Link, useNavigate } from "@tanstack/router";
import { InvestorRoutes } from "@/features/investor/routes/InvestorRouter.tsx";
import LogoGold from "@/assets/images/png/LogoGold.png";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { LogOff } from "@/features/admin/components/profile/component/LogOff/LogOff";
import ManageNotificationService from "@/features/admin/components/notifications/api/notification.ts";
import socket from "@/socket.ts";
import type { UserNotification } from "@/types/api/notifications.ts";
import { Notification } from "@/features/admin/components/notifications/components/Notification/Notification.tsx";
import { Button } from "@/components/ui/Button/Button.tsx";

type Props = {
	children?: ReactNode;
};

export const InvestorLayout: FC<Props> = ({ children }) => {
	const navigate = useNavigate();
	const userLoggedInfo = userStore((state) => state.setLoggedUserInfo);
	const userInfo = userStore((state) => state.loggedUserInfo);

	const [openModalNotification, setOpenModalNotification] = useState<boolean>();
	const [notificationsCount, setNotificationsCount] = useState<number>();
	const [notifications, setNotifications] = useState<Array<UserNotification>>();
	const localUserName = getLocalStorage(userName);
	const [openModalUser, setOpenModalUser] = useState<boolean>();

	const userLoggedQuery = useQuery(
		["user-logged-query"],
		() => {
			return UserService.getMyInfo();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	const userNotification = useQuery(
		["user-notification-query"],
		() => {
			return ManageNotificationService.getUserNotification();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	useEffect(() => {
		socket.emit("join", userInfo.id);

		socket.on("notification", () => {
			void userNotification.refetch();
			void userNotification.refetch();
		});
		return () => {
			socket.off("notification");
		};
	}, [userInfo]);

	const updateReadNotificationQuery = useMutation(async () => {
		return ManageNotificationService.putReadUserNotification();
	});

	useEffect(() => {
		setNotifications(userNotification.data?.data || []);
		setNotificationsCount(
			userNotification.data?.data?.filter((data) => data?.status === "SENT")
				?.length
		);
	}, [userNotification.isFetching]);

	const updateNotificationQuery = useMutation(
		async (body: UserNotification) => {
			return ManageNotificationService.putUserNotification(body.id || "", {
				status: body.status,
			});
		}
	);

	const handleOpenModalNotification = (): void => {
		setOpenModalNotification(!openModalNotification);
	};

	const handleOpenModal = (): void => {
		setOpenModalUser(!openModalUser);
	};

	const navigateToProfile = (): void => {
		void navigate({ to: `/investors/Profile` });
	};

	useEffect(() => {
		if (userLoggedQuery.data) {
			sendToLocalStorage(
				userName,
				`${userLoggedQuery.data?.firstName} ${userLoggedQuery.data?.lastName}`
			);
			userLoggedInfo(userLoggedQuery.data);
		}
	}, [userLoggedQuery.data]);

	const markAllReadNotifications = () => {
		updateReadNotificationQuery.mutate();
	};
	return (
		<div className="flex flex-col h-screen bg-gradient relative">
			<div className="flex items-center justify-between px-12 py-4">
				<img src={LogoGold} alt="DKC Logo" />
				<ul className="flex space-x-2">
					{InvestorRoutes.map(
						(route: {
							path: string;
							page: FC;
							layout: FC<Props>;
							name: string;
						}) =>
							route.name && (
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
							)
					)}
				</ul>
				<div className="flex items-center gap-2">
					<div
						onClick={handleOpenModalNotification}
						className="relative cursor-pointer"
					>
						{notificationsCount !== 0 && (
							<div
								className="w-[15px] h-[15px] rounded-full  bg-red-500 absolute text-[10px] justify-center items-center flex text-white"
								style={{
									top: "-5px",
									right: "-2px",
								}}
							>
								{notificationsCount}
							</div>
						)}
						<Icon name="notification" color={"#dcdfe0"} width="25" />{" "}
					</div>
					<div onClick={handleOpenModal} className="flex cursor-pointer">
						<Avatar
							name={
								localUserName ||
								`${userLoggedQuery.data?.firstName} ${userLoggedQuery.data?.lastName}`
							}
						/>
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
							right: "70px",
							top: "60px",
							padding: "15px",
							zIndex: "100",
							maxHeight: "80%",
							overflow: "overlay",
						}}
					>
						<div className="border-b border-gray-200 pb-2 flex gap-2 items-center justify-between">
							<div className="text-[18px]">Notifications</div>{" "}
							<div className="flex justify-center items-center gap-3">
								<Button
									buttonText="Mark all as read"
									className="rounded-3xl text-black bg-gray-200 h-[24px] px-4"
									onClick={markAllReadNotifications}
								/>
								<div
									className="w-[24px] h-[24px] rounded-full flex justify-center items-center bg-gray-200 cursor-pointer"
									onClick={() => {
										setOpenModalNotification(false);
									}}
								>
									<Icon name="close" width="10" />
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							{notifications?.map((data: UserNotification, key: number) => {
								return (
									<div key={key}>
										<Notification
											text={data.notification?.content}
											userFullName={data.notification?.userFullName}
											state={data.status}
											date={data.createdAt?.toString()}
											handleOnClick={() => {
												if (data.status !== "READ") {
													updateNotificationQuery.mutate({
														id: data.id,
														status: "READ",
													});
												}
											}}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</>
			)}
		</div>
	);
};
