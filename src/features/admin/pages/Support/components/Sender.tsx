/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { type FC, useState } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ChatBox } from "./Chat";
import { Modal } from "@/components/ui/Modal";
import { DeleteTicket } from "./DeleteTicket/DeleteTicket";
import type { Ticket } from "@/features/admin/components/servicing/types/api";
import type { Attachment } from "src/features/admin/pages/Support/types/index.ts";
import { useMutation } from "@tanstack/react-query";
import ManageTicketService from "@/features/admin/components/servicing/component/Tickets/tickets";
import { CloseTicket } from "./CloseTicket/CloseTicket";
import { IconFileUpload } from "@/components/forms/FileUpload/IconFileUpload";
import ManageAttachmentService from "@/features/admin/components/servicing/component/Tickets/attachments";
import { UploadFile } from "./UploadFile/UploadFile";

interface Props {
	rightView: string;
	rightMenuEvent: (event_: string) => void;
	setOpenModalDelete: (event_: boolean) => void;
	closeModalDelete: () => void;
	openModalDelete: boolean;
	setOpenModalCloseTicket: (event_: boolean) => void;
	closeModalCloseTicket: () => void;
	openModalCloseTicket: boolean;
	selectedSupport: Ticket | undefined;
	refreshTicketList: boolean;
	setRefreshTicketList: (refreshTicketList: boolean) => void;
}

