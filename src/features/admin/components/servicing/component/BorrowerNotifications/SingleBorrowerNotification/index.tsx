/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState, type FC, useEffect } from "react";
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
import BorrowerTemplates from "../BorrowerTemplates";
interface SingleBorrowerNotificationProps {
	loan: Loan;
	width: string;
	showBlack: boolean;
	setWidth: (width: string) => void;
	setShowBlack: (showBlack: boolean) => void;
	callBack?: () => void;
}
const SingleBorrowerNotification: FC<SingleBorrowerNotificationProps> = ({
	loan,
	setWidth,
	showBlack,
	setShowBlack,
	callBack,
}) => {
	const [smsContent, setSmsContent] = useState<string>("");
	const [emailContent, setEmailContent] = useState<string>("");

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
			loans: [
				{
					id: loan.id || "",
					sms: smsContent?.length > 0,
					email: emailContent?.length > 0,
					smsContent,
					emailContent,
				},
			],
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
		setWidth("600px");
		setShowBlack(false);
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
			<div
				className="flex"
				style={{
					width: "100%",
				}}
			>
				<div
					className={`${
						showBlack ? "w-1/2" : "w-full"
					}   h-full bg-white pt-4 mt-4`}
				>
					<ListBox
						value={selectedNotification}
						onChange={(event: ListBoxChangeEvent): void => {
							if (event.value.url === "custom-notification") {
								setWidth("1200px");
								setShowBlack(true);
							} else {
								setWidth("600px");
								setShowBlack(false);
							}
							setSelectedNotification(event.value as BorrowerNotificationType);
						}}
						options={notificationTypes}
						optionLabel="name"
						className="notification w-full md:w-14rem"
					/>

					<Button
						buttonText="Send"
						variant={"primary"}
						disabled={!selectedNotification}
						className={`${showBlack ? "w-[96%]" : "w-[96%]"} mt-2 h-10`}
						type="button"
						onClick={(): void => {
							setOpenConfirmation(true);
						}}
					/>
				</div>
				{showBlack && (
					<div className="w-1/2  relative p-4">
						<BorrowerTemplates
							smsContent={smsContent}
							setSmsContent={setSmsContent}
							emailContent={emailContent}
							setEmailContent={setEmailContent}
						/>
					</div>
				)}
			</div>
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
