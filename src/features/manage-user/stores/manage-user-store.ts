/* eslint-disable @typescript-eslint/explicit-function-return-type */

import type { User } from "@/features/admin/components/manage-user/types/api";
import { create, type SetState } from "zustand";


interface IState {
	userInfo: User;
	setUserInfo: (userData: User | null) => void;

}

const manageUserStore = create<IState>((set: SetState<IState>) => ({
	userInfo: {},
	setUserInfo: (userData) => {
		set({ userInfo: userData || {} });
	}
}));

export default manageUserStore;
