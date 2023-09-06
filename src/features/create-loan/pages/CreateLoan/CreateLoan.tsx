import { FC, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AddParticipant } from "@/features/create-loan/components/AddParticipant/AddParticipant";
import { BankingInformation } from "@/features/create-loan/components/BankingInformation/BankingInformation";
import { BorrowerInformation } from "@/features/create-loan/components/BorrowerInformation/BorrowerInformation";
import { FundingBreakdown } from "@/features/create-loan/components/FundingBreakdown/FundingBreakdown";
import { LoanInformation } from "@/features/create-loan/components/LoanInformation/LoanInformation";
import { MultipleCollateral } from "@/features/create-loan/components/MultipleCollateral/MultipleCollateral";
import { SelectLender } from "@/features/create-loan/components/SelectLender/SelectLender";
import { LoanFields } from "@/features/create-loan/types/fields";
import { defaultValues } from "@/features/create-loan/utils/values";

export const CreateLoan: FC = () => {
	const [openLenderModal, setOpenLenderModal] = useState<boolean>(false);
	const [openParticipantModal, setOpenParticipantModal] =
		useState<boolean>(false);
	const { control, handleSubmit, register, setValue } = useForm<LoanFields>({
		defaultValues,
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

	const onSubmit = (data: LoanFields): void => {
		console.log(data);
	};

	return (
		<>
			<form
				className="flex flex-col rounded-3xl bg-white gap-6 divide-y divide-gray-200 w-screen p-6 h-full overflow-y-auto"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="grid grid-cols-3 gap-6 divide-x divide-gray-200">
					<LoanInformation register={register} />

					<div className="flex flex-col gap-6 divide-y divide-gray-200 pl-6">
						<BorrowerInformation register={register} />
						<BankingInformation register={register} />
					</div>

					<MultipleCollateral
						append={appendCollateral}
						fields={collaterals}
						register={register}
						remove={removeCollateral}
					/>
				</div>

				<FundingBreakdown
          control={control}
					fields={fundingBreakdown}
					register={register}
					remove={removeParticipant}
					setOpenLenderModal={setOpenLenderModal}
					setOpenParticipantModal={setOpenParticipantModal}
				/>
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
		</>
	);
};
