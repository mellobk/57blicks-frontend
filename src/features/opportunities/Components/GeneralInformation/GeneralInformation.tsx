import type { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import {TextArea} from "@/components/forms/TextArea";
import { Title } from "@/components/ui/Title/Title";
import { Opportunity } from "@/features/opportunities/types/fields";

interface Props {
	errors: FieldErrors<Opportunity>;
	register: UseFormRegister<Opportunity>;
}

export const GeneralInformation: FC<Props> = ({ errors, register }) => (
	<div className="col-span-2">
		<Title text="General Information" />
		<Input
			error={errors?.postTitle?.message}
			label="Post Title"
			placeholder="Enter Post Title"
			register={register("postTitle")}
			wrapperClassName="mt-6"
		/>
		<Input
			error={errors?.investmentCollateral?.message}
			label="Investment Collateral"
			placeholder="Enter Investment Collateral"
			register={register("investmentCollateral")}
			wrapperClassName="mt-6"
			required
		/>
		<Input
			error={errors?.googleDriveLink?.message}
			label="Google Drive Link"
			placeholder="Enter Google Drive Link"
			register={register("googleDriveLink")}
			wrapperClassName="mt-6"
			required
		/>
		<Input
			error={errors?.googleDriveLink?.message}
			label="Choose File"
			placeholder="Choose File"
			register={register("googleDriveLink")}
			wrapperClassName="mt-6"
			required
		/>
		<TextArea
			error={errors?.investmentSummary?.message}
			label="Investment Summary"
			placeholder="Limit 2000 Characters"
			register={register("investmentSummary")}
			wrapperClassName="mt-6"
			required
		/>
	</div>
);
