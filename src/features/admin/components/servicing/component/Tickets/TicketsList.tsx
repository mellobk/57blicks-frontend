/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { type FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ManageTicketService from "./tickets";
import type { Ticket } from "../../types/api";
import { dateFormat } from "@/utils/formats";
import { Avatar } from "@/components/ui/Avatar";
import userStore from "@/stores/user-store";

interface Props {
	// getFilename: (referenceId: number) => string;
	selectedTicket?: Ticket;
	setSelectedTicket: (selectedTicket?: Ticket) => void;
	filter: string;
	searchInput?: string;
	refreshTicketList: boolean;
	setRefreshTicketList: (refreshTicketList: boolean) => void;
}

export const TicketsList: FC<Props> = ({
	selectedTicket,
	setSelectedTicket,
	filter,
	searchInput = "",
	refreshTicketList,
	setRefreshTicketList,
}) => {
	const [tickets, setTickets] = useState<Array<Ticket>>([]);
	const userLoggedInfo = userStore((state) => state.loggedUserInfo);

	const queryInvoiceDetails = useQuery(
		["get-ticket-details"],
		() => {
			return ManageTicketService.filterAllTickets(
				searchInput,
				filter.toUpperCase()
			);
		},
		{
			onSuccess: (data: Ticket) => {
				if (data.data) {
					if (userLoggedInfo.role?.name?.includes("super")) {
						setTickets(data.data);
						setSelectedTicket(data.data[0]);
					} else if (userLoggedInfo.role?.name?.includes("investor")) {
						setTickets(
							data.data.filter((data) => data.userId === userLoggedInfo?.id)
						);
						setSelectedTicket(data.data.filter((data) => data.userId === userLoggedInfo?.id)[0]);
					}
				}
			},
		}
	);

	useEffect(() => {
		if (refreshTicketList) {
			setRefreshTicketList(false);
		} else {
			void queryInvoiceDetails.refetch();
		}
	}, [userLoggedInfo, filter, searchInput, refreshTicketList]);

	return (
		<>
			{tickets &&
				tickets?.map((ticket: any, key: any) => (
					<div
						className={`${
							selectedTicket?.id === ticket.id
								? "bg-gray-200/[.55]"
								: "bg-white"
						} p-4 cursor-pointer`}
						style={{
							borderBottom: "1px solid var(--default-input, #EDF3F5)",
						}}
						key={key}
						onClick={(): any => {
							setSelectedTicket(ticket);
						}}
					>
						<div className="flex flex-row justify-between items-center">
							<div
								className={`${
									selectedTicket?.id === ticket.id
										? "bg-gray-200/[.0]"
										: "text-primary-500"
								} font-inter text-base leading-[19px] tracking-tighter w-full`}
							>
								<h3 style={{ fontWeight: "600" }}>{ticket.title}</h3>
								<p
									style={{
										color: "var(--colors-primary, #0E2130)",
										fontFamily: "Inter",
										fontSize: "13px",
										fontStyle: "normal",
										fontWeight: "400",
										lineHeight: "normal",
										letterSpacing: "-0.65px,",
										paddingTop: "10px",
									}}
								>
									{ticket.description}
								</p>
								<div
									className="flex w-full"
									style={{
										marginTop: "30px",
									}}
								>
									<div>
										<Avatar
											name={
												ticket?.user?.firstName + " " + ticket?.user?.lastName
											}
										/>
									</div>
									<div
										className="flex justify-between items-center w-full"
										style={{
											color: "#B0B4BA",
											fontWeight: "400",
											fontSize: "13px",
										}}
									>
										<div
											className="flex"
											style={{
												marginLeft: "8px",
											}}
										>
											<p>
												{ticket?.user?.firstName + " " + ticket?.user?.lastName}
											</p>
										</div>
										<div className="flex">{dateFormat(ticket.updatedAt)}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
		</>
	);
};
