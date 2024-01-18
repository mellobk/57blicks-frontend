import { type FC, useEffect, useState } from "react";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import LoansService from "@/api/loans";
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
import ManageNotificationService from "@/features/admin/components/notifications/api/notification";
import { unFormatPhone } from "@/utils/common-functions";
import { userName } from "@/utils/constant";
import { getLocalStorage } from "@/utils/local-storage";
import type { Notification } from "@/features/admin/components/notifications/types/types";
import Loading from "@/assets/icons/loading";
import {
	validateProratedRowsCalculations,
	validateRegularRowsCalculations,
} from "../../components/FundingBreakdown/utils/validate-penny";

export const CreateLoan: FC = () => {
	const createLedgerQuery = useMutation(async (body: Notification) => {
		return ManageNotificationService.createNotifications(body);
	});
	const localUserName = getLocalStorage(userName);
	const [openLenderModal, setOpenLenderModal] = useState(false);
	const [openParticipantModal, setOpenParticipantModal] = useState(false);
	const [openSuccessModal, setOpenSuccessModal] = useState(false);

	const {
		control,
		formState: { errors },
		watch,
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
		isLoading,
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
			prorated: validateProratedRowsCalculations(
				breakdown.amount,
				breakdown.rate,
				data.originationDate,
				breakdown.type,
				data.totalLoanAmount,
				data.interestRate,
				[...data.participationBreakdown, ...data.fundingBreakdown]
			),
			regular: validateRegularRowsCalculations(
				breakdown.amount,
				breakdown.rate,
				breakdown.type,
				data.totalLoanAmount,
				data.interestRate,
				[...data.participationBreakdown, ...data.fundingBreakdown]
			),
		}));

		const participationBreakdown = data.participationBreakdown.map(
			(breakdown) => ({
				...breakdown,
				prorated: validateProratedRowsCalculations(
					breakdown.amount,
					breakdown.rate,
					data.originationDate,
					breakdown.type,
					data.totalLoanAmount,
					data.interestRate,
					[...data.participationBreakdown, ...data.fundingBreakdown]
				),
				regular: validateRegularRowsCalculations(
					breakdown.amount,
					breakdown.rate,
					breakdown.type,
					data.totalLoanAmount,
					data.interestRate,
					[...data.participationBreakdown, ...data.fundingBreakdown]
				),
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

	const handleRemove = (index: number): void => {
		const participants = watch("participationBreakdown");
		const investor = participants[index];
		const indexToRemove: Array<number> = [];
		participants.forEach((participant, index_) => {
			if (participant.investorId === (investor?.investorId ?? "")) {
				indexToRemove.push(index_);
			}
		});

		//loop the array inversely to avoid index change when removing an item
		for (let index_ = indexToRemove.length - 1; index_ >= 0; index_--) {
			removeParticipant(indexToRemove[index_]);
		}
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

	useEffect(() => {}, [errors]);

	if (isLoading) {
		return (
			<div className="flex flex-col rounded-3xl bg-white gap-6 divide-y divide-gray-200 w-screen p-6 h-full overflow-y-auto">
				<div className="flex flex-col w-full  items-center justify-items-center justify-center">
					<div>
						<Loading />
					</div>
					<div className="pt-6">Saving please wait...</div>
				</div>
			</div>
		);
	}

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
					remove={handleRemove}
					setOpenLenderModal={setOpenLenderModal}
					setOpenParticipantModal={setOpenParticipantModal}
					setValue={setValue}
				/>
			</form>

			<AddParticipant
				append={appendParticipant}
				openModal={openParticipantModal}
				setOpenModal={setOpenParticipantModal}
				constructionHoldbackValue={watch("constructionHoldback")}
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
