import { create, type SetState } from "zustand";
import type { Datum } from "../types/api.ts";

interface IServicingStore {
	lenders: Array<Datum>;
	setLender: (lenders: Array<Datum>) => void;
}

const servicingStore = create<IServicingStore>(
	(set: SetState<IServicingStore>) => ({
		lenders: [],
		setLender: (data) => {
			set({ lenders: data });
		},
	})
);

export default servicingStore;
