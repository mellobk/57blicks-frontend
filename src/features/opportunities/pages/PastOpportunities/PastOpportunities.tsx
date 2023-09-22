import type { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BreadCrumb } from "@/components/ui/BreadCrumb";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { LoanSchema } from "@/features/create-loan/schemas/LoanSchema";
import { AdditionalInformation } from "@/features/opportunities/components/AdditionalInformation/AdditionalInformation";
import { GeneralInformation } from "@/features/opportunities/components/GeneralInformation/GeneralInformation";
import { LoanDetails } from "@/features/opportunities/components/LoanDetails/LoanDetails";
import { NotesOnTheBorrower } from "@/features/opportunities/components/NotesOnTheBorrower/NotesOnTheBorrower";
import { ParticipantOpportunities } from "@/features/opportunities/components/ParticipantOpportunities/ParticipantOpportunities";
import { Opportunity } from "@/features/opportunities/types/fields";
import { tabs } from "@/features/opportunities/utils/tabs";

export const PastOpportunities: FC = () => {
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<Opportunity>({
		resolver: zodResolver(LoanSchema),
	});

	const onSubmit: SubmitHandler<Opportunity> = (data: Opportunity): void => {
		console.log(data);
	};

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex justify-between items-center w-full bg-primary-500 px-4 mb-2">
				<div>
					<BreadCrumb
						initialTab="Opportunities"
						actualTab="Past Opportunities"
					/>
				</div>
				<div className="relative z-10">
					<Tabs tabs={tabs} actualTab="past opportunities" />
				</div>
				<div>
					<Button />
				</div>
			</div>
			<form
				className="grid lg:grid-cols-7 gap-6 divide-x divide-gray-200 bg-white rounded-3xl w-screen p-6 h-full overflow-y-auto"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="lg:col-span-2 col-span-1">
					<GeneralInformation errors={errors} register={register} />
				</div>

				<div className="lg:col-span-2 col-span-1 flex flex-col gap-6 lg:pl-6">
					<LoanDetails errors={errors} register={register} />
					<ParticipantOpportunities errors={errors} register={register} />
					<NotesOnTheBorrower errors={errors} register={register} />
					<AdditionalInformation errors={errors} register={register} />
				</div>

				<div className="lg:col-span-3 col-span-1 lg:pl-6">
				</div>
			</form>
		</div>
	);
};