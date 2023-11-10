import { type FC, type ReactNode, useEffect, useState } from "react";
import "@/assets/images/png/LogoGold_2x.png";
import "./InvestorLayout.css";
import { useQuery } from "@tanstack/react-query";
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

type Props = {
	children?: ReactNode;
};

export const InvestorLayout: FC<Props> = ({ children }) => {
	const navigate = useNavigate();
	const userLoggedInfo = userStore((state) => state.setLoggedUserInfo);
	const [openModalNotification, setOpenModalNotification] = useState<boolean>();
	const [notificationsCount] = useState<number>();
	const localUserName = getLocalStorage(userName);
	const [openModalUser, setOpenModalUser] = useState<boolean>();

	const userLoggedQuery = useQuery(
		["user-logged-query"],
		() => {
			return UserService.getMyInfo();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	const handleOpenModalNotification = (): void => {
		setOpenModalNotification(!openModalNotification);
	};

	const handleOpenModal = (): void => {
		setOpenModalUser(!openModalUser);
	};
	
	const navigateToProfile = (): void => {
		void navigate({ to: `/profile` });
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
						<Avatar name={localUserName} />
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
		</div>
	);
};
