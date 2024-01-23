/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type FC, useState } from "react";
import { Message } from "primereact/message";
import { Input } from "@/components/forms/Input";
import { AuthenticateCode } from "@/components/ui/AuthenticateCode";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/providers/AuthContextProvider";
import { LoginTitle } from "../LoginTitle";
import { ToastMfa } from "../ToastMfa";
import { getSession } from "@/lib/cognito";
import { sendToLocalStorage } from "@/utils/local-storage";
import { accessToken, group } from "@/utils/constant";
import ManageLogService from "@/features/admin/components/manage-user/api/logs";
import { useMutation } from "@tanstack/react-query";

interface MfaProps {
	data: { email: string; password: string };
	title?: string;
	subTitle?: string;
	navigateTo?: string | null;
	buttonText?: string;
	receptorCode?: string;
	labelData?: string;
	backRoute?: (message: string) => void;
}

export const MfaForm: FC<MfaProps> = ({
	title,
	subTitle,
	buttonText,
	backRoute,
	labelData,
	data,
}) => {
	const { sendMfaCode, signInWithEmail } = useAuth();
	// const navigate = useNavigate();

	const [resentMessage, sendResentMessage] = useState<boolean>();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [codeMfa, sendCodeMfa] = useState<string>("");

	const createLoginLog = useMutation(async () => {
		await ManageLogService.createLoginLog();
	});

	const handleAuthCodeChange = (result: string): void => {
		if (result.length === 6) {
			sendCodeMfa(result);
		} else {
			sendCodeMfa("");
		}
	};

	const handleSendMfa = async (): Promise<void> => {
		setErrorMessage(null);
		const resultMfa = await sendMfaCode(data.email, codeMfa);
		console.log("🚀 ~ handleSendMfa ~ resultMfa:", resultMfa);
		if (resultMfa) {
			await signInWithEmail(data.email, data.password, "");

			const sessionData: any = await getSession();
			const groupAws: string =
				sessionData?.accessToken?.payload["cognito:groups"][0] || "admin";

			sendToLocalStorage(group, JSON.stringify(groupAws));
			sendToLocalStorage(accessToken, `${sessionData?.idToken?.jwtToken}`);

			createLoginLog.mutate();

			window.location.href =
				groupAws === "investor"
					? "/investors/portfolio"
					: "/manage-users/admins";
		} else {
			setErrorMessage("Incorrect Code");
			return;
		}
	};
	const closeResentMessage = (): void => {
		sendResentMessage(!resentMessage);
	};

	const backTo = (): void => {
		backRoute?.("");
	};

	return (
		<div className="flex flex-col items-center  gap-3 h-full">
			<LoginTitle title={title} subTitle={subTitle}>
				<div className="flex  flex-col justify-between h-full  gap-5">
					<div className="flex flex-col gap-5">
						<div className="flex justify-between gap-2">
							<div style={{ width: "100%" }}>
								<Input
									disabled
									defaultValue={labelData}
									label="Email"
									required
								/>
							</div>
						</div>

						<div>
							{resentMessage && <ToastMfa onClose={closeResentMessage} />}
						</div>
						<div>
							<AuthenticateCode
								handleOnChange={handleAuthCodeChange}
								label="Confirmation Code"
								required
							/>
						</div>
						{errorMessage && <Message severity="error" text={errorMessage} />}
					</div>

					<div className="flex flex-col gap-1">
						<Button
							onClick={handleSendMfa}
							buttonText={buttonText}
							className={`${codeMfa ? "bg-primary-500" : "bg-gray-300"}`}
							disabled={!codeMfa}
						/>
						<Button
							buttonText="Back"
							className="h-12 bg-transparent text-black"
							onClick={backTo}
						/>
					</div>
				</div>
			</LoginTitle>
		</div>
	);
};
