import type { Collateral } from "@/types/api/collateral";

export const collateralsToString = (collaterals: Array<Collateral>): string => {
	return collaterals
		.map((collateral) => {
			return collateral.address;
		})
		.join(", ");
};
