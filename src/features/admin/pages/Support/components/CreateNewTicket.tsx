/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Input } from "@/components/forms/Input";
import { Modal } from "@/components/ui/Modal/Modal";
import { Select } from "@/components/forms/Select";
import { TextArea } from "@/components/forms/TextArea";

import type { FC } from "react";
interface Props {
	openModal: boolean;
	closeModal: () => void;
}

export const CreateNewTicket: FC<Props> = ({ openModal, closeModal }) => {
	return (
		<div>
			<Modal
				onHide={closeModal}
				width="90%"
				minHeight="80vh"
				visible={openModal}
				title={
					<>
						<div className="top-0 flex justify-between items-center ">
							<div className="flex space-x-2">
								<div className="pr-1 pt-1 font-bold  text-1xl	">
									<h3
										style={{
											color: "var(--colors-primary, #0E2130)",
											/* H1 */
											fontFamily: "Inter",
											fontSize: "28px",
											fontStyle: "normal",
											fontWeight: "400",
											lineHeight: "normal",
											letterSpacing: "-1.4px",
										}}
									>
										Create New Ticket
									</h3>
								</div>
							</div>
						</div>
					</>
				}
			>
				<div className={`flex items-center justify-between`}>
					<div
						className={`absolute top-10  right-[20px] cursor-pointer	 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50 pt-1 pb-1.5 pl-4 pr-4 text-blue-200 text-sm font-semibold rounded-3xl hover:bg-blue-70`}
						onClick={(): any => {
							console.log("Send Ticket");
						}}
					>
						Send Ticket
					</div>
					<div
						className={`absolute top-10  right-[140px] cursor-pointer	 transform -translate-x-1/2 -translate-y-1/2 bg-gold-100 pt-1 pb-1.5 pl-4 pr-4 text-gold-500 text-sm font-semibold rounded-3xl hover:bg-gold-350`}
						onClick={(): any => {
							console.log("save as draft");
						}}
					>
						Save as Draft
					</div>
				</div>
				<div
					style={{
						padding: "0",
						margin: "0",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<div
						className=" rounded-3xl border border-gray-200 p-2 bg-white"
						style={{
							width: "548px",
							height: "377px",
						}}
					>
						<form
							// onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col justify-end p-2 gap-4"
						>
							<div className="flex justify-between items-center">
								<div className="w-full">
									<Input
										id="Title"
										label="Title"
										placeholder="Enter Title"
										required
										// register={register("firstName")}
										// error={errors["firstName"] && errors["firstName"]?.message}
									/>
									{/* </div> */}
									{/* <div className="w-full"> */}
									<Select
										// register={register(
										// 	borrowerInformationFields?.accountType || ""
										// )}
										className="flex flex-col gap-2"
										label="Dropdown"
										placeholder="Select Dropdown"
										// value={data?.loan?.borrower?.accountType || ""}
										// options={ACCOUNT_OPTIONS}
									/>
									{/* </div> */}
									{/* <div className="w-full"> */}

									<TextArea
										data-testid="general-information-investment-summary"
										// error={errors?.investmentSummary?.message}
										label="Message"
										maxLength={1000}
										placeholder="Enter Message"
										// register={register("investmentSummary")}
										wrapperClassName="mt-6"
										required
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</Modal>
		</div>
	);
};
