/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ChatBox } from "./Chat";
import { Modal } from "@/components/ui/Modal";
import { DeleteTicket } from "./DeleteTicket/DeleteTicket";
import type { Ticket } from "@/features/admin/components/servicing/types/api";
import { useMutation } from "@tanstack/react-query";
import ManageTicketService from "@/features/admin/components/servicing/component/Tickets/tickets";
import { CloseTicket } from "./CloseTicket/CloseTicket";
import { IconFileUpload } from "@/components/forms/FileUpload/IconFileUpload";

interface Props {
	rightView: string;
	rightMenuEvent: (event_: string) => void;
	closeModalDelete: () => void;
	openModalDelete: boolean;
	closeModalCloseTicket: () => void;
	openModalCloseTicket: boolean;
	selectedSupport: Ticket | undefined;
	refreshTicketList: boolean;
	setRefreshTicketList: (refreshTicketList: boolean) => void;
}

export const Sender: FC<Props> = ({
	rightView,
	rightMenuEvent,
	openModalDelete,
	closeModalDelete,
	openModalCloseTicket,
	closeModalCloseTicket,
	selectedSupport,
	setRefreshTicketList,
}) => {
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

	const handleDeleteTicket = (id: string) => {
		deleteTicketSender.mutate(id);
	};

	const handleCloseTicket = (ticket: Ticket) => {
		updateTicketMutation.mutate(ticket);
	};

	return (
		<div
			className="lg:col-span-3 col-span-1 flex flex-col gap-6 lg:pl-6"
			style={{ height: "680px" }}
		>
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
						<div
							style={{
								visibility: rightView === "Attachments" ? "hidden" : "visible",
							}}
						>
							<IconFileUpload
								data-testid="general-information-image"
								selectedSupport={selectedSupport}
							/>
						</div>
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
		</div>
	);
};
