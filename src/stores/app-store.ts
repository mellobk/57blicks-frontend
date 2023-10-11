import { create, type SetState } from "zustand";

interface IState {
	errorMessage: string;
	setErrorMessage: (message: string) => void;
	clearErrorMessage: () => void;
	successMessage: string;
	setSuccessMessage: (message: string) => void;
	clearSuccessMessage: () => void;
}

const useStore = create<IState>((set: SetState<IState>) => ({
	errorMessage: "",
	successMessage: "",
	setErrorMessage: (message) => {
		set({ errorMessage: message });
	},
	clearErrorMessage: () => {
		set({ errorMessage: "" });
	},
	setSuccessMessage: (message) => {
		set({ successMessage: message });
	},
	clearSuccessMessage: () => {
		set({ successMessage: "" });
	},
}));

export default useStore;
