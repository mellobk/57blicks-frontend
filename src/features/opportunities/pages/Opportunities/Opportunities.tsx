import type { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoanSchema } from "@/features/create-loan/schemas/LoanSchema.ts";
import { DocumentPreview } from "@/features/opportunities/Components/DocumentPreview/DocumentPreview";
import { GeneralInformation } from "@/features/opportunities/Components/GeneralInformation/GeneralInformation";
import { LoanDetails } from "@/features/opportunities/Components/LoanDetails/LoanDetails";
import { Opportunity } from "@/features/opportunities/types/fields.ts";

export const Opportunities: FC = () => {
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
		<form
			className="grid grid-cols-7 gap-6 divide-x divide-gray-200 bg-white rounded-3xl w-screen p-6 h-full overflow-y-auto"
			onSubmit={handleSubmit(onSubmit)}
		>
			<GeneralInformation errors={errors} register={register} />

			<LoanDetails errors={errors} register={register} />

			<DocumentPreview errors={errors} register={register} />
		</form>
	);
};
