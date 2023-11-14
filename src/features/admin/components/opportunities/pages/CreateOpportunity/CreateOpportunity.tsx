/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type FC, useEffect, useState } from "react";
import { type SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PDFViewer } from "@react-pdf/renderer";

import { BreadCrumb } from "@/components/ui/BreadCrumb";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SuccessModal } from "@/components/ui/SuccessModal";
import { Tabs } from "@/components/ui/Tabs";
import { AdditionalInformation } from "@/features/admin/components/opportunities/components/CreateOpportunity/AdditionalInformation/AdditionalInformation";
import { DocumentPreview } from "@/features/admin/components/opportunities/components/CreateOpportunity/DocumentPreview/DocumentPreview";
import { GeneralInformation } from "@/features/admin/components/opportunities/components/CreateOpportunity/GeneralInformation/GeneralInformation";
import { LoanDetails } from "@/features/admin/components/opportunities/components/CreateOpportunity/LoanDetails/LoanDetails";
import { NotesOnTheBorrower } from "@/features/admin/components/opportunities/components/CreateOpportunity/NotesOnTheBorrower/NotesOnTheBorrower";
import { ParticipantOpportunities } from "@/features/admin/components/opportunities/components/CreateOpportunity/ParticipantOpportunities/ParticipantOpportunities";
import { PostTo } from "@/features/admin/components/opportunities/components/CreateOpportunity/PostTo/PostTo";
import { OpportunitySchema } from "@/features/admin/components/opportunities/schemas/OpportunitySchema";
import type { Opportunity } from "@/features/admin/components/opportunities/types/fields";
import { tabsOpportunity } from "@/features/admin/components/opportunities/utils/tabs";
import { defaultValues } from "@/features/admin/components/opportunities/utils/values";
import { findPermission } from "@/utils/common-funtions";
import userStore from "@/stores/user-store";
import { PermissionType } from "@/types/api/permissions-type";
import { useNavigate } from "@tanstack/router";

export const CreateOpportunity: FC = () => {
	const navigate = useNavigate();
	const userLoggedInfo = userStore((state) => state.loggedUserInfo);
	const [openPostToModal, setOpenPostToModal] = useState(false);
	const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
	const [showPreview, setShowPreview] = useState(false);

	useEffect(() => {
		const find = findPermission(
			userLoggedInfo?.role,
			userLoggedInfo?.permissionGroup?.permissions || [],
			PermissionType.CREATE_OPPORTUNITY
		);

		if (!find) {
			void navigate({ to: `/opportunities/past-opportunities` });
		}
	}, [userLoggedInfo]);

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
					<Tabs
						tabs={[
							findPermission(
								userLoggedInfo?.role,
								userLoggedInfo?.permissionGroup?.permissions || [],
								PermissionType.CREATE_OPPORTUNITY
							)
								? tabsOpportunity.create
								: tabsOpportunity.empty,

							findPermission(
								userLoggedInfo?.role,
								userLoggedInfo?.permissionGroup?.permissions || [],
								PermissionType.VIEW_OPPORTUNITIES
							)
								? tabsOpportunity.past
								: tabsOpportunity.empty,
						]}
						actualTab="create opportunity"
					/>
				</div>
				<div>
					<Button
						buttonText="Post"
						className="rounded-2xl px-4 py-2 bg-gold-500/[.16] text-gold-500 font-semibold"
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