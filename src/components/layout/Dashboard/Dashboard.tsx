import { useState, type FC, type ReactNode, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/router";
import { Icon } from "@/components/ui/Icon";
import LogoGold from "@/assets/images/png/LogoGold.png";
import { Avatar } from "@/components/ui/Avatar";
import { NavbarRoutes } from "@/features/dashboard/routes/DashboardRouter";
import "./Dashboard.css";
import { useQuery } from "@tanstack/react-query";
import ManageUsersService from "@/features/manage-user/api/investors";
import { getLocalStorage, sendToLocalStorage } from "@/utils/local-storage";
import { sub, userName } from "@/utils/constant";

type Props = {
	children?: ReactNode;
};

export const DashboardLayout: FC<Props> = ({ children }: Props) => {
	const createLoanTo: string = "/create-loan";
	const localSub = getLocalStorage(sub);
	const navigate = useNavigate();
	const [enabled, setEnabled] = useState<boolean>(
		getLocalStorage(userName) ? false : true
	);

	const userQuery = useQuery(
		["user-query"],
		() => {
			return ManageUsersService.getUser(localSub);
		},
		{ enabled }
	);

	useEffect(() => {
		if (userQuery.data && !getLocalStorage(userName)) {
			sendToLocalStorage(
				userName,
				`${userQuery.data?.firstName} ${userQuery.data?.lastName}`
			);
			setEnabled(false);
		}
	}, [userQuery]);

	const navigateToProfile = (): void => {
		void navigate({ to: `/profile` });
	};

	return (
		<div className="flex flex-col h-screen bg-gradient">
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
					<div onClick={navigateToProfile} className="flex cursor-pointer">
						<Avatar />
					</div>
				</div>
			</div>

			<div className="flex m-2 h-screen overflow-y-auto">{children}</div>
		</div>
	);
};
