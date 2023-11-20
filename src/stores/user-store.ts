import type { User } from "@/features/admin/components/manage-user/types/api.ts";
import type { Loan } from "@/types/fields/loan";
import { create, type SetState } from "zustand";

interface IState {
	userInfo: User;
	editLoan: Loan;
	loggedUserInfo: User;
	setUserInfo: (userData: User | null) => void;
	setLoggedUserInfo: (userData: User | null) => void;
	setEditLoan: (loanData: Loan | null) => void;
}

const userStore = create<IState>((set: SetState<IState>) => ({
	userInfo: {},
	editLoan: {},
	loggedUserInfo: {},
	setUserInfo: (userData): void => {
		set({ userInfo: userData || {} });
	},
	setLoggedUserInfo: (userData): void => {
		set({ loggedUserInfo: userData || {} });
	},
	setEditLoan: (loanData): void => {
		set({ editLoan: loanData || {} });
	},
}));

export default userStore;
