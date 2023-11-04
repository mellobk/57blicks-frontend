import { type FC, type ReactNode, useEffect } from "react";
import "@/assets/images/png/LogoGold_2x.png";
import "./InvestorLayout.css";
import { useQuery } from "@tanstack/react-query";
import userStore from "@/stores/user-store.ts";
import { sendToLocalStorage } from "@/utils/local-storage";
import { userName } from "@/utils/constant";
import UserService from "../../../api/user.ts";

type Props = {
	children?: ReactNode;
};

export const InvestorLayout: FC<Props> = ({ children }) => {
	const userLoggedInfo = userStore((state) => state.setLoggedUserInfo);

	const userLoggedQuery = useQuery(
		["user-logged-query"],
		() => {
			return UserService.getMyInfo();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

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
			{children}
		</div>
	);
};
