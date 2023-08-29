import type { FC, ReactNode } from "react";
import { Link } from "@tanstack/router";
import { Icon } from "@/components/ui/Icon";
import LogoGold from "@/assets/images/png/LogoGold.png";
import { Avatar } from "@/components/ui/Avatar";
import { NavbarRoutes } from "@/features/dashboard/routes/DashboardRouter";
import "./Dashboard.css";

type Props = {
	children?: ReactNode;
};

export const DashboardLayout: FC<Props> = ({ children }: Props) => {
	const createLoanTo: string = "/create-loan";

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
					<Avatar />
				</div>
			</div>

			<div className="flex m-2 h-screen overflow-y-auto">{children}</div>
		</div>
	);
};
