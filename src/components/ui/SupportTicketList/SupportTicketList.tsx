/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FC } from "react";

// import { OpportunityName } from "@/components/ui/OpportunityName";
import type { support } from "@/types/api/support";
import Avatars from "@/assets/images/png/Avatars.png";

interface Props {
	data?: Array<support>;
	// getFilename: (referenceId: number) => string;
	selectedOpportunity?: support;
	setSelectedOpportunity: (selectedOpportunity?: support) => void;
}

export const SupportTicketList: FC<Props> = ({
	data,
	selectedOpportunity,
	setSelectedOpportunity,
}) =>
	data?.map((ticket, key) => (
		<div
			className={`${
				selectedOpportunity?.id === ticket.id
					? "bg-gray-200/[.55]"
					: "bg-white"
			} p-4 cursor-pointer`}
			style={{
				borderBottom: "1px solid var(--default-input, #EDF3F5)",
			}}
			key={key}
			onClick={(): any => {
				setSelectedOpportunity(ticket);
			}}
		>
			{/* <OpportunityName
				filename={getFilename(ticket.referenceId || 0)}
				selected={selectedOpportunity?.id === ticket.id}
			/> */}
			<div className="flex flex-row justify-between items-center">
				<div
					className={`${
						selectedOpportunity?.id === ticket.id
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
						{ticket.text}
					</p>
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
						{ticket.text}
					</p>
					<div
						className="flex w-full"
						style={{
							marginTop: "30px",
						}}
					>
						<div>
							<img
								height="15px"
								width="15px"
								src={Avatars}
								alt="support Empty"
							/>
						</div>
						<div
							className="flex justify-between items-center w-full"
							style={{ color: "#B0B4BA", fontWeight: "400", fontSize: "13px" }}
						>
							<div
								className="flex"
								style={{
									marginLeft: "8px",
								}}
							>
								{ticket.name}
							</div>
							<div className="flex">{ticket.time}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	));
