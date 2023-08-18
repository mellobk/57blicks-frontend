/* eslint-disable @typescript-eslint/no-misused-promises */

import { Input } from "@/components/forms/Input";
import { AuthenticateCode } from "@/components/ui/AuthCode";
import { Button } from "@/components/ui/Button";
import { LoginTitle } from "../LoginTitle";

interface MfaProps {
	title?: string;
	subTitle?: string;
	navigateTo?: string | null;
	buttonText?: string;
}

export const Mfa: React.FC<MfaProps> = ({ title, subTitle, buttonText }) => {
	const handleOnChange = (result: string): string => {
		return result;
	};

	const handleSendCode = (): void => {
		console.log("data");
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
									title="Phone Number"
									required
								/>
							</div>
							<div className="flex self-end">
								<Button text="Resend Code" onClick={handleSendCode} />
							</div>
						</div>

						<div>
							<AuthenticateCode
								handleOnChange={handleOnChange}
								title="Confirmation Code"
								required
							/>
						</div>
					</div>

					<div className="flex flex-col gap-1">
						<Button text={buttonText} className="bg-gray-300" />
						<Button text="Back" className="bg-transparent text-black" />
					</div>
				</div>
			</LoginTitle>
		</div>
	);
};
