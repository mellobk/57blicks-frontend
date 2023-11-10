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
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { Loading } from "@/components/ui/Loading";
import { toast } from "react-toastify";
interface SingleBorrowerNotificationProps {
	loan: Loan;
	callBack?: () => void;
}
const SingleBorrowerNotification: FC<SingleBorrowerNotificationProps> = ({
	loan,
	callBack,
}) => {
	const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
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
			onSuccess: () => {
				toast.success("Notification sent", {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				setSelectedNotification(null);
				callBack && callBack();
			},
			onError: () => {
				toast.error("Something went wrong", {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			},
		});
	};

	if (borrowerNotificationMutation.isLoading) {
		return (
			<div className="flex flex-col w-full  items-center justify-items-center justify-center">
				<div>
					<Loading />
				</div>
				<div className="pt-6">Sending notification please wait...</div>
			</div>
		);
	}
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
				onClick={(): void => {
					setOpenConfirmation(true);
				}}
			/>

			<ConfirmationModal
				action="send"
				buttonText="Send"
				handelConfirmation={(): void => {
					handleSendNotification();
					setOpenConfirmation(false);
				}}
				model="Borrower Notification"
				onHide={(): void => {
					setOpenConfirmation(false);
				}}
				title="Send notification"
				visible={openConfirmation}
				customMessage={selectedNotification?.message}
			/>
		</>
	);
};

export default SingleBorrowerNotification;
