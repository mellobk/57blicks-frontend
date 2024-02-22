/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
import { Modal } from "@/components/ui/Modal/Modal.tsx";
import OpportunitiesService from "@/api/opportunities.ts";
import { DocumentPreview } from "@/features/investor/components/opportunities/components/DocumentPreview/DocumentPreview.tsx";
import { SuccessModal } from "@/components/ui/SuccessModal/SuccessModal.tsx";

type Props = {
	children?: ReactNode;
};

export const InvestorLayout: FC<Props> = ({ children }) => {
	const url = window.location.href;
	const firstPart = url.split("/").slice(0, 3).join("/");

	useEffect(() => {
		console.log(firstPart);
	}, [url]);

	const getFilename = (referenceId: number): string => {
		return `DKC_Opportunity_${referenceId}.pdf`;
	};

	const createLedgerQuery = useMutation(async (body: any) => {
		return ManageNotificationService.createNotifications(body);
	});

	const navigate = useNavigate();
	const userLoggedInfo = userStore((state) => state.setLoggedUserInfo);
	const userInfo = userStore((state) => state.loggedUserInfo);

	const [selectedOpportunity, setSelectedOpportunity] = useState<string>();

	const [openModalNotification, setOpenModalNotification] = useState<boolean>();
	const [notificationsCount, setNotificationsCount] = useState<number>();
	const [notifications, setNotifications] = useState<Array<UserNotification>>();
	const localUserName = getLocalStorage(userName);
	const [openModalUser, setOpenModalUser] = useState<boolean>();
	const [openModal, setOpenModal] = useState<boolean>();
	const [openSuccessModal, setOpenSuccessModal] = useState<boolean>();
	const [investorId, setInvestorId] = useState<string>();
	const [opportunityId, setOpportunityId] = useState<string>();
	const [opportunityStatus, setOpportunityStatus] = useState<string>();

	const getOpportunityQuery = useQuery(
		["opportunity-notifications-query", selectedOpportunity],
		() => OpportunitiesService.getOpportunity(selectedOpportunity || ""),
		{ enabled: !!selectedOpportunity }
	);

	useEffect(() => {
		const investment = getOpportunityQuery?.data?.investments.find(
			(data) => data.investor.user?.id === userInfo.id
		);
		setOpportunityStatus(investment?.status);
	}, [getOpportunityQuery.isFetching]);

	useEffect(() => {
		if (openModal) {
			void getOpportunityQuery.refetch();
		}
	}, [openModal]);

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
			return ManageNotificationService.getUserNotification("notifications");
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

	const updateOpportunityQuery = useMutation(
		async (body: {
			investorId: string;
			opportunityId: string;
			status: string;
		}) => {
			return ManageNotificationService.putInvestmentStatus(
				body.investorId,
				body.opportunityId,
				{
					status: body.status,
				}
			);
		}
	);

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

	const handleFaq = (): void => {
		void navigate({ to: `/investors/Faq` });
	};

	const handleOpenModal = (): void => {
		setOpenModalUser(!openModalUser);
	};

	const navigateToProfile = (): void => {
		void navigate({ to: `/investors/Profile` });
	};

	useEffect(() => {
		if (updateOpportunityQuery.isSuccess) {
			setOpenModal(false);
			setOpenSuccessModal(true);

			createLedgerQuery.mutate({
				title: "Opportunity accepted",
				timestamp: new Date(),
				content:
					`The ${localUserName} accepted the opportunity ${getOpportunityQuery.data?.postTitle}. `.replace(
						"New Loan Investment Opportunity -",
						""
					),
				additionalData: "",
				redirectPath: `${firstPart}/opportunities/past-opportunities?id=${getOpportunityQuery.data?.id}`,
				userFullName: localUserName,
				priority: "HIGH",
				type: "LOAN",
				roles: ["super-admin"],
			});
		}
	}, [updateOpportunityQuery.isLoading]);

	useEffect(() => {
		if (userLoggedQuery.data) {
			sendToLocalStorage(
				userName,
				`${userLoggedQuery.data?.firstName} ${userLoggedQuery.data?.lastName}`
			);
			userLoggedInfo(userLoggedQuery.data);
		}
	}, [userLoggedQuery.data]);

	useEffect(() => {
		if (updateReadNotificationQuery.isSuccess) {
			void userNotification.refetch();
			updateReadNotificationQuery.reset();
		}
	}, [updateReadNotificationQuery]);

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
					<div onClick={handleFaq} className="relative cursor-pointer">
						<Icon name="faq" color={"#dcdfe0"} width="25" />{" "}
					</div>
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
											date={data.createdAt}
											handleOnClick={() => {
												if (data.status !== "READ") {
													updateNotificationQuery.mutate({
														id: data.id,
														status: "READ",
													});
												}

												const parseData = data.notification?.additionalData;
												const jsonString = parseData?.replace(
													/: ([\da-f\-]{36}),/g,
													': "$1",'
												);

												if (parseData) {
													const data = JSON.parse(jsonString || "") as {
														investorId: string;
														opportunityId: string;
													};
													setInvestorId(data.investorId);
													setOpportunityId(data.opportunityId);
													setOpenModal(!openModal);
													setSelectedOpportunity(data.opportunityId);
												} else {
													setOpenModal(false);
													setInvestorId("");
													setOpportunityId("");
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

			<Modal
				onHide={() => {
					setOpenModal(!openModal);
				}}
				title={"New Offer"}
				visible={openModal}
				width="90vw"
				minHeight="90vh"
			>
				<>
					{opportunityStatus === "PENDING" &&
					getOpportunityQuery?.data?.isOpen ? (
						<div
							className=" flex absolute  items-center justify-end gap-2"
							style={{ right: "65px", top: "24px", zIndex: 1 }}
						>
							<div className="cursor-pointer">
								<Button
									buttonText="Approve"
									className=" rounded-3xl bg-green-900 text-green-500"
									onClick={() => {
										updateOpportunityQuery.mutate({
											investorId: investorId || "",
											opportunityId: opportunityId || "",
											status: "ACCEPTED",
										});
									}}
								/>
							</div>

							<div className="cursor-pointer">
								<Button
									buttonText="Decline"
									className=" rounded-3xl bg-red-200 text-red-500"
									onClick={() => {
										updateOpportunityQuery.mutate({
											investorId: investorId || "",
											opportunityId: opportunityId || "",
											status: "REJECTED",
										});
									}}
								/>
							</div>
						</div>
					) : (
						<div
							className=" flex absolute  items-center justify-end gap-2"
							style={{ right: "65px", top: "24px", zIndex: 1 }}
						>
							<div className="cursor-pointer">
								<Button
									buttonText="Closed"
									className=" rounded-3xl bg-red-200 text-red-500"
								/>
							</div>
						</div>
					)}
					{opportunityStatus !== "PENDING" && (
						<div
							className=" flex absolute  items-center justify-end gap-2"
							style={{ right: "65px", top: "24px", zIndex: 1 }}
						>
							{opportunityStatus === "ACCEPTED" ? (
								<div className="cursor-pointer">
									<Button
										buttonText="Approve"
										className=" rounded-3xl bg-green-900 text-green-500"
									/>
								</div>
							) : (
								<div className="cursor-pointer">
									<Button
										buttonText="Decline"
										className=" rounded-3xl bg-red-200 text-red-500"
									/>
								</div>
							)}
						</div>
					)}
					<div className="lg:col-span-7 col-span-1 flex flex-col gap-8 py-2 h-[80vh]">
						<DocumentPreview
							data={getOpportunityQuery.data}
							getFilename={getFilename}
							isLoading={getOpportunityQuery.isLoading}
						/>
					</div>
				</>
			</Modal>

			<SuccessModal
				width="20vw"
				description="Your opportunity has been submitted. Soon, someone from the DKC team will contact you. Thank you for your interest in our service"
				openModal={openSuccessModal ?? false}
				setOpenModal={() => {
					setOpenSuccessModal(false);
				}}
				title="Opportunity accepted"
			/>
		</div>
	);
};
