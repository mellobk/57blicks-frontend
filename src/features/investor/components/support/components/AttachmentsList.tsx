import { type FC, useEffect, useState } from "react";
import type { Attachment } from "src/features/admin/pages/Support/types/index.ts";
import { useQuery } from "@tanstack/react-query";
import ManageAttachmentService from "@/features/admin/components/servicing/component/Tickets/attachments";

interface Props {
	idTicket?: string;
}

export const AttachmentsList: FC<Props> = ({ idTicket }) => {
	const [attachmentList, setAttachmentList] = useState<Array<Attachment>>([]);

	const queryAttachmentDetails = useQuery(["get-attachment-list"], () => {
		return ManageAttachmentService.getListAttachment();
	});

	useEffect(() => {
		void queryAttachmentDetails.refetch();
	}, [attachmentList]);

	return (
		<div>
			<div
				className="overflow-y-auto"
				style={{ paddingTop: "40px", height: "300px" }}
			></div>
		</div>
	);
};
