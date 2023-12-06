/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { type FC, useState, useEffect } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { Tabs } from "@/components/ui/Tabs";
import { Input } from "@/components/forms/Input";
import { supportInboxStatus } from "@/features/admin/pages/Support/utils/selects";
import { TicketsList } from "@/features/admin/components/servicing/component/Tickets/TicketsList";
import type { Ticket } from "@/features/admin/components/servicing/types/api";
import { useDebounce } from "@/hooks/debounce";
import { CreateNewTicket } from "./CreateNewTicket";

interface Props {
	searchVisible: boolean;
	selectedSupport: Ticket | undefined;
	handleSearchValue: (data: any) => void;
	setSearchVisible: (searchVisible: boolean) => void;
	setSelectedSupport: (selectedSupport?: Ticket) => void;
	setOpenModal: (event_: boolean) => void;
	closeModal: () => void;
	openModal: boolean;
	refreshTicketList: boolean;
	setRefreshTicketList: (searchVisible: boolean) => void;
}

export const Inbox: FC<Props> = ({
	searchVisible,
	selectedSupport,
	handleSearchValue,
	setSearchVisible,
	setSelectedSupport,
	setOpenModal,
	openModal,
	closeModal,
	refreshTicketList,
	setRefreshTicketList,
}) => {
	const [filter, setFilter] = useState<string>("open");
	const [value, setValue] = useState<string>("");
	const debouncedSearchTerm = useDebounce(value, 1000);
	const [searchValue, setSearchValue] = useState<string>("");

	useEffect(() => {
		if (handleSearchValue) {
			handleSearchValue(debouncedSearchTerm);
			if (value === "") {
				setSearchValue(debouncedSearchTerm);
			} else {
				setSearchValue("");
			}
		}
	}, [debouncedSearchTerm, handleSearchValue]);

	useEffect(() => {
		if (searchValue === "") {
			setValue("");
		}
	}, [searchValue]);

	const handleSearch = (value: string): void => {
		setValue(value);
	};

	return (
		<div>
			<div className="h-auto lg:col-span-1 col-span-1">
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
									setOpenModal(true);
								}}
								width="60"
							/>
						</div>
					</div>
				</div>
				<div>
					<Tabs
						tabs={supportInboxStatus}
						actualTab={filter}
						colorLight={true}
						isListTab={true}
						setFilter={setFilter}
					/>
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
							<div className="flex gap-2 justify-end">
								<div
									className={`${
										searchVisible || value
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
										value={value}
										placeholder="Search"
										iconColor="#0E2130"
										iconWidth={`${value ? "12" : "20"}`}
										iconName={`${value ? "wrong" : "search"}`}
										onChange={(data): void => {
											handleSearch(data.target.value);
										}}
										clickIcon={(): void => {
											if (handleSearchValue) {
												setSearchValue("");
												setValue("");
												handleSearchValue("");
											}
										}}
										className={`placeholder-gray-400 text-black-200 text-[13px] font-normal font-weight-400 leading-normal w-full ${
											searchVisible || value
												? "bg-gray-200 "
												: "bg-transparent "
										}  tracking-wide flex  items-center self-stretch rounded-md border-none outline-none `}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className="overflow-y-auto"
					style={{ height: "550px", marginTop: "20px" }}
				>
					<TicketsList
						searchInput={value}
						selectedTicket={selectedSupport}
						setSelectedTicket={setSelectedSupport}
						filter={filter}
						refreshTicketList={refreshTicketList}
						setRefreshTicketList={setRefreshTicketList}
					/>
				</div>
				<CreateNewTicket openModal={openModal} closeModal={closeModal} />
			</div>
		</div>
	);
};

