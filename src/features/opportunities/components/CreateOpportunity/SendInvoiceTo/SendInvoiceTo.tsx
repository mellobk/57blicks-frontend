import { Button } from "@/components/ui/Button";
import { type FC, useEffect, useState } from "react";

interface Props {
	setOpenModal: (openModal: boolean) => void;
	handleSendInvoice: (sms: boolean, email: boolean, note: string) => void;
}

const getNoteText = (borrower: string, email: string): string => {
	return `Hello (${borrower}),\n
  \nYour invoice for your loan at (5062 Grass Cove) with DKC Lending is now available to view. \n
  \nThe invoice has been emailed to (${email}).
  \nIf you did not receive the email or invoice, please reach out to us at info@dkclending.com,
  \nThank you for choosing DKC Lending as your preferred hard money lender.
  \nBest regards,
  \nDKC Lending LLC`;
};

export const SendInvoiceTo: FC<Props> = ({ handleSendInvoice }) => {
	const [note, setNote] = useState<string>("");
	const [smsSelect, setSmsSelect] = useState<boolean>(false);
	const [emailSelect, setEmailSelect] = useState<boolean>(false);

	useEffect(() => {
		setNote(getNoteText("", ""));
	}, []);

	return (
		<>
			<div className="flex flex-col gap-2 pt-6 h-full">
				<div className="font-inter font-semibold text-white text-sm leading-[17px] tracking-[-0.7]">
					Opportunity Notes
				</div>
				<textarea
					className="h-full rounded-lg py-3 px-4 bg-gray-100 resize-none focus:outline-none font-inter text-primary-200 text-[13px] leading-4 tracking-[-0.65]"
					onChange={(event): void => {
						setNote(event.target.value);
					}}
					value={note}
					rows={20}
				/>
				<Button
					type="button"
					className={`absolute top-6 left-[250px] ${
						smsSelect
							? "bg-blue-50 text-blue-500"
							: "line-through text-gray-400"
					}`}
					variant={"gray"}
					onClick={(): void => {
						setSmsSelect(!smsSelect);
					}}
				>
					SMS
				</Button>
				<Button
					type="button"
					variant={"gray"}
					className={`absolute top-6 left-[320px] ${
						emailSelect
							? "bg-blue-50 text-blue-500 "
							: "line-through text-gray-400"
					}`}
					onClick={(): void => {
						setEmailSelect(!emailSelect);
					}}
				>
					EMAIL
				</Button>
				<Button
					variant={"primary"}
					disabled={!smsSelect && !emailSelect}
					type="button"
					onClick={(): void => {
						//setOpenModal(false);
						handleSendInvoice(smsSelect, emailSelect, note);
					}}
				>
					SEND
				</Button>
			</div>
		</>
	);
};
