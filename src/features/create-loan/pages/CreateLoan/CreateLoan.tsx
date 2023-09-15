import { FC, useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import CreateLoanService from "@/features/create-loan/api/create-loan";
import { AddParticipant } from "@/features/create-loan/components/AddParticipant/AddParticipant";
import { BankingInformation } from "@/features/create-loan/components/BankingInformation/BankingInformation";
import { BorrowerInformation } from "@/features/create-loan/components/BorrowerInformation/BorrowerInformation";
import { FundingBreakdown } from "@/features/create-loan/components/FundingBreakdown/FundingBreakdown";
import { LoanInformation } from "@/features/create-loan/components/LoanInformation/LoanInformation";
import { MultipleCollateral } from "@/features/create-loan/components/MultipleCollateral/MultipleCollateral";
import { SelectLender } from "@/features/create-loan/components/SelectLender/SelectLender";
import { LoanSchema } from "@/features/create-loan/schemas/LoanSchema";
import { Loan } from "@/features/create-loan/types/fields";
import { defaultValues } from "@/features/create-loan/utils/values";
import { unFormatPhone } from "@/utils/common-funtions";
import { SuccessModal } from "@/components/ui/SuccessModal";

export const CreateLoan: FC = () => {
	const [openLenderModal, setOpenLenderModal] = useState<boolean>(false);
	const [openParticipantModal, setOpenParticipantModal] =
		useState<boolean>(false);
	const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
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
	const {
		append: appendParticipant,
		fields: fundingBreakdown,
		remove: removeParticipant,
	} = useFieldArray({
		control,
		name: "fundingBreakdown",
	});

	const { mutate, isSuccess, reset: resetMutation } = useMutation((data: Loan) => {
		return CreateLoanService.createLoan(data);
	});

	const onSubmit: SubmitHandler<Loan> = (data: Loan): void => {
		const phoneNumber = unFormatPhone(data.borrower?.user?.phoneNumber || "");

		const formatData = {
			...data,
			borrower: {
				...data.borrower,
				user: {
					...data.borrower.user,
					phoneNumber: `+1${phoneNumber}`,
				},
			},
		};

		mutate(formatData);
	};

	useEffect(() => {
		if (isSuccess) {
			reset();
      resetMutation();
			setOpenSuccessModal(true);
		}
	}, [isSuccess]);

	return (
		<>
			<form
				className="flex flex-col rounded-3xl bg-white gap-6 divide-y divide-gray-200 w-screen p-6 h-full overflow-y-auto"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="grid grid-cols-3 gap-6 divide-x divide-gray-200">
					<LoanInformation errors={errors} register={register} />

					<div className="flex flex-col gap-6 divide-y divide-gray-200 pl-6">
						<BorrowerInformation errors={errors} register={register} />
						<BankingInformation errors={errors} register={register} />
					</div>

					<MultipleCollateral
						append={appendCollateral}
						errors={errors}
						fields={collaterals}
						register={register}
						remove={removeCollateral}
					/>
				</div>

				<FundingBreakdown
					control={control}
					register={register}
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
				fields={fundingBreakdown}
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
