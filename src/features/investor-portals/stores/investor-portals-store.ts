import { create, type SetState } from "zustand";
import type { Datum } from "../types/api";

interface IInvestorPortalsStore {
	lenders: Array<Datum>;
	setLender: (lenders: Array<Datum>) => void;
}

const investorPortalsStore = create<IInvestorPortalsStore>(
	(set: SetState<IInvestorPortalsStore>) => ({
		lenders: [],
		setLender: (data) => {
			set({ lenders: data });
		},
	})
);

export default investorPortalsStore;
