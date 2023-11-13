import type { FC } from "react";
import { useState } from "react";

interface BorrowerTemplatesProps {
	emailContent: string;
	setEmailContent: (emailContent: string) => void;
	smsContent: string;
	setSmsContent: (smsContent: string) => void;
}
const BorrowerTemplates: FC<BorrowerTemplatesProps> = ({
	emailContent,
	setEmailContent,
	smsContent,
	setSmsContent,
}) => {
	const [activeIndex, setActiveIndex] = useState<number>(0);

	return (
		<div className="">
			<div className="flex gap-4 text-xl font-semibold text-white">
				<div
					className="flex-1 cursor-pointer border-b border-gray-300 mb-4"
					onClick={(): void => {
						setActiveIndex(0);
					}}
				>
					Email
				</div>
				<div
					className="flex-1 border-b cursor-pointer  border-gray-300 mb-4"
					onClick={(): void => {
						setActiveIndex(1);
					}}
				>
					Sms
				</div>
				{/* <div
					className="flex-1 border-b cursor-pointer  border-gray-300 mb-4"
					onClick={(): void => {
						setActiveIndex(2);
					}}
				>

				</div> */}
			</div>

			<div className={`${activeIndex === 0 ? "" : "hidden"}   `}>
				<textarea
					className="w-full  rounded-lg border border-gray-300 h-[400px] bg-gray-1300 p-4 text-gray-50"
					placeholder="Email content"
					onChange={(event): void => {
						setEmailContent(event.target.value);
					}}
				>
					{emailContent}
				</textarea>
			</div>

			<div className={`${activeIndex === 1 ? "" : "hidden"}`}>
				<textarea
					className="w-full  rounded-lg border border-gray-300 h-[400px] bg-gray-1300 p-4 text-gray-50"
					placeholder="Sms content"
					maxLength={160}
					onChange={(event): void => {
						setSmsContent(event.target.value);
					}}
				>
					{smsContent}
				</textarea>
			</div>

			{/* <div className={`${activeIndex === 2 ? "" : "hidden"} text-white`}>
				<div>Borrower: {`{{{borrower}}}`} </div>
			</div> */}
		</div>
	);
};

export default BorrowerTemplates;
