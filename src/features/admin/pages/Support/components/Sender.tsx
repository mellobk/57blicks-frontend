/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FC } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Chat } from "./chat";

interface Props {
	rightView: string;
	rightMenuEvent: (event_: string) => void;
}

export const Sender: FC<Props> = ({ rightView, rightMenuEvent }) => {
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
						<div
							className=" w-30 h-7  bg-green-800 pt-1 pb-1 pl-3 pr-3 rounded-[15px] flex  text-xs text-green-500 font-bold align-middle "
							style={{
								visibility: rightView === "" ? "visible" : "hidden",
								marginLeft: "10px",
							}}
						>
							<div className="pr-2 align-middle pt-0.5  ">
								<Icon name="list" width="20" color="#00BA35" />
							</div>
							<span
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
									alignSelf: "center",
								}}
							>
								Number of Logins
							</span>
						</div>
					</div>
					<div className="flex justify-between gap-3">
						<div
							style={{
								visibility: rightView === "" ? "visible" : "hidden",
							}}
						>
							<IconButton
								bgColor="bg-gray-200"
								color="#0E2130"
								name="uploadFile"
								onClick={(): any => {
									// setOpenConfirmationModal(true);
								}}
								width="16"
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
						<div>
							<IconButton
								bgColor="bg-red-500/[.12]"
								color="#FF0033"
								name="trashBin"
								onClick={(): any => {
									// setOpenConfirmationModal(true);
								}}
								width="16"
							/>
						</div>
					</div>
				</div>
				<Chat />
			</div>
		</div>
	);
};
