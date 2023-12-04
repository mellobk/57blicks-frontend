/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { type FC, useState } from "react";
import type { support } from "@/types/api/support";
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
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [rightView, setRightView] = useState<string>("");

	// const [selectedOpportunity, setSelectedOpportunity] =
	// useState<OpportunityMin>();

	// const getOpportunitiesQuery = useQuery(
	// 	["opportunities-query"],
	// 	() => OpportunitiesService.getOpportunities(),
	// 	{ enabled: !selectedOpportunity }
	// );

	const closeModal = (): void => {
		setOpenModal(false);
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
		console.log("enter here?");
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
								searchValue={searchValue}
								searchVisible={searchVisible}
								selectedSupport={selectedSupport}
								setSearchValue={setSearchValue}
								setSearchVisible={setSearchVisible}
								setSelectedSupport={setSelectedSupport}
							/>
							<Sender rightView={rightView} rightMenuEvent={rightMenuEvent} />
							{rightView !== "" && (
								<div className=" ">
									<RightView type={rightView} onClose={rightMenuCloseEvent} />
								</div>
							)}
						</div>
					)}
					{mock && (
						<EmptyTickets
							setOpenModal={setOpenModal}
							openModal={openModal}
							closeModal={closeModal}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
