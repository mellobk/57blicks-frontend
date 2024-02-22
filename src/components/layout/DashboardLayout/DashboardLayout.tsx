/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type FC, type ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/router";
import { Icon } from "@/components/ui/Icon";
import "@/assets/images/png/LogoGold_2x.png";
import LogoGold from "@/assets/images/png/LogoGold.png";
import { Avatar } from "@/components/ui/Avatar";
import { NavbarData } from "@/features/admin/routes/AdminRouter";
import "./DashboardLayout.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import userStore from "@/stores/user-store.ts";
import { getLocalStorage, sendToLocalStorage } from "@/utils/local-storage";
import { userName } from "@/utils/constant";
import { LogOff } from "@/features/admin/components/profile/component/LogOff/LogOff";
import socket from "../../../socket";

import type { UserNotification } from "@/types/api/notifications.ts";
import { ServicingModal } from "@/features/admin/components/notifications/components/ServicingModal/ServicingModal";
import { Notification } from "@/features/admin/components/notifications/components/Notification/Notification";
import { Button } from "@/components/ui/Button";
import { GlobalSearch } from "@/components/ui/GlobalSearch/GlobalSearch";
import ManageNotificationService from "@/features/admin/components/notifications/api/notification";
import UserService from "../../../api/user.ts";
import { findPermission } from "@/utils/common-functions.ts";
import { PermissionType } from "@/types/api/permissions-type";
import { getRefreshToken } from "@/lib/cognito.ts";
import { Select } from "@/components/forms/Select/Select.tsx";
import { NOTIFICATION_OPTIONS } from "@/features/admin/components/manage-user/utils/constant.ts";

type Props = {
	children?: ReactNode;
	hScreen?: string;
};