export const Sender: FC<Props> = ({
	rightView,
	rightMenuEvent,
	setOpenModalDelete,
	openModalDelete,
	closeModalDelete,
	setOpenModalCloseTicket,
	openModalCloseTicket,
	closeModalCloseTicket,
	selectedSupport,
	setRefreshTicketList,
}) => {
	const [openModalAttachment, setOppenModalAttachment] =
		useState<boolean>(false);
	const [attachmentt, setAttachmentt] = useState<Attachment>();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const deleteTicketSender = useMutation(
		(id: string) => {
			return ManageTicketService.deleteTicket(id);
		},
		{
			onSuccess: () => {
				closeModalDelete();
				setRefreshTicketList(true);
			},
			onError: () => {
				closeModalDelete;
			},
		}
	);

	const updateTicketMutation = useMutation(
		(ticketData: Ticket) => {
			return ManageTicketService.updateTicket(ticketData);
		},
		{
			onSuccess: () => {
				closeModalCloseTicket();
				setRefreshTicketList(true);
			},
			onError: () => {
				closeModalCloseTicket;
			},
		}
	);
	

	const updateAttachmentMutation = useMutation(
		(selectedFile: File) => {
			if(selectedSupport){
				return ManageAttachmentService.updateAttachment(
					selectedFile,
					selectedSupport.id
				);
			}
		},
		{
			onSuccess: () => {
				notify("Ticket created successfully", "success");
				closeModalUploadFile(true);
			},
			onError: () => {
				closeModalUploadFile;
			},
		}
	);

	const closeModalAttachment = (): void => {
		setOppenModalAttachment(false);
	};

	const handleDeleteTicket = (id: string) => {
		deleteTicketSender.mutate(id);
	};

	const handleCloseTicket = (ticket: Ticket) => {
		updateTicketMutation.mutate(ticket);
	};

	const handleCloseAttachment = (attachment: Attachment) => {
		updateAttachmentMutation.mutate(attachment);
	};

	return (
		<div className="lg:col-span-3 col-span-1 flex flex-col gap-6 lg:pl-6 h-full overflow-y-auto">
			<div className="flex flex-col h-full justify-between">
				<div className="flex justify-between">
					<div className="flex justify-between">
						<h3
							style={{
								color: "var(--colors-primary, #0E2130)",
								fontFamily: "Inter",
								fontSize: "28px",
								fontStyle: "normal",
								fontWeight: "400",
								lineHeight: "normal",
								letterSpacing: "-1.4px",
							}}
						>
							Sender
						</h3>
					</div>
					<div className="flex justify-between gap-3">
						<IconFileUpload
							data-testid="general-information-image"
							accept="image/*"
							placeholder="Choose File"
							wrapperClassName="mt-6"
							setAttachmentt={setAttachmentt}
							setSelectedFile={setSelectedFile}
							onClick={(): any => {
								setOppenModalAttachment(true);
							}}
						/>
						<Button
							className={` w-40 h-7  bg-gray-200 pt-1 pb-1 pl-3 pr-3 rounded-[15px] flex  text-xs text-black-200 font-bold align-middle `}
							style={{
								visibility: rightView === "Attachments" ? "hidden" : "visible",
							}}
							onClick={(): any => {
								rightMenuEvent("Attachments");
							}}
						>
							<div className="pr-2 align-middle pt-0.5  ">
								<Icon name="attach" width="20" color="#0E2130" />
							</div>
							<span
								style={{
									color: "var(--colors-primary, #0E2130)",
									fontFeatureSettings: "'clig' off, 'liga' off",
									fontFamily: "Inter",
									fontSize: "16px",
									fontStyle: "normal",
									fontWeight: "600",
									lineHeight: "normal",
									letterSpacing: "-0.8px",
								}}
							>
								Attachments
							</span>
						</Button>
						<Button
							className=" h-7  bg-gray-200 pt-1 pb-1 pl-3 pr-3 rounded-[15px] flex  text-xs text-black-200 font-bold align-middle "
							style={{
								visibility:
									rightView === "InternalNotes" ? "hidden" : "visible",
							}}
							onClick={(): any => {
								rightMenuEvent("InternalNotes");
							}}
						>
							<div className="pr-2 align-middle pt-0.5  ">
								<Icon name="notes" width="20" color="#0E2130" />
							</div>
							<span
								style={{
									color: "var(--colors-primary, #0E2130)",
									fontFeatureSettings: "'clig' off, 'liga' off",
									fontFamily: "Inter",
									fontSize: "16px",
									fontStyle: "normal",
									fontWeight: "600",
									lineHeight: "normal",
									letterSpacing: "-0.8px",
								}}
							>
								Internal Notes
							</span>
						</Button>
						<Button
							className=" h-7  bg-white pt-1 pb-1 pl-3 pr-3 rounded-[15px] flex  text-xs text-black-200 font-bold align-middle "
							onClick={(): any => {
								setOpenModalCloseTicket(true);
							}}
						>
							<div
								className="  h-7   bg-green-800 pt-1 pb-1 pl-3 pr-3 rounded-[15px] flex  text-xs text-green-500 font-bold align-middle "
								style={{
									color: "var(--colors-green, #00BA35)",
									fontFeatureSettings: "'clig' off, 'liga' off",
									fontFamily: "Inter",
									fontSize: "10.182px",
									fontStyle: "normal",
									fontWeight: "600",
									lineHeight: "normal",
									letterSpacing: "-0.509px",
									alignItems: "center",
								}}
							>
								Resolve Ticket
							</div>
						</Button>
						<div>
							<IconButton
								bgColor="bg-red-500/[.12]"
								color="#FF0033"
								name="trashBin"
								onClick={(): any => {
									setOpenModalDelete(true);
								}}
								width="16"
							/>
						</div>
					</div>
				</div>
				{selectedSupport?.id && <ChatBox idTicket={selectedSupport.id} />}
			</div>
			<Modal
				visible={openModalDelete}
				onHide={closeModalDelete}
				title="Delete Ticket"
				width="450px"
			>
				<DeleteTicket
					id={selectedSupport?.id}
					handleDeleteTicket={handleDeleteTicket}
				/>
			</Modal>
			<Modal
				visible={openModalCloseTicket}
				onHide={closeModalCloseTicket}
				title="Close Ticket"
				width="450px"
			>
				<CloseTicket
					body={selectedSupport}
					handleCloseTicket={handleCloseTicket}
				/>
			</Modal>
			<Modal
				visible={openModalAttachment}
				onHide={closeModalAttachment}
				title="Agregar archivo"
				width="450px"
			>
				<UploadFile
					body={attachmentt}
					handleCloseTicket={handleCloseAttachment}
				/>
			</Modal>
		</div>
	);
};
