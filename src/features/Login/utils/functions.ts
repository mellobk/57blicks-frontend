/* eslint-disable unicorn/prefer-ternary */
import type { PasswordValidations } from "../types/validations";

export const validPasswordRules = (
	text: string,
	passwordInitialsValidations: Array<PasswordValidations>
): Array<PasswordValidations> => {
	const newRules: Array<PasswordValidations> = [...passwordInitialsValidations];

	if (newRules[0]) {
		if (text?.length > 8) {
			newRules[0].complete = true; // Assign the value directly
		} else {
			newRules[0].complete = false; // Assign the value directly
		}
	}

	if (newRules[1]) {
		if (new RegExp(".*[A-Z].*").test(text) && newRules[1]) {
			newRules[1].complete = true; // Assign the value directly
		} else {
			newRules[1].complete = false;
		}
	}

	if (newRules[2]) {
		if (
			new RegExp(`.*[!@#$%^&*()\\-_=+[\\]{}|;:\'",.<>/?].*`).test(text) &&
			newRules[2]
		) {
			newRules[2].complete = true; // Assign the value directly
		} else {
			newRules[2].complete = false;
		}
	}

	return newRules;
};