export const DashboardLayout: FC<Props> = ({
	children,
	hScreen = "h-screen",
}) => {
	const navigate = useNavigate();
	const createLoanTo: string = "/create-loan";
	const localUserName = getLocalStorage(userName);
	const [notifications, setNotifications] = useState<Array<UserNotification>>();
	const [notificationsCount, setNotificationsCount] = useState<number>();
	const [openLoanId, setLoanId] = useState<string>();
	const [ledgerId, setLedgerId] = useState<string>();
	const [typeNotification, setTypeNotification] = useState<string>();
	const [openNotificationTitle, setNotificationTitle] = useState<string>();
	const [openModalUser, setOpenModalUser] = useState<boolean>();
	const [openModalLoan, setOpenModalLoan] = useState<boolean>();
	const [notificationsType, setNotificationsType] =
		useState<string>("notifications");
	const [openModalGeneralSearch, setOpenModalGeneralSearch] =
		useState<boolean>(false);
	const [openModalNotification, setOpenModalNotification] = useState<boolean>();

	const userLoggedInfo = userStore((state) => state.setLoggedUserInfo);
	const userInfo = userStore((state) => state.loggedUserInfo);

	const userLoggedQuery = useQuery(
		["user-logged-query"],
		() => {
			return UserService.getMyInfo();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	useEffect(() => {
		sendToLocalStorage("image", "not image");
	}, []);

	const userNotification = useQuery(
		["user-notification-query"],
		() => {
			return ManageNotificationService.getUserNotification(notificationsType);
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	const updateReadNotificationQuery = useMutation(async () => {
		return ManageNotificationService.putReadUserNotification();
	});

	const updateNotificationQuery = useMutation(
		async (body: UserNotification) => {
			return ManageNotificationService.putUserNotification(body.id || "", {
				status: body.status,
			});
		}
	);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.keyCode === 70) {
				event.preventDefault();

				setOpenModalGeneralSearch(!openModalGeneralSearch);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [openModalGeneralSearch]);

	useEffect(() => {
		const interval = setInterval(async () => {
			if (userInfo.email) {
				await getRefreshToken(userInfo.email);
			}
		}, 900_000);

		socket.emit("join", userInfo.id);

		socket.on("notification", () => {
			void userNotification.refetch();
			void userNotification.refetch();
		});
		return () => {
			socket.off("notification");
			clearInterval(interval);
		};
	}, [userInfo]);

	useEffect(() => {
		if (updateReadNotificationQuery.isSuccess) {
			void userNotification.refetch();
			updateReadNotificationQuery.reset();
		}
	}, [updateReadNotificationQuery]);

	useEffect(() => {
		void userNotification.refetch();
	}, [notificationsType]);

	useEffect(() => {
		if (userLoggedQuery.data) {
			sendToLocalStorage(
				userName,
				`${userLoggedQuery.data?.firstName} ${userLoggedQuery.data?.lastName}`
			);
			/* 			sendToLocalStorage(
				userBasicInformation,
				JSON.stringify(userLoggedQuery.data)
			); */
			userLoggedInfo(userLoggedQuery.data);
		}
	}, [userLoggedQuery.isFetching]);

	useEffect(() => {
		setNotifications(userNotification.data?.data || []);
		setNotificationsCount(
			userNotification.data?.data?.filter((data) => data?.status === "SENT")
				?.length
		);
	}, [userNotification.isFetching]);

	useEffect(() => {
		if (updateNotificationQuery.isSuccess) {
			void userNotification.refetch();
			updateNotificationQuery.reset();
			userNotification.remove();
		}
	}, [updateNotificationQuery.isSuccess]);

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

	const markAllReadNotifications = () => {
		console.log("data");
		updateReadNotificationQuery.mutate();
	};

	const handleClickOpenGlobalSearch = (): void => {
		setOpenModalGeneralSearch(!openModalGeneralSearch);
	};

	const dasBoardPermissionsMenu = [
		findPermission(
			userLoggedQuery?.data?.role,
			userLoggedQuery?.data?.permissionGroup?.permissions || [],
			PermissionType.REPORTING
		)
			? NavbarData.report
			: NavbarData.empty,
		findPermission(
			userLoggedQuery?.data?.role,
			userLoggedQuery?.data?.permissionGroup?.permissions || [],
			PermissionType.LOAN_OVERVIEW
		)
			? NavbarData.loanOverview
			: NavbarData.empty,
		findPermission(
			userLoggedQuery?.data?.role,
			userLoggedQuery?.data?.permissionGroup?.permissions || [],
			PermissionType.VIEW_LOANS
		)
			? NavbarData.servicing
			: NavbarData.empty,

		findPermission(
			userLoggedQuery?.data?.role,
			userLoggedQuery?.data?.permissionGroup?.permissions || [],
			PermissionType.VIEW_LOANS
		)
			? NavbarData.investorPortal
			: NavbarData.empty,
		findPermission(
			userLoggedQuery?.data?.role,
			userLoggedQuery?.data?.permissionGroup?.permissions || [],
			PermissionType.VIEW_OPPORTUNITIES
		)
			? NavbarData.opportunities
			: NavbarData.empty,

		findPermission(
			userLoggedQuery?.data?.role,
			userLoggedQuery?.data?.permissionGroup?.permissions || [],
			PermissionType.VIEW_INVESTORS
		) ||
		findPermission(
			userLoggedQuery?.data?.role,
			userLoggedQuery?.data?.permissionGroup?.permissions || [],
			PermissionType.VIEW_ADMINS
		) ||
		findPermission(
			userLoggedQuery?.data?.role,
			userLoggedQuery?.data?.permissionGroup?.permissions || [],
			PermissionType.VIEW_ACCOUNTS
		) ||
		findPermission(
			userLoggedQuery?.data?.role,
			userLoggedQuery?.data?.permissionGroup?.permissions || [],
			PermissionType.EDIT_ACCOUNTING
		) ||
		findPermission(
			userLoggedQuery?.data?.role,
			userLoggedQuery?.data?.permissionGroup?.permissions || [],
			PermissionType.EDIT_ADMINS
		) ||
		findPermission(
			userLoggedQuery?.data?.role,
			userLoggedQuery?.data?.permissionGroup?.permissions || [],
			PermissionType.EDIT_INVESTORS
		)
			? NavbarData.users
			: NavbarData.empty,
		NavbarData.support,
	];

	return (
		<div className={`flex flex-col ${hScreen} bg-gradient relative`}>
			<div className="flex items-center justify-between px-12 py-4">
				<img src={LogoGold} alt="DKC Logo" />
				<ul className="flex space-x-2">
					{dasBoardPermissionsMenu.map(
						(route) =>
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
				<div className="flex space-x-2 items-center">
					{findPermission(
						userLoggedQuery?.data?.role,
						userLoggedQuery.data?.permissionGroup?.permissions || [],
						PermissionType.CREATE_LOAN
					) && (
						<Link
							className="button-text px-4 py-2 rounded-2xl bg-white font-bold"
							to={createLoanTo}
							params={{}}
							search={{}}
						>
							Create Loan
						</Link>
					)}

					{findPermission(
						userLoggedQuery?.data?.role,
						userLoggedQuery?.data?.permissionGroup?.permissions || [],
						PermissionType.VIEW_PQRS
					) && (
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
					)}

					<div onClick={handleOpenModal} className="flex cursor-pointer">
						<Avatar name={localUserName} />
					</div>
				</div>
			</div>

			<div className={`flex m-2 ${hScreen} overflow-y-auto bg-w`}>
				{children}
			</div>
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

						{findPermission(
							userLoggedQuery?.data?.role,
							userLoggedQuery?.data?.permissionGroup?.permissions || [],
							""
						) && (
							<div
								className=" flex gap-3 items-center p-1 cursor-pointer"
								onClick={navigateToPermission}
							>
								<Icon name="permission" color="black" width="20" />
								Permissions
							</div>
						)}
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
							<div className="text-[18px]">
								<Select
									className="flex flex-col gap-2"
									label=""
									placeholder="Select Account Type"
									value={notificationsType}
									options={NOTIFICATION_OPTIONS}
									onChange={(event): void => {
										setNotificationsType(event.target.value);
									}}
								/>
							</div>{" "}
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
											date={data.createdAt as Date}
											handleOnClick={() => {
												if (data.notification?.redirectPath) {
													window.location.href =
														data.notification?.redirectPath;
												}
												const parseData = data.notification?.additionalData;
												const jsonString = parseData?.replace(
													/: ([\da-f\-]{36}),/g,
													': "$1",'
												);

												if (parseData) {
													const data = JSON.parse(jsonString || "") as {
														id: string;
														ledgerId: string;
													};
													setLoanId(data.id);
													setLedgerId(data.ledgerId);
												} else {
													setLoanId("");
													setLedgerId("");
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
									</div>
								);
							})}
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

			{openModalGeneralSearch && (
				<GlobalSearch handleOpenGlobalSearch={handleClickOpenGlobalSearch} />
			)}
		</div>
	);
};
