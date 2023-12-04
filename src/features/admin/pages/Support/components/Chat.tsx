import type { FC } from "react";
import { MessagesChat } from "@/features/admin/pages/Support/components/MessagesChat";
import { TextArea } from "@/components/forms/TextArea";
import { IconButton } from "@/components/ui/IconButton";

const messageQuery = [
	{
		name: "Mike",
		time: "10:40 AM",
		message: "Here’s some internal notes about this ticket",
		id: "1",
		type: "investor",
	},
	{
		name: "Me",
		time: "10:40 AM",
		message: "Here’s some internal notes about this ticket",
		id: "2",
		type: "admin",
	},
	{
		name: "Mike",
		time: "10:40 AM",
		message: "Here’s some internal notes about this ticket",
		id: "1",
		type: "investor",
	},
	{
		name: "Me",
		time: "10:40 AM",
		message: "Here’s some internal notes about this ticket",
		id: "2",
		type: "admin",
	},
];

export const Chat: FC = ( ) => (
	<>
		<div>
			<MessagesChat data={messageQuery} />
		</div>
		<div className="flex flex-row h-30 justify-between">
			<div className="w-full " style={{ marginRight: "10px" }}>
				<TextArea
					data-testid="general-information-investment-summary"
					// error={errors?.investmentSummary?.message}
					label=""
					maxLength={1000}
					placeholder="Enter Message"
					// register={register("investmentSummary")}
					wrapperClassName="mt-0"
					required
				/>
			</div>
			<div>
				<IconButton
					bgColor="bg-gold-100 "
					color="#C79E63"
					name="send"
					onClick={(): any => {
						// setOpenConfirmationModal(true);
					}}
					width="50"
					height="full"
				/>
			</div>
		</div>
	</>
);
