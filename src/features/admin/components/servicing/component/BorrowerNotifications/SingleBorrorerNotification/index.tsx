import { useState, type FC } from "react";
import { ListBox, type ListBoxChangeEvent } from "primereact/listbox";
import { type BorrowerNotificationType, notificationTypes } from "../types";
import { Button } from "@/components/ui/Button";
import "./index.css";
import { useMutation } from "@tanstack/react-query";
import ManageBorrowerNotificationsService, {
	type BorrowerNotificationProps,
} from "@/features/admin/components/servicing/api/borrower-notifications";
import type { Loan } from "@/features/admin/components/servicing/types/api";

interface SingleBorrowerNotificationProps {
	loan: Loan;
}
const SingleBorrowerNotification: FC<SingleBorrowerNotificationProps> = ({
	loan,
}) => {
	const [selectedNotification, setSelectedNotification] =
		useState<BorrowerNotificationType | null>();

	const borrowerNotificationMutation = useMutation(
		(data: BorrowerNotificationProps) => {
			return ManageBorrowerNotificationsService.sendBorrowerNotification(data);
		}
	);

	const handleSendNotification = (): void => {
		const data: BorrowerNotificationProps = {
			loans: [{ id: loan.id || "" }],
			url: selectedNotification?.url || "",
		};

		borrowerNotificationMutation.mutate(data, {
			onSuccess: () => {},
		});
	};
	return (
		<>
			<div className="card flex justify-content-center mt-4">
				<ListBox
					value={selectedNotification}
					onChange={(event: ListBoxChangeEvent): void => {
						setSelectedNotification(event.value as BorrowerNotificationType);
					}}
					options={notificationTypes}
					optionLabel="name"
					className="notification w-full md:w-14rem"
				/>
			</div>
			<Button
				buttonText="Send"
				variant={"gold"}
				disabled={!selectedNotification}
				className="w-full md:w-14rem mt-4"
				type="button"
				onClick={handleSendNotification}
			/>
		</>
	);
};

export default SingleBorrowerNotification;
