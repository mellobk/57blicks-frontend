import { type FC, useEffect } from "react";
import type { Attachment } from "src/features/admin/pages/Support/types/index.ts";
import { useQuery } from "@tanstack/react-query";
import ManageAttachmentService from "@/features/admin/components/servicing/component/Tickets/attachments";
import { downloadFile } from "../api/support";
import { dateFormat, formatTime } from "@/utils/formats";
import { openUrlFile } from "@/utils/file/download-file-form-url";
import useToast from "@/hooks/use-toast";

interface Props {
	idTicket?: string;
}

export const AttachmentsList: FC<Props> = ({ idTicket }) => {
	const notify = useToast();

	const { refetch: refetchAttachmentDetails, data } = useQuery(
		["get-attachment-list", idTicket],
		() => ManageAttachmentService.getListAttachment()
	);

	useEffect(() => {
		if (idTicket) {
			void refetchAttachmentDetails();
		}
	}, [idTicket, refetchAttachmentDetails]);

	const handleDownload = async (pdf: Attachment) => {
		try {
			const url = await downloadFile(pdf.s3Url);
			openUrlFile(url);
		} catch {
			notify("Error downloading file", "error");
		}
	};

	const list = data
		?.filter((chat) => chat.ticketId === idTicket)
		.map((pdf, key) => (
			<div
				key={key}
				className="flex justify-between items-center hover:bg-gray-200"
				style={{
					borderBottom: "1px solid var(--default-input, #EDF3F5)",
					paddingTop: "15px",
					cursor: "pointer",
				}}
				onClick={() => handleDownload(pdf)}
			>
				<div className="w-[80px] h-20 flex justify-center items-center ">
					<div className="w-10 h-10 rounded-3xl bg-gray-200 align-middle items-center flex justify-center ">
						<i className="pi pi-file"></i>
					</div>
				</div>
				<div className="w-full h-20  ">
					<div>
						<p
							className="text-[16px] "
							style={{
								width: "200px",
								fontWeight: "600",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							{pdf.originalName}
						</p>
					</div>
					<div
						style={{ color: "#B0B4BA", fontWeight: "400", fontSize: "13px" }}
					>
						{pdf.size} MB
					</div>
					<div
						className="flex justify-between items-center w-full"
						style={{
							color: "#B0B4BA",
							fontWeight: "400",
							fontSize: "13px",
							width: "100%",
							paddingRight: "10px",
						}}
					>
						{pdf?.updatedAt && (
							<>
								<span>{dateFormat(pdf?.updatedAt?.toString())}</span>
								<span>{formatTime(pdf?.updatedAt?.toString())}</span>
							</>
						)}
					</div>
				</div>
			</div>
		));

	return (
		<div className="overflow-y-auto" style={{ height: "80vh" }}>
			{list}
		</div>
	);
};
