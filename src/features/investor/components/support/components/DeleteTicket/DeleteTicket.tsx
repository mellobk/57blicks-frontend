import { Button } from "@/components/ui/Button";
import type { FC } from "react";

interface DeleteTicketProps {
	id?: string;
	handleDeleteTicket?: (id: string) => void;
}

export const DeleteTicket: FC<DeleteTicketProps> = ({
	id = "",
	handleDeleteTicket,
}) => {
	return (
		<div className="flex  flex-col justify-between w-full h-full gap-10 mt-9">
			<div className="flex items-center gap-2 justify-center">
				Are you sure you want to
				<div className="font-bold text-red-500">delete</div> this ticket?
			</div>
			<Button
				buttonText="Delete"
				className={`bg-primary-500`}
				onClick={(): void => {
					if (handleDeleteTicket) {
						handleDeleteTicket(id);
					}
				}}
			/>
		</div>
	);
};