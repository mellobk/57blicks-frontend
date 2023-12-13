import type { FC } from "react";
import { Input } from "@/components/forms/Input";
import { Modal } from "@/components/ui/Modal/Modal";
import { TextArea } from "@/components/forms/TextArea";
import { useForm } from "react-hook-form";
import type { Ticket } from "@/features/admin/components/servicing/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddTicketSchema } from "../schemas/AddTicketSchemas";
import { TICKET_CATEGORIES } from "../utils/selects";
import { Dropdown } from "@/components/forms/Dropdown";
import type { CreateTicketForm } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTicket } from "../api/support";
import useToast from "@/hooks/use-toast";

interface Props {
	openModal: boolean;
	closeModal: () => void;
	data?: Ticket;
}

export const CreateNewTicket: FC<Props> = ({ openModal, closeModal }) => {
	const {
		control,
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<CreateTicketForm>({
		resolver: zodResolver(AddTicketSchema),
	});
	/* 	const createLedgerQuery = useMutation(async (body: any) => {
		return ManageNotificationService.createNotifications(body);
	});
	const userLoggedInfo = userStore((state) => state.loggedUserInfo); */
	const notify = useToast();
	const queryClient = useQueryClient();

	const mutation = useMutation(postTicket, {
		onSuccess: async () => {
			notify("Ticket created successfully", "success");
			await queryClient.invalidateQueries({ queryKey: ["get-ticket-details"] });
			closeModal();
		},
	});

	const onSubmit = (data: CreateTicketForm): void => {
		mutation.mutate(data);
	};

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
							width: "50%",
						}}
					>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col justify-end p-2 gap-4"
						>
							<div className="flex justify-between items-center">
								<div className="w-full">
									<Input
										error={errors["title"]?.message}
										label="Title"
										placeholder="Enter Title"
										register={register("title")}
										wrapperClassName="mt-6"
										required
									/>
									<Dropdown
										control={control}
										className="mt-6"
										label="Category"
										name="category"
										options={TICKET_CATEGORIES}
										required
										error={errors["category"]?.message}
									/>
									<TextArea
										error={errors["description"]?.message}
										label="Message"
										maxLength={1000}
										placeholder="Enter message"
										register={register("description")}
										wrapperClassName="mt-6"
										required
									/>
								</div>
							</div>
							<button
								type="submit"
								className="bg-blue-50 pt-1 pb-1.5 pl-4 pr-4 text-blue-200 text-sm font-semibold rounded-3xl hover:bg-blue-70"
							>
								Send Ticket
							</button>
						</form>
					</div>
				</div>
			</Modal>
		</div>
	);
};
