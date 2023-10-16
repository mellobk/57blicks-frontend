import { type FC, useEffect, useState } from "react";
import { type SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PDFViewer } from "@react-pdf/renderer";

import { BreadCrumb } from "@/components/ui/BreadCrumb";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SuccessModal } from "@/components/ui/SuccessModal";
import { Tabs } from "@/components/ui/Tabs";
import { AdditionalInformation } from "@/features/opportunities/components/CreateOpportunity/AdditionalInformation/AdditionalInformation";
import { DocumentPreview } from "@/features/opportunities/components/CreateOpportunity/DocumentPreview/DocumentPreview";
import { GeneralInformation } from "@/features/opportunities/components/CreateOpportunity/GeneralInformation/GeneralInformation";
import { LoanDetails } from "@/features/opportunities/components/CreateOpportunity/LoanDetails/LoanDetails";
import { NotesOnTheBorrower } from "@/features/opportunities/components/CreateOpportunity/NotesOnTheBorrower/NotesOnTheBorrower";
import { ParticipantOpportunities } from "@/features/opportunities/components/CreateOpportunity/ParticipantOpportunities/ParticipantOpportunities";
import { PostTo } from "@/features/opportunities/components/CreateOpportunity/PostTo/PostTo";
import { OpportunitySchema } from "@/features/opportunities/schemas/OpportunitySchema";
import type { Opportunity } from "@/features/opportunities/types/fields";
import { tabs } from "@/features/opportunities/utils/tabs";
import { defaultValues } from "@/features/opportunities/utils/values";

export const CreateOpportunity: FC = () => {
	const [openPostToModal, setOpenPostToModal] = useState(false);
	const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
	const [showPreview, setShowPreview] = useState(false);

	const {
		control,
		formState: { errors },
		handleSubmit,
		register,
		reset,
		setValue,
	} = useForm<Opportunity>({
		defaultValues,
		resolver: zodResolver(OpportunitySchema),
	});

	const form = useWatch({ control });

	const onSubmit: SubmitHandler<Opportunity> = (): void => {
		setOpenPostToModal(true);
	};

	useEffect(() => {
		setValue(
			"loanToValue",
			String(
				(form.assetValue
					? (Number(form.loanAmount) * 100) / Number(form.assetValue) || 0
					: 0
				).toFixed(2)
			)
		);
	}, [form.assetValue, form.loanAmount]);

	useEffect(() => {
		setShowPreview(false);
	}, [form]);

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
						buttonText="Post"
						className="rounded-2xl h-9 bg-gold-500/[.16] text-gold-500"
						type="submit"
					/>
				</div>
			</div>
			<div className="grid lg:grid-cols-7 gap-6 divide-x divide-gray-200 bg-white rounded-3xl w-full h-full p-6 overflow-y-auto">
				<div className="lg:col-span-2 col-span-1">
					<GeneralInformation errors={errors} register={register} />
				</div>

				<div className="lg:col-span-2 col-span-1 flex flex-col gap-6 lg:pl-6 h-full overflow-y-auto">
					<LoanDetails control={control} errors={errors} register={register} />
					<ParticipantOpportunities
						control={control}
						errors={errors}
						setValue={setValue}
					/>
					<NotesOnTheBorrower
						control={control}
						errors={errors}
						register={register}
					/>
					<AdditionalInformation errors={errors} register={register} />
				</div>

				<div className="lg:col-span-3 col-span-1 lg:pl-6">
					{showPreview ? (
						<div className="h-full" onClick={() => setShowPreview(false)}>
							<PDFViewer height="100%" width="100%" showToolbar={false}>
								<DocumentPreview control={control} />
							</PDFViewer>
						</div>
					) : (
						<div
							className="flex justify-center items-center h-full bg-gray-500/[.08]"
							onClick={() => {
								setShowPreview(true);
							}}
						>
							<Icon color="#0E2130" name="hidden" width="48" />
						</div>
					)}
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
