/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { UserMovieResponse } from "@/features/home/types/movies.type";
import type { Loan } from "@/types/fields/loan";
import { create, type SetState } from "zustand";

interface IState {
	selectOption: string;
	userInfo: UserMovieResponse;
	editLoan: Loan;
	setUserInfo: (userData: UserMovieResponse | null) => void;
	setEditLoan: (loanData: Loan | null) => void;
	setSelectedOption: (option: string | null) => void;
}

const userStore = create<IState>((set: SetState<IState>) => ({
	selectOption: "1",
	userInfo: {},
	editLoan: {},
	loggedUserInfo: {},
	setUserInfo: (userData): void => {
		set({ userInfo: userData || {} });
	},
	setEditLoan: (loanData): void => {
		set({ editLoan: loanData || {} });
	},
	setSelectedOption: (option): void => {
		set({ selectOption: option || "1" });
	},
}));

export default userStore;
