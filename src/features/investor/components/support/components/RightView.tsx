/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FC } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { AttachmentsList } from "./AttachmentsList";
import { ChatBox } from "./Chat";
import type { Ticket } from "@/features/admin/components/servicing/types/api";
import { IconFileUpload } from "@/components/forms/FileUpload/IconFileUpload";

interface Props {
	type?: string;
	onClose?: () => void;
	selectedSupport: Ticket;
}

export const RightView: FC<Props> = ({ type, onClose, selectedSupport }) => {
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
					<IconFileUpload
						data-testid="general-information-image"
						selectedSupport={selectedSupport}
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
				{type === "Attachments" ? (
					<AttachmentsList idTicket={selectedSupport?.id} />
				) : (
					<ChatBox idTicket={selectedSupport.id} />
				)}
			</div>
		</div>
	);
};
