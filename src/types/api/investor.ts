import type { Lenders } from "@/features/admin/components/investor-portals/types/api";
import type { ParticipationBreakdown } from "./participation-breakdown";
import type { User } from "@/types/api/user";

export interface Investor {
	target?: unknown;
	id: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
	ssnEin?: string;
	streetAddress?: string;
	zip?: string;
	bankingName?: string;
	routingNumber?: string;
	accountNumber?: string;
	accountType?: string;
	user?: User;
	participationBreakdowns?: Array<ParticipationBreakdown>;
	lender?: Lenders;
}
