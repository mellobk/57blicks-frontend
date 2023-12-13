/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { type FC, useState } from "react";
import { RightView } from "./components/RightView";
import { Inbox } from "./components/Inbox";
import { Sender } from "./components/Sender";
import { EmptyTickets } from "./components/EmptyTickets";
import type { Ticket } from "@/features/admin/components/servicing/types/api";

export const Support: FC = () => {
	const mock = false;
	const [searchVisible, setSearchVisible] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>("");
	const [selectedSupport, setSelectedSupport] = useState<Ticket>();
	const [openModalCreateTicket, setOpenModalCreateTicket] =
		useState<boolean>(false);
	const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
	const [openModalCloseTicket, setOpenModalCloseTicket] =
		useState<boolean>(false);
	const [rightView, setRightView] = useState<string>("");
	const [refreshTicketList, setRefreshTicketList] = useState<boolean>(false);

	const closeModalCreateTicket = (): void => {
		setOpenModalCreateTicket(false);
	};

	const closeModalDelete = (): void => {
		setOpenModalDelete(false);
	};

	const closeModalCloseTicket = (): void => {
		setOpenModalCloseTicket(false);
	};

	const handleSearch = (data: string) => {
		console.log("searchValue", searchValue);
		setSearchValue(data);
		return data;
	};

	const rightMenuEvent = (event: any): void => {
		switch (event) {
			case rightView: {
				setRightView("");

				break;
			}
			case "InternalNotes": {
				setRightView(event);

				break;
			}
			case "Attachments": {
				setRightView(event);

				break;
			}
			// No default
		}
	};

	const rightMenuCloseEvent = (): void => {
		setRightView("");
	};
	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex flex-col h-full gap-3 overflow-y-auto">
				<div className="flex flex-col h-full bg-white rounded-2xl justify-between overflow-y-auto">
					{!mock && (
						<div
							className={`grid ${
								rightView === "" ? "lg:grid-cols-4" : "lg:grid-cols-5"
							} gap-6 divide-x divide-gray-200 bg-white rounded-3xl w-full h-full p-4 overflow-y-auto`}
						>
							<Inbox
								searchVisible={searchVisible}
								selectedSupport={selectedSupport}
								handleSearchValue={handleSearch}
								setSearchVisible={setSearchVisible}
								setSelectedSupport={setSelectedSupport}
								setOpenModal={setOpenModalCreateTicket}
								openModal={openModalCreateTicket}
								closeModal={closeModalCreateTicket}
								refreshTicketList={refreshTicketList}
								setRefreshTicketList={setRefreshTicketList}
							/>
							<Sender
								rightView={rightView}
								rightMenuEvent={rightMenuEvent}
								setOpenModalDelete={setOpenModalDelete}
								openModalDelete={openModalDelete}
								closeModalDelete={closeModalDelete}
								openModalCloseTicket={openModalCloseTicket}
								closeModalCloseTicket={closeModalCloseTicket}
								selectedSupport={selectedSupport}
								refreshTicketList={refreshTicketList}
								setRefreshTicketList={setRefreshTicketList}
							/>
							{rightView !== "" && selectedSupport && (
								<div className=" ">
									<RightView
										type={rightView}
										onClose={rightMenuCloseEvent}
										selectedSupport={selectedSupport}
									/>
								</div>
							)}
						</div>
					)}
					{mock && (
						<EmptyTickets
							setOpenModal={setOpenModalCreateTicket}
							openModal={openModalCreateTicket}
							closeModal={closeModalCreateTicket}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
