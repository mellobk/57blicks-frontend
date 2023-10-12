import { type FC, useEffect, useState } from "react";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import moment from "moment/moment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import { SuccessModal } from "@/components/ui/SuccessModal";
import { AddParticipant } from "@/features/create-loan/components/AddParticipant/AddParticipant";
import { BankingInformation } from "@/features/create-loan/components/BankingInformation/BankingInformation";
import { BorrowerInformation } from "@/features/create-loan/components/BorrowerInformation/BorrowerInformation";
import { FundingBreakdown } from "@/features/create-loan/components/FundingBreakdown/FundingBreakdown";
import type { Loan } from "@/features/create-loan/types/fields";
import { LoanInformation } from "@/features/create-loan/components/LoanInformation/LoanInformation";
import { LoanSchema } from "@/features/create-loan/schemas/LoanSchema";
import LoansService from "../../api/loans";
import { MultipleCollateral } from "@/features/create-loan/components/MultipleCollateral/MultipleCollateral";
import { SelectLender } from "@/features/create-loan/components/SelectLender/SelectLender";
import { defaultValues } from "@/features/create-loan/utils/values";
import { unFormatPhone } from "@/utils/common-funtions";

export const CreateLoan: FC = () => {
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

	const { fields: fundingBreakdown } = useFieldArray({
		control,
		name: "fundingBreakdown",
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
	} = useMutation((data: Loan) => {
		return LoansService.createLoan(data);
	});

	function calculateRegular(amount: string, rate: string) {
		return ((Number(amount) * (Number(rate) / 100)) / 12).toFixed(2);
	}

	function calculateProrated(
		amount: string,
		rate: string,
		originationDate: string
	) {
		const date = originationDate
			? moment(originationDate, "MM-DD-YYYY")
			: moment();
		const lastDayOfMonth = date.clone().endOf("month");
		const daysUntilEndOfMonth = lastDayOfMonth.diff(date, "days") + 1;
		const dailyRate = Number(rate) / 100 / 365;

		return (Number(amount) * dailyRate * daysUntilEndOfMonth).toFixed(2);
	}

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
						<BorrowerInformation errors={errors} register={register} />
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
					calculateProrated={calculateProrated}
					calculateRegular={calculateRegular}
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
