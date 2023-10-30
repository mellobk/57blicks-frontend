import type { PasswordValidations } from "../types/validations.ts";

export const validPasswordRules = (
	text: string,
	passwordInitialsValidations: Array<PasswordValidations>
): Array<PasswordValidations> => {
	const newRules: Array<PasswordValidations> = [...passwordInitialsValidations];

	if (newRules[0]) {
		newRules[0].complete = text?.length > 8;
	}

	if (newRules[1]) {
		newRules[1].complete = !!(
			new RegExp(".*[A-Z].*").test(text) && newRules[1]
		);
	}

	if (newRules[2]) {
		newRules[2].complete = !!(
			new RegExp(`.*[!@#$%^&*()\\-_=+[\\]{}|;:'",.<>/?].*`).test(text) &&
			newRules[2]
		);
	}

	return newRules;
};
