import { type FC, useState } from "react";
import { Input } from "@/components/forms/Input";
import { AuthenticateCode } from "@/components/ui/AuthCode";
import { Button } from "@/components/ui/Button";
import { LoginTitle } from "../LoginTitle";
import { ToastMfa } from "../ToastMfa";
import { sendToLocalStorage } from "@/utils/local-storage";
import { mfaCode } from "../../utils/constants";
import { sendCode } from "@/lib/cognito";
import { useNavigate } from "@tanstack/router";
import { Message } from "primereact/message";

interface MfaProps {
	title?: string;
	subTitle?: string;
	navigateTo?: string | null;
	buttonText?: string;
	receptorCode?: string;
	labelData?: string;
	backRoute?: string;
	showBackButton?: boolean;
}

export const Mfa: FC<MfaProps> = ({
	title,
	subTitle,
	buttonText,
	receptorCode,
	navigateTo,
	backRoute,
	labelData,
	showBackButton = true,
}) => {
	const navigate = useNavigate();
	const [resentMessage, sendResentMessage] = useState<boolean>();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [codeMfa, sendCodeMfa] = useState<string>("");
	const handleAuthCodeChange = (result: string): void => {
		if (result.length === 6) {
			sendCodeMfa(result);
		} else {
			sendCodeMfa("");
		}
	};

	const handleSendCode = async (): Promise<void> => {
		try {
			await sendCode(receptorCode || "");
			sendResentMessage(true);
		} catch (error) {
			console.log(error);
			setErrorMessage("Something goes wrong");
		}
	};

	const handleSendMfa = async (): Promise<void> => {
		try {
			sendToLocalStorage(mfaCode, codeMfa);
			void navigate({ to: `/${navigateTo}` });
		} catch (error) {
			console.log(error);
			setErrorMessage("Something goes wrong");
		}
	};
	const closeResentMessage = (): void => {
		sendResentMessage(!resentMessage);
	};

	const backTo = (): void => {
		void navigate({ to: `/${backRoute}` });
	};

	return (
		<div className="flex flex-col items-center  gap-3 h-full">
			<LoginTitle title={title} subTitle={subTitle}>
				<div className="flex  flex-col justify-between h-full  gap-5">
					<div className="flex flex-col gap-5">
						<div className="flex justify-between gap-2">
							<div style={{ width: "52%" }}>
								<Input
									disabled
									defaultValue={labelData}
									label="Email"
									required
								/>
							</div>
							<div className="flex self-end">
								<Button
									buttonText="Resend Code"
									onClick={handleSendCode}
									className={`bg-primary-500 h-10`}
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
						{showBackButton && (
							<Button
								buttonText="Back"
								className="bg-transparent text-black"
								onClick={backTo}
							/>
						)}
					</div>
				</div>
			</LoginTitle>
		</div>
	);
};
