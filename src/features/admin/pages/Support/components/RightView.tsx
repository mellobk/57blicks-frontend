/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FC } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { AttachmentsList } from "./AttachmentsList";
import {Chat} from "./chat";

interface Props {
	type?: string;
	onClose?: () => void;
}

const pdfList = [
	{
		name: "LegalTerms.pdf",
		size: "125 MB",
		upload: "Feb 12, 2023",
		time: "10:40 AM",
		id: "1",
	},
	{
		name: "LegalTerms.pdf",
		size: "125 MB",
		upload: "Feb 12, 2023",
		time: "10:40 AM",
		id: "2",
	},
	{
		name: "LegalTerms.pdf",
		size: "125 MB",
		upload: "Feb 12, 2023",
		time: "10:40 AM",
		id: "3",
	},
	{
		name: "LegalTerms.pdf",
		size: "125 MB",
		upload: "Feb 12, 2023",
		time: "10:40 AM",
		id: "4",
	},
];

export const RightView: FC<Props> = ({ type, onClose }) => {
	return (
		<div>
			<div className="flex justify-between" style={{ margin: "15px" }}>
				<h2
					style={{
						fontFamily: "Inter",
						fontSize: "28px",
						fontStyle: "normal",
						fontWeight: "400",
						lineHeight: "normal",
						letterSpacing: "-1.4px",
					}}
				>
					{type}
				</h2>
				<div
					style={{
						visibility: type === "Attachments" ? "visible" : "hidden",
					}}
				>
					<IconButton
						bgColor="bg-gray-200"
						color="#0E2130"
						name="uploadFile"
						onClick={(): any => {
							// setOpenConfirmationModal(true);
						}}
						width="16"
					/>
				</div>
				<IconButton
					bgColor="bg-gray-200"
					color="#656A74"
					name="close"
					onClick={onClose}
					width="16"
				/>
			</div>

			<div
				style={{
					paddingLeft: "15px",
				}}
			>
				{ type === "Attachments" ?

				<AttachmentsList pdfList={pdfList} /> :
				<Chat/>
				}
				
			</div>
		</div>
	);
};
