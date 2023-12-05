/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FC } from "react";
import SupportEmpty from "@/assets/images/png/SupportEmpty.png";
import { Button } from "@/components/ui/Button";
import { CreateNewTicket } from "./CreateNewTicket";


interface Props {
	setOpenModal: (event_: boolean) => void;
    closeModal: () => void;
	openModal: boolean;
}

export const EmptyTickets: FC<Props> = ({ setOpenModal, openModal, closeModal }) => {
	return (
		<div
			className="h-full"
			style={{
				margin: "0",
				display: "flex",
				justifyContent: "center",
				flexFlow: "column",
				// width:"298px",
				height: "325px",
				alignSelf: "center",
				alignItems: "center",
			}}
		>
			<div
				style={{
					margin: "0",
					display: "flex",
					justifyContent: "center",
					flexFlow: "column",
					// width:"298px",
					height: "325px",
					alignSelf: "center",
					alignItems: "center",
				}}
			>
				<div
					className="h-80  rounded-xl border border-gray-200 p-2 bg-white"
					style={{
						top: "50%",
					}}
				>
					<div className="flex justify-between items-center">
						<div>
							<h3
								style={{
									color: " var(--colors-primary, #0E2130)",
									/* H1 */
									fontFamily: " Inter",
									fontSize: " 28px",
									fontStyle: " normal",
									fontWeight: " 400",
									lineHeight: " normal",
									letterSpacing: " -1.4px",
									alignSelf: "center",
									textAlign: "center",
								}}
							>
								No Tickets!
							</h3>
							<p
								style={{
									color: "#656A74",
									fontFeatureSettings: "'clig' off, 'liga' off",
									/* Body - 16 */
									fontFamily: "Inter",
									fontSize: "16px",
									fontStyle: "normal",
									fontWeight: "400",
									lineHeight: "normal",
									letterSpacing: "-0.8px",
									alignSelf: "center",
									textAlign: "center",
								}}
							>
								Brace for impact...
							</p>
							<img
								height="200px"
								width="250px"
								src={SupportEmpty}
								alt="support Empty"
							/>
						</div>
					</div>
				</div>
				<div className="w-full  bottom-10" style={{ marginTop: "20px" }}>
					<Button
						buttonText={"Create Ticket"}
						variant={"primary"}
						// className={`${showBlack ? "w-[48%]" : "w-[96%]"} mt-2 h-10`}
						className={` w-full mt-2 h-10`}
						type="button"
						onClick={(): void => {
							setOpenModal(true);
						}}
					/>
				</div>

				<CreateNewTicket openModal={openModal} closeModal={closeModal} />
			</div>
		</div>
	);
};
