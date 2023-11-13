import type { BorrowerCustomResponse } from "@/features/admin/components/servicing/api/borrowers";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ItemCheckboxBorrowerType = {
	id: number | string;
	name: string;
	borrower: BorrowerCustomResponse;
	notes: boolean;
	sms: boolean;
	email: boolean;
	smsContent: string;
	emailContent: string;
};
