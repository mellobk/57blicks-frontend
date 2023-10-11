import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";

import { AdditionalInformation } from "@/features/opportunities/components/CreateOpportunity/AdditionalInformation/AdditionalInformation";
import { BreadCrumb } from "@/components/ui/BreadCrumb";
import { Button } from "@/components/ui/Button";
import { DocumentPreview } from "@/features/opportunities/components/CreateOpportunity/DocumentPreview/DocumentPreview";
import type { FC } from "react";
import { GeneralInformation } from "@/features/opportunities/components/CreateOpportunity/GeneralInformation/GeneralInformation";
import { LoanDetails } from "@/features/opportunities/components/CreateOpportunity/LoanDetails/LoanDetails";
import { NotesOnTheBorrower } from "@/features/opportunities/components/CreateOpportunity/NotesOnTheBorrower/NotesOnTheBorrower";
import { Opportunity } from "@/features/opportunities/types/fields";
import { OpportunitySchema } from "@/features/opportunities/schemas/OpportunitySchema";
import { ParticipantOpportunities } from "@/features/opportunities/components/CreateOpportunity/ParticipantOpportunities/ParticipantOpportunities";
import { PostTo } from "@/features/opportunities/components/CreateOpportunity/PostTo/PostTo";
import { SuccessModal } from "@/components/ui/SuccessModal";
import { Tabs } from "@/components/ui/Tabs";
import { tabs } from "@/features/opportunities/utils/tabs";
import { zodResolver } from "@hookform/resolvers/zod";

export const CreateOpportunity: FC = () => {
	const [openPostToModal, setOpenPostToModal] = useState(false);
	const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
	const {
		control,
		formState: { errors },
		handleSubmit,
		register,
		reset,
		setValue,
	} = useForm<Opportunity>({
		resolver: zodResolver(OpportunitySchema),
	});
	const [assetValue, loanAmount] = useWatch({
		control,
		name: ["assetValue", "loanAmount"],
	});

	const onSubmit: SubmitHandler<Opportunity> = (): void => {
		setOpenPostToModal(true);
	};

	useEffect(() => {
		setValue(
			"loanToValue",
			String(
				(assetValue
					? (Number(loanAmount) * 100) / Number(assetValue) || 0
					: 0
				).toFixed(2)
			)
		);
	}, [assetValue, loanAmount]);

	return (
		<form
			className="flex flex-col w-full h-full"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex justify-between items-center w-full bg-primary-500 px-4 mb-2">
				<div>
					<BreadCrumb
						initialTab="Opportunities"
						actualTab="Create Opportunity"
					/>
				</div>
				<div className="relative z-10">
					<Tabs tabs={tabs} actualTab="create opportunity" />
				</div>
				<div>
					<Button
						className="rounded-2xl h-9 bg-gold-500/[.16] text-gold-500"
						type="submit"
					/>
				</div>
			</div>
			<div className="grid lg:grid-cols-7 gap-6 divide-x divide-gray-200 bg-white rounded-3xl w-screen p-6 h-full overflow-y-auto">
				<div className="lg:col-span-2 col-span-1">
					<GeneralInformation errors={errors} register={register} />
				</div>

				<div className="lg:col-span-2 col-span-1 flex flex-col gap-6 lg:pl-6">
					<LoanDetails control={control} errors={errors} register={register} />
					<ParticipantOpportunities control={control} errors={errors} />
					<NotesOnTheBorrower
						control={control}
						errors={errors}
						register={register}
					/>
					<AdditionalInformation errors={errors} register={register} />
				</div>

				<div className="lg:col-span-3 col-span-1 lg:pl-6">
					<DocumentPreview control={control} />
				</div>
			</div>

			<PostTo
				control={control}
				openModal={openPostToModal}
				reset={reset}
				setOpenModal={setOpenPostToModal}
				setOpenSuccessModal={setOpenSuccessModal}
				setValue={setValue}
			/>

			<SuccessModal
				description="Opportunity information post to the selected investors"
				openModal={openSuccessModal}
				setOpenModal={setOpenSuccessModal}
				title="Opportunity Created"
			/>
		</form>
	);
};
