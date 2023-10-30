import { type FC, useLayoutEffect } from "react";
import { Mfa } from "@/features/auth/components/Mfa";
import { useSearch } from "@tanstack/router";
import { sendCode } from "@/lib/cognito";
import {
	getLocalStorage,
	removeLocalStorage,
	sendToLocalStorage,
} from "@/utils/local-storage";
import { emailStatus, userEmail } from "../../utils/constants";

export const FirstLogin: FC = () => {
	const data: { email: string } = useSearch();
	removeLocalStorage(emailStatus);
	const localStorageEmail = getLocalStorage(userEmail);
	sendToLocalStorage(userEmail, data.email || localStorageEmail);

	const localEmail = data.email || localStorageEmail;
	const emailParts = localEmail.split("@");
	const hiddenEmail = `${emailParts[0]?.replace(
		emailParts[0]?.slice(0, Math.max(0, emailParts[0].length - 4)),
		"*******"
	)}@${emailParts[1]}`;

	useLayoutEffect(() => {
		const statusEmail = getLocalStorage("emailStatus");
		if (!statusEmail) void sendCode(localEmail || "");
		sendToLocalStorage("emailStatus", "sended");
	}, []);

	return (
		<div className="flex flex-col items-center  gap-3 h-full">
			<Mfa
				title="Welcome to DKC!"
				subTitle="We’ve sent a 6 digit code to your registered phone number."
				buttonText="Continue"
				navigateTo={"create-password"}
				showBackButton={false}
				receptorCode={localEmail}
				labelData={hiddenEmail}
			/>
		</div>
	);
};
