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
