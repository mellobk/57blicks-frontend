import type { BorrowerCustomResponse } from "../../../api/borrowers";

export const validateSendBorrowerNotification = (
	borrowers: Array<BorrowerCustomResponse>,
	notification: string,
	smsContent: string,
	emailContent: string
): string => {
	let response = "";
	const newBorrowers = [...borrowers];
	const selectedBorrowers = newBorrowers.filter(
		(borrower) => borrower.selected
	);

	if (selectedBorrowers.length === 0) {
		response = "Select at least one borrower";
		return response;
	}

	const selectedBorrowersWithSms = selectedBorrowers.filter(
		(borrower) => borrower.sms
	);
	const selectedBorrowersWithEmail = selectedBorrowers.filter(
		(borrower) => borrower.email
	);

	if (
		selectedBorrowersWithSms.length === 0 &&
		selectedBorrowersWithEmail.length === 0
	) {
		response = "All selected borrowers must have sms or email";
		return response;
	}

	if (notification === "custom-notification" && !smsContent && !emailContent) {
		response = "Please enter sms or email content";
		return response;
	}

	return response;
};
