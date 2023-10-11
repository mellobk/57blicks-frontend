import { useEffect, type FC } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/forms/Select";
import { ACCOUNT_OPTIONS } from "@/features/manage-user/utils/constant";
import { MaskInput } from "@/components/forms/MaskInput";
import type { IBorrowerInformation, FundingBreakdown } from "../../types/api";
import { borrowerInformationFields } from "../../utils/input-fields";
import { useMutation } from "@tanstack/react-query";
import DkcLendersService from "../../api/servicing";
import type { updateGeneralUserInformation } from "@/features/manage-user/types/fields";
import ManageUsersService from "@/features/manage-user/api/investors";
import { removeCountryCode, unFormatPhone } from "@/utils/common-funtions";
import useStore from "@/stores/app-store";

interface InvestorBankInfoProps {
	data?: FundingBreakdown;
	handleRefreshData?: () => void;
}

export const BorrowerInformation: FC<InvestorBankInfoProps> = ({
	data,
	handleRefreshData,
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FieldValues>();

	const setSuccessMessage = useStore((state) => state.setSuccessMessage);
	const clearSuccessMessage = useStore((state) => state.clearSuccessMessage);

	const updateBorrowerInfoMutation = useMutation(
		(borrowerData: IBorrowerInformation) => {
			return DkcLendersService.updateBorrowerInfo(
				data?.loan?.borrower?.id || "",
				borrowerData
			);
		}
	);

	const updateAdmin = useMutation((data: updateGeneralUserInformation) => {
		return ManageUsersService.updateGeneralInformation(data);
	});

	const updateServicingData = async (
		servicingData: IBorrowerInformation
	): Promise<void> => {
		try {
			const borrowerData = {
				accountNumber: servicingData.accountNumber || "",
				routingNumber: servicingData.routingNumber || "",
				accountType: servicingData.accountType || "",
				bankingName: servicingData.bankingName || "",
				llc: servicingData.llc || "",
				ssnEin: servicingData.ssnEin || "",
			};

			await updateBorrowerInfoMutation.mutateAsync(borrowerData);
			await updateAdmin.mutateAsync({
				id: data?.loan?.borrower?.user?.id,
				email: servicingData.email || "",
				phoneNumber: `+1${unFormatPhone(servicingData.phoneNumber || "")}`,
				mailingAddress: servicingData.mailingAddress || "",
				firstName: servicingData.firstName || "",
				lastName: servicingData.lastName || "",
			});

			if (handleRefreshData) {
				handleRefreshData();
			}

			setSuccessMessage("data updated successfully");
			setTimeout(() => {
				clearSuccessMessage();
			}, 500);
			updateBorrowerInfoMutation.reset();
			updateAdmin.reset();
		} catch (error) {
			console.log(error);
		}
	};

	const onSubmit: SubmitHandler<FieldValues> = (
		data: IBorrowerInformation
	): void => {
		void updateServicingData(data);
	};

	useEffect(() => {
		setValue(borrowerInformationFields?.llc || "", data?.loan?.borrower.llc);
		setValue(
			borrowerInformationFields?.ssnEin || "",
			data?.loan?.borrower.ssnEin
		);
		setValue(
			borrowerInformationFields?.firstName || "",
			data?.loan?.borrower?.user?.firstName
		);
		setValue(
			borrowerInformationFields?.lastName || "",
			data?.loan?.borrower?.user?.lastName
		);
		setValue(
			borrowerInformationFields?.phoneNumber || "",
			removeCountryCode(data?.loan?.borrower?.user?.phoneNumber || "")
		);
		setValue(
			borrowerInformationFields?.email || "",
			data?.loan?.borrower?.user?.email
		);
		setValue(
			borrowerInformationFields?.mailingAddress || "",
			data?.loan?.borrower?.user?.mailingAddress
		);

		setValue(
			borrowerInformationFields?.bankingName || "",
			data?.loan?.borrower.bankingName
		);
		setValue(
			borrowerInformationFields?.accountNumber || "",
			data?.loan?.borrower.accountNumber
		);
		setValue(
			borrowerInformationFields?.accountType || "",
			data?.loan?.borrower.accountType
		);
		setValue(
			borrowerInformationFields?.routingNumber || "",
			data?.loan?.borrower.routingNumber
		);
	}, []);

	return (
		<div
			className={` flex  w-full h-full  gap-5 text-gray-1000  justify-center p-[5px] rounded-[16px]  overflow-hidden mt-9`}
		>
			<div className="w-full h-full">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full h-full flex  justify-between gap-7"
				>
					<div className="w-[60%]  border border-gray-200 p-4 rounded-3xl gap-6 flex flex-col ">
						<div className="text-[28px] text-black">Borrower Information</div>
						<div className="flex w-full gap-4">
							<div className="w-full">
								<Input
									label="Borrower LLC"
									placeholder="Enter Borrower LLC"
									register={register(borrowerInformationFields?.llc || "")}
									error={
										errors?.[borrowerInformationFields?.llc || ""] &&
										errors?.[borrowerInformationFields?.llc || ""]?.message
									}
								/>
							</div>
							<div className="w-full">
								<Input
									label="EIN/SSN"
									placeholder="Enter EIN/SSN"
									register={register(borrowerInformationFields?.ssnEin || "")}
									error={
										errors?.[borrowerInformationFields?.ssnEin || ""] &&
										errors?.[borrowerInformationFields?.ssnEin || ""]?.message
									}
								/>
							</div>
						</div>
						<div className="flex w-full gap-4">
							<div className="w-full">
								<Input
									label="First Name"
									placeholder="Enter First Name"
									register={register(
										borrowerInformationFields?.firstName || ""
									)}
									error={
										errors?.[borrowerInformationFields?.firstName || ""] &&
										errors?.[borrowerInformationFields?.firstName || ""]
											?.message
									}
								/>
							</div>
							<div className="w-full">
								<Input
									label="Last Name"
									placeholder="Enter Last Name"
									register={register(borrowerInformationFields?.lastName || "")}
									error={
										errors?.[borrowerInformationFields?.lastName || ""] &&
										errors?.[borrowerInformationFields?.lastName || ""]?.message
									}
								/>
							</div>
						</div>
						<div className="flex w-full gap-4">
							<div className="w-full">
								<MaskInput
									mask="(999) 999-9999"
									label="Phone Number"
									placeholder="Enter Phone Number"
									register={register(
										borrowerInformationFields?.phoneNumber || ""
									)}
									error={
										errors?.[borrowerInformationFields?.phoneNumber || ""] &&
										errors?.[borrowerInformationFields?.phoneNumber || ""]
											?.message
									}
								/>
							</div>
							<div className="w-full">
								<Input
									label="Email Address"
									placeholder="Enter Email Address"
									register={register(borrowerInformationFields?.email || "")}
									error={
										errors?.[borrowerInformationFields?.email || ""] &&
										errors?.[borrowerInformationFields?.email || ""]?.message
									}
								/>
							</div>
						</div>
						<div className="flex w-full gap-4">
							<div className="w-full">
								<Input
									label="Mailing Address"
									placeholder="Enter Mailing Address"
									register={register(
										borrowerInformationFields?.mailingAddress || ""
									)}
									error={
										errors?.[borrowerInformationFields?.mailingAddress || ""] &&
										errors?.[borrowerInformationFields?.mailingAddress || ""]
											?.message
									}
								/>
							</div>
						</div>
					</div>

					<div className="w-[40%]  flex gap-6 flex-col overflow-auto border border-gray-200 p-4 rounded-3xl ">
						<div className="text-[28px] text-black">Banking Information</div>
						<Input
							label="Banking Name"
							placeholder="Banking Name"
							register={register(borrowerInformationFields?.bankingName || "")}
						/>

						<Input
							label="Routing Number"
							type="number"
							placeholder="Enter Routing Number"
							register={register(
								borrowerInformationFields?.routingNumber || ""
							)}
						/>

						<Input
							label="Account Number"
							type="number"
							placeholder="EnterAccount Number"
							register={register(
								borrowerInformationFields?.accountNumber || ""
							)}
						/>

						<Select
							register={register(borrowerInformationFields?.accountType || "")}
							className="flex flex-col gap-2"
							label="Account Type"
							placeholder="Select Account Type"
							value={data?.loan?.borrower?.accountType || ""}
							options={ACCOUNT_OPTIONS}
						/>
						<div className="absolute" style={{ top: "25px", right: "65px" }}>
							<Button
								iconColor="black"
								loading={updateAdmin.isLoading}
								buttonText={"Save"}
								variant={"gray"}
								className={``}
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
