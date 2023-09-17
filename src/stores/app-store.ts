/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { create, type SetState } from "zustand";

interface IState {
	errorMessage: string;
	setErrorMessage: (message: string) => void;
	clearErrorMessage: () => void;
}

const useStore = create<IState>((set: SetState<IState>) => ({
	errorMessage: "",
	setErrorMessage: (message) => {
		set({ errorMessage: message });
	},
	clearErrorMessage: () => {
		set({ errorMessage: "" });
	},
}));

export default useStore;
