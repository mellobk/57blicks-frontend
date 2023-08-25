import { Input } from "@/components/forms/Input";
import { AuthenticateCode } from "@/components/ui/AuthCode";
import { Button } from "@/components/ui/Button";
import { LoginTitle } from "../LoginTitle";
import { ToastMfa } from "../ToastMfa";
import { useState } from "react";

interface MfaProps {
	title?: string;
	subTitle?: string;
	navigateTo?: string | null;
	buttonText?: string;
}

export const Mfa: React.FC<MfaProps> = ({ title, subTitle, buttonText }) => {
	const [resentMessage, sendResentMessage] = useState<boolean>();
	const [codeMfa, sendCodeMfa] = useState<string>("");
	const handleAuthCodeChange = (result: string): void => {
		if (result.length === 6) {
			sendCodeMfa(result);
		} else {
			sendCodeMfa("");
		}
	};

	const handleSendCode = (): void => {
		sendResentMessage(!resentMessage);
	};

	const closeResentMessage = (): void => {
		sendResentMessage(!resentMessage);
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
									defaultValue={"XXXX-XXXX-5555"}
									label="Phone Number"
									required
								/>
							</div>
							<div className="flex self-end">
								<Button text="Resend Code" onClick={handleSendCode} />
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
					</div>

					<div className="flex flex-col gap-1">
						<Button
							text={buttonText}
							className={`${codeMfa ? "bg-primary-500" : "bg-gray-300"}`}
							disabled={!codeMfa}
						/>
						<Button text="Back" className="bg-transparent text-black" />
					</div>
				</div>
			</LoginTitle>
		</div>
	);
};
