/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type FC, useEffect, useState } from "react";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import LoansService from "@/api/loans";
import { Button } from "@/components/ui/Button";
import { SuccessModal } from "@/components/ui/SuccessModal";
import { AddParticipant } from "@/features/admin/components/create-loan/components/AddParticipant/AddParticipant";
import { BankingInformation } from "@/features/admin/components/create-loan/components/BankingInformation/BankingInformation";
import { BorrowerInformation } from "@/features/admin/components/create-loan/components/BorrowerInformation/BorrowerInformation";
import { FundingBreakdown } from "@/features/admin/components/create-loan/components/FundingBreakdown/FundingBreakdown";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import { LoanInformation } from "@/features/admin/components/create-loan/components/LoanInformation/LoanInformation";
import { LoanSchema } from "@/features/admin/components/create-loan/schemas/LoanSchema";
import { MultipleCollateral } from "@/features/admin/components/create-loan/components/MultipleCollateral/MultipleCollateral";
import { SelectLender } from "@/features/admin/components/create-loan/components/SelectLender/SelectLender";
import { defaultValues } from "@/features/admin/components/create-loan/utils/values";
import {
	calculateProrated,
	calculateRegular,
	unFormatPhone,
} from "@/utils/common-funtions";
import ManageNotificationService from "../../../notifications/api/notification";
import { userName } from "@/utils/constant";
import { getLocalStorage } from "@/utils/local-storage";

export const CreateLoan: FC = () => {
	const createLedgerQuery = useMutation(async (body: any) => {
		return ManageNotificationService.createNotifications(body);
	});
	const localUserName = getLocalStorage(userName);
	const [openLenderModal, setOpenLenderModal] = useState(false);
	const [openParticipantModal, setOpenParticipantModal] = useState(false);
	const [openSuccessModal, setOpenSuccessModal] = useState(false);

	const {
		control,
		formState: { errors },
		handleSubmit,
		register,
		reset,
		setValue,
	} = useForm<Loan>({
		defaultValues,
		resolver: zodResolver(LoanSchema),
	});

	const {
		append: appendCollateral,
		fields: collaterals,
		remove: removeCollateral,
	} = useFieldArray({
		control,
		name: "collaterals",
	});

	const { append: appendParticipant, remove: removeParticipant } =
		useFieldArray({
			control,
			name: "participationBreakdown",
		});

	const {
		isError,
		isSuccess,
		mutate,
		reset: resetMutation,
		data,
	} = useMutation((data: Loan) => {
		return LoansService.createLoan(data);
	});

	const onSubmit: SubmitHandler<Loan> = (data: Loan): void => {
		const phoneNumber = unFormatPhone(data.borrower?.user?.phoneNumber || "");
		const fundingBreakdown = data.fundingBreakdown.map((breakdown) => ({
			...breakdown,
			prorated: calculateProrated(
				breakdown.amount,
				breakdown.rate,
				data.originationDate
			),
			regular: calculateRegular(breakdown.amount, breakdown.rate),
		}));
		const participationBreakdown = data.participationBreakdown.map(
			(breakdown) => ({
				...breakdown,
				prorated: calculateProrated(
					breakdown.amount,
					breakdown.rate,
					data.originationDate
				),
				regular: calculateRegular(breakdown.amount, breakdown.rate),
			})
		);

		const formatData = {
			...data,
			borrower: {
				...data.borrower,
				user: {
					...data.borrower.user,
					phoneNumber: `+1${phoneNumber}`,
				},
			},
			fundingBreakdown,
			participationBreakdown,
		};

		mutate(formatData);
	};

	useEffect(() => {
		if (isSuccess) {
			reset();
			resetMutation();
			setOpenSuccessModal(true);
			const dataNotification = { id: data.id, ledgerId: "" };
			createLedgerQuery.mutate({
				title: "Approve Loan",
				timestamp: new Date(),
				content: `Pending Loan Approval!  from ${localUserName} needs action.`,
				additionalData: JSON.stringify(dataNotification),
				userFullName: localUserName,
				priority: "HIGH",
				type: "LOAN",
				roles: ["super-admin"],
			});
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isError) {
			resetMutation();
		}
	}, [isError]);

	return (
		<>
			<form
				className="flex flex-col rounded-3xl bg-white gap-6 divide-y divide-gray-200 w-screen p-6 h-full overflow-y-auto"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="grid grid-cols-3 gap-6 divide-x divide-gray-200">
					<LoanInformation
						control={control}
						errors={errors}
						register={register}
						setValue={setValue}
					/>

					<div className="flex flex-col gap-6 divide-y divide-gray-200 pl-6">
						<BorrowerInformation
							control={control}
							errors={errors}
							register={register}
						/>
						<BankingInformation
							control={control}
							errors={errors}
							register={register}
						/>
					</div>

					<MultipleCollateral
						append={appendCollateral}
						control={control}
						errors={errors}
						fields={collaterals}
						register={register}
						remove={removeCollateral}
					/>
				</div>

				<FundingBreakdown
					control={control}
					errors={errors}
					remove={removeParticipant}
					setOpenLenderModal={setOpenLenderModal}
					setOpenParticipantModal={setOpenParticipantModal}
				/>

				<div>
					<Button
						buttonText="Save Loan"
						className="w-full rounded-2xl bg-gold-600 px-[18px] py-4 font-inter font-semibold text-sm text-primary-300 leading-[17px] tracking-[-0.7px]"
						type="submit"
					/>
				</div>
			</form>

			<AddParticipant
				append={appendParticipant}
				openModal={openParticipantModal}
				setOpenModal={setOpenParticipantModal}
			/>

			<SelectLender
				control={control}
				openModal={openLenderModal}
				setOpenModal={setOpenLenderModal}
				setValue={setValue}
			/>

			<SuccessModal
				description="Loan information added to the related participants"
				openModal={openSuccessModal}
				setOpenModal={setOpenSuccessModal}
				title="Loan Created"
			/>
		</>
	);
};
