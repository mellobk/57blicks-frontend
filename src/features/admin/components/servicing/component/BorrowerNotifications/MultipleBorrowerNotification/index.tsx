/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";

import type { FC } from "react";
import Loading from "@/assets/icons/loading";
import { useQuery } from "@tanstack/react-query";

import BorrowerTemplates from "../BorrowerTemplates";
import ManageBorrowersService, {
	type BorrowerCustomResponse,
} from "../../../api/borrowers";
import ManageBorrowerNotificationsService, {
	type LoanDataNotification,
	type BorrowerNotificationProps,
} from "@/features/admin/components/servicing/api/borrower-notifications";
import BorrowerList from "../../BorrowerList";
import { Select } from "@/components/forms/Select";
import { notificationTypes } from "../types";
import { toast } from "react-toastify";
import { validateSendBorrowerNotification } from "../Validations/validate-send";
import { useMutation } from "@tanstack/react-query";

interface MultiplesBorrowerNotificationProps {
	width: string;
	setWidth: (width: string) => void;
	showBlack: boolean;
	setShowBlack: (showBlack: boolean) => void;
	callBack: () => void;
}

const MultiplesBorrowerNotification: FC<MultiplesBorrowerNotificationProps> = ({
	showBlack,
	setWidth,
	setShowBlack,
	callBack,
}) => {
	const [selectAllBorrowers, setSelectAllBorrowers] = useState<boolean>(false);
	const [selectAllSms, setSelectAllSms] = useState<boolean>(false);
	const [selectAllEmail, setSelectAllEmail] = useState<boolean>(false);
	const [notification, setNotification] = useState<string>("");
	const [showNotes, setShowNotes] = useState<boolean>(false);
	const [smsContent, setSmsContent] = useState<string>("");
	const [emailContent, setEmailContent] = useState<string>("");

	const [borrowers, setBorrowers] = useState<Array<BorrowerCustomResponse>>([]);
	const { data, isLoading } = useQuery(
		["borrower-list-query"],
		() => ManageBorrowersService.getBorrowers({ activeLoan: true, url: "" }),
		{ enabled: true }
	);

	const borrowerNotificationMutation = useMutation(
		(data: BorrowerNotificationProps) => {
			return ManageBorrowerNotificationsService.sendBorrowerNotification(data);
		}
	);

	useEffect(() => {
		if (data) {
			setBorrowers(data.data);
		}
	}, [data]);

	const handleChange = (borrower: BorrowerCustomResponse): void => {
		const borrowerIndex = borrowers.findIndex(
			(borrowerItem) => borrowerItem.id === borrower.id
		);
		const newBorrowers = [...borrowers];
		newBorrowers[borrowerIndex] = borrower;
		setBorrowers(newBorrowers);
	};

	const handleData = (): void => {
		let changeWidth = false;
		borrowers.map((borrower) => {
			if (borrower.notes) {
				changeWidth = true;
			}
		});

		if (changeWidth) {
			setWidth("1260px");
			setShowBlack(true);
		} else {
			setShowBlack(false);
			setWidth("660px");
		}
	};

	const validateSelection = (): void => {
		const newBorrowers = [...borrowers];
		newBorrowers.map((borrower) => {
			borrower.selected = borrower.sms || borrower.email ? true : false;
		});
		setBorrowers(newBorrowers);
	};

	const handleSelectAllBorrowers = (select: boolean): void => {
		const newBorrowers = [...borrowers];

		newBorrowers.map((borrower) => {
			borrower.selected = select;
			borrower.sms = select;
			borrower.email = select;
			borrower.notes = showNotes;
		});
		setSelectAllBorrowers(select);
		setBorrowers(newBorrowers);
	};

	const handleSelectAllSms = (select: boolean): void => {
		const newBorrowers = [...borrowers];
		newBorrowers.map((borrower) => {
			borrower.sms = select;
		});
		setSelectAllSms(select);
		validateSelection();
	};

	const handleSelectAllEmail = (select: boolean): void => {
		const newBorrowers = [...borrowers];
		newBorrowers.map((borrower) => {
			borrower.email = select;
		});
		setSelectAllEmail(select);
		validateSelection();
	};

	useEffect(() => {
		handleData();
	}, [borrowers]);

	if (isLoading) {
		return (
			<div className="flex flex-col w-full  items-center justify-items-center justify-center">
				<div>
					<Loading />
				</div>
				<div className="pt-6">loading please wait...</div>
			</div>
		);
	}

	const sendNotifications = (): void => {
		const borrowersSelected = borrowers.filter((borrower) => borrower.selected);
		const loansData: Array<LoanDataNotification> = borrowersSelected.map(
			(borrower) => {
				return {
					id: borrower.loans[0]?.id || "",
					sms: borrower.sms,
					email: borrower.email,
					smsContent,
					emailContent,
				};
			}
		);

		const data: BorrowerNotificationProps = {
			loans: loansData,
			url: notification,
		};

		borrowerNotificationMutation.mutate(data, {
			onSuccess: () => {},
		});
		console.log("🚀 ~ file: index.tsx:148 ~ sendNotifications ~ loans:", data);
	};

	const validateSend = (): void => {
		const resultValidation = validateSendBorrowerNotification(
			borrowers,
			notification,
			smsContent,
			emailContent
		);

		if (resultValidation) {
			toast.warning(resultValidation, {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			return;
		}

		sendNotifications();
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
		callBack();
	};

	return (
		<>
			<div
				className={`${
					showBlack ? "w-1/2" : "w-full"
				}   h-full bg-white flex relative text-[13px] text-blue-100 font-bold`}
				style={{
					width: "100%",
				}}
			>
				<Select
					className="flex flex-col gap-2 w-[98%]"
					label=""
					required
					placeholder="Select Notification"
					value={notification}
					onChange={(event): void => {
						if (event.target.value === "custom-notification") {
							setShowNotes(true);
						} else {
							setShowNotes(false);
						}
						setNotification(event.target.value as string);
					}}
					options={notificationTypes.map((type) => ({
						name: type.name,
						code: type.url,
					}))}
				/>
			</div>
			<div
				className={`${
					showBlack ? "w-1/2" : "w-full"
				}   h-full bg-white  mt-4 flex relative text-[13px] text-blue-100 font-bold`}
				style={{
					width: "100%",
				}}
			>
				<div
					className="absolute left-[10px] cursor-pointer"
					onClick={(): void => {
						handleSelectAllBorrowers(!selectAllBorrowers);
					}}
				>
					{selectAllBorrowers ? "Unselect" : "Select"} All borrowers
				</div>
				<div
					className="absolute right-[77px] cursor-pointer"
					onClick={(): void => {
						handleSelectAllSms(!selectAllSms);
					}}
				>
					All sms
				</div>
				<div
					className="absolute right-[10px] cursor-pointer"
					onClick={(): void => {
						handleSelectAllEmail(!selectAllEmail);
					}}
				>
					All Email
				</div>
			</div>

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
					<BorrowerList
						borrowers={borrowers}
						handleChange={handleChange}
						showNotes={showNotes}
					/>
					<div className="w-full absolute bottom-10">
						<Button
							buttonText={"Send"}
							variant={"primary"}
							className={`${showBlack ? "w-[48%]" : "w-[96%]"} mt-2 h-10`}
							type="button"
							onClick={validateSend}
						/>
					</div>
				</div>
				{showBlack && (
					<div className=" w-1/2 relative pl-4">
						<BorrowerTemplates
							smsContent={smsContent}
							setSmsContent={setSmsContent}
							emailContent={emailContent}
							setEmailContent={setEmailContent}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default MultiplesBorrowerNotification;
