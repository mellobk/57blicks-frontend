import { Investor } from "@/types/api/investor";

export interface Investment {
	createdAt: string;
	id: string;
	investor: Investor;
	notifyEmail: boolean;
	notifySms: boolean;
	status: "ACCEPTED" | "PENDING" | "REJECTED";
	updatedAt: string;
}
