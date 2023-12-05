/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FC } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { Tabs } from "@/components/ui/Tabs";
import { Input } from "@/components/forms/Input";
import { SupportTicketList } from "@/components/ui/SupportTicketList";
import { supportInboxStatus } from "@/features/admin/pages/Support/utils/selects";
import type { support } from "@/types/api/support";
import { TicketsList } from "@/features/admin/components/servicing/component/Tickets/TicketsList";
import type { Ticket } from "@/features/admin/components/servicing/types/api";

interface Props {
	searchValue: string;
	searchVisible: boolean;
	selectedSupport: Ticket | undefined;
	setSearchValue: (data: any) => void;
	setSearchVisible: (searchVisible: boolean) => void;
	setSelectedSupport: (selectedSupport?: Ticket) => void;
}


export const Inbox: FC<Props> = ({
	searchValue,
	searchVisible,
	selectedSupport,
	setSearchValue,
	setSearchVisible,
	setSelectedSupport,
}) => {
	return (
		<div>
			<div className="lg:col-span-1 col-span-1">
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
						Inbox
					</h3>
					<div className=" top-0 right-2 bottom-0 flex " data-testid="icon">
						{/* <div onClick={clickIcon}> */}
						<div
							className="flex flex-end text-right "
							style={{ marginLeft: "auto" }}
						>
							<IconButton
								bgColor="bg-white"
								name="new"
								onClick={(): any => {
									// setOpenConfirmationModal(true);
								}}
								width="60"
							/>
						</div>
					</div>
				</div>
				<div>
					<Tabs tabs={supportInboxStatus} actualTab="open" colorLight={true} />
				</div>
				<div
					style={{
						borderRadius: "var(--0, 0px)",
						height: "1px",
						alignSelf: "stretch",
						background: "var(--default-input, #EDF3F5)",
						marginTop: "20px",
					}}
				></div>
				<div style={{ marginTop: "20px" }}>
					<div
						className={`flex justify-center items-center bg-gray-200 h-[29px] rounded-[25px]`}
						style={{ position: "relative", width: "100%" }}
					>
						<div className="flex gap-1 items-center">
							<div
								className="flex gap-2 justify-end"
								// style={{
								// 	position: "relative",
								// 	right: "158px",
								// 	width: "350px",
								// 	zIndex: "0",
								// }}
							>
								<div
									className={`${
										searchVisible || searchValue
											? "w-full bg-transparent transition duration-500"
											: "bg-transparent  w-[30px] transition duration-500 "
									} `}
									onMouseEnter={(): any => {
										setSearchVisible(true);
									}}
									onMouseLeave={(): any => {
										setSearchVisible(false);
									}}
								>
									<Input
										type="text"
										value={searchValue}
										placeholder="Search"
										iconColor="#0E2130"
										iconWidth={`${searchValue ? "12" : "20"}`}
										iconName={`${searchValue ? "wrong" : "search"}`}
										onChange={(data): any => {
											setSearchValue(data.target.value);
										}}
										clickIcon={(): any => {
											setSearchValue("");
										}}
										className={`placeholder-gray-400 text-black-200 text-[13px] font-normal font-weight-400 leading-normal w-full ${
											searchVisible || searchValue
												? "bg-gray-200 "
												: "bg-transparent "
										}  tracking-wide flex  items-center self-stretch rounded-md border-none outline-none `}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style={{ marginTop: "20px" }}>
					{/* <SupportTicketList
						data={getTicketsQuery}
						selectedOpportunity={selectedSupport}
						setSelectedOpportunity={setSelectedSupport}
					/> */}
					<TicketsList
						selectedOpportunity={selectedSupport}
						setSelectedOpportunity={setSelectedSupport}
					/>
				</div>
			</div>
		</div>
	);
};
