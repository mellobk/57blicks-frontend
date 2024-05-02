/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useEffect, useState, type FC, type ReactNode } from "react";

import "@/assets/images/png/LogoGold_2x.png";
import { Icon } from "@/components/ui/Icon";
import { userMoviesHook } from "@/hooks/movies";
import { Link } from "@tanstack/router";
import { HomeRoutesNames } from "@/features/home/routes/homeRouter";
import { signOut } from "@/lib/cognito";

type Props = {
	children?: ReactNode;
	hScreen?: string;
};

export const DashboardLayout: FC<Props> = ({
	children,
	hScreen = "h-screen",
}) => {
	userMoviesHook();
	const [opacity, setOpacity] = useState(0);
	useEffect(() => {
		const timer = setTimeout(() => {
			setOpacity(100);
		}, 10);
		return () => {
			clearTimeout(timer);
		};
	}, []);
	return (
		<div className={`flex flex-col ${hScreen} bg-gradient relative `}>
			<div className="flex justify-end gap-1 p-2 cursor-pointer items-center">
				<Link
					className="button-text px-4 py-2 rounded-2xl bg-white font-bold"
					to={HomeRoutesNames.favorites}
					params={{}}
					search={{}}
				>
					My favorites
				</Link>

				<Link
					className="button-text px-4 py-2 rounded-2xl bg-white font-bold"
					to={HomeRoutesNames.movies}
					params={{}}
					search={{}}
				>
					Home
				</Link>

				<div
					className={`flex justify-end gap-1 p-2 cursor-pointer `}
					onClick={() => {
						localStorage.clear();
						window.location.href = "/login";
					}}
				>
					<Icon name="user" width="25" color="black" />
					LogOut
				</div>
			</div>
			<div
				className={`transition-opacity duration-500 ${
					opacity === 100 ? "opacity-100" : "opacity-0"
				}`}
			>
				{children}
			</div>
		</div>
	);
};
