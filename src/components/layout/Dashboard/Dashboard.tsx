import { type FC, type ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/router";
import { Icon } from "@/components/ui/Icon";
import "@/assets/images/png/LogoGold_2x.png";
import LogoGold from "@/assets/images/png/LogoGold.png";
import { Avatar } from "@/components/ui/Avatar";
import { NavbarRoutes } from "@/features/dashboard/routes/DashboardRouter";
import "./Dashboard.css";
import { useQuery } from "@tanstack/react-query";
import ManageUsersService from "@/features/manage-user/api/investors";
import { getLocalStorage, sendToLocalStorage } from "@/utils/local-storage";
import { sub, userBasicInformation, userName } from "@/utils/constant";
import { LogOff } from "@/features/profile/component/LogOff/LogOff";
import DkcLendersService from "@/features/servicing/api/servicing";
import servicingStore from "@/features/servicing/stores/servicing-store";

type Props = {
	children?: ReactNode;
};

export const DashboardLayout: FC<Props> = ({ children }: Props) => {
	const navigate = useNavigate();
	const createLoanTo: string = "/create-loan";
	const localSub = getLocalStorage(sub);
	const localUserName = getLocalStorage(userName);
	const [enabled, setEnabled] = useState<boolean>(
		getLocalStorage(userName) ? false : true
	);
	const [openModalUser, setOpenModalUser] = useState<boolean>();
	const setLenderData = servicingStore((state) => state.setLender);
	const lenderData = servicingStore((state) => state.lenders);

	const userQuery = useQuery(
		["user-query"],
		() => {
			return ManageUsersService.getUser(localSub);
		},
		{ enabled }
	);

	const dkcLendersQuery = useQuery(
		["dkc-lenders-query"],
		() => {
			return DkcLendersService.getLenders();
		},
		{ enabled: lenderData.length <= 0 }
	);

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
		if (lenderData.length <= 0) {
			setLenderData(dkcLendersQuery?.data?.data || []);
		}
	}, [dkcLendersQuery.isSuccess]);

	const handleOpenModal = (): void => {
		setOpenModalUser(!openModalUser);
	};

	const navigateToProfile = (): void => {
		void navigate({ to: `/profile` });
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
					<Icon
						name="notification"
						color={"rgba(251, 254, 255, 0.35)"}
						width="20"
					/>
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
							<Icon name="userProfile" color="black" width="20" />
							My Profile
						</div>

						<div
							className=" flex gap-3 items-center p-1 cursor-pointer"
							onClick={navigateToProfile}
						>
							<Icon name="passwordProfile" color="black" width="20" />
							Change Password
						</div>
						<LogOff />
					</div>
				</>
			)}
		</div>
	);
};
