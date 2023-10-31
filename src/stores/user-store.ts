import type { User } from "@/features/admin/components/manage-user/types/api.ts";
import { create, type SetState } from "zustand";

interface IState {
	userInfo: User;
	loggedUserInfo: User;
	setUserInfo: (userData: User | null) => void;
	setLoggedUserInfo: (userData: User | null) => void;
}

const userStore = create<IState>((set: SetState<IState>) => ({
	userInfo: {},
	loggedUserInfo: {},
	setUserInfo: (userData): void => {
		set({ userInfo: userData || {} });
	},
	setLoggedUserInfo: (userData): void => {
		set({ loggedUserInfo: userData || {} });
	},
}));

export default userStore;
