import type { FC } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FileUpload } from "@/components/forms/FileUpload";
import { Input } from "@/components/forms/Input";
import { TextArea } from "@/components/forms/TextArea";
import { Title } from "@/components/ui/Title/Title";
import type { Opportunity } from "@/features/admin/components/opportunities/types/fields";

interface Props {
	errors: FieldErrors<Opportunity>;
	register: UseFormRegister<Opportunity>;
}

export const GeneralInformation: FC<Props> = ({ errors, register }) => (
	<>
		<Title text="General Information" />
		<Input
			data-testid="general-information-post-title"
			error={errors?.postTitle?.message}
			label="Post Title"
			maxLength={50}
			placeholder="Enter Post Title"
			register={register("postTitle")}
			wrapperClassName="mt-6"
		/>
		<Input
			data-testid="general-information-investment-collateral"
			error={errors?.investmentCollateral?.message}
			label="Investment Collateral"
			maxLength={75}
			placeholder="Enter Investment Collateral"
			register={register("investmentCollateral")}
			wrapperClassName="mt-6"
			required
		/>
		<Input
			data-testid="general-information-google-drive-link"
			error={errors?.googleDriveLink?.message}
			label="Google Drive Link"
			maxLength={255}
			placeholder="Enter Google Drive Link"
			register={register("googleDriveLink")}
			wrapperClassName="mt-6"
			required
		/>
		<FileUpload
			data-testid="general-information-image"
			accept="image/*"
			error={errors?.image?.message}
			label="Choose File"
			placeholder="Choose File"
			register={register("image")}
			wrapperClassName="mt-6"
			required
		/>
		<TextArea
			data-testid="general-information-investment-summary"
			error={errors?.investmentSummary?.message}
			label="Investment Summary"
			maxLength={1000}
			placeholder="Limit 1000 Characters"
			register={register("investmentSummary")}
			wrapperClassName="mt-6"
			required
		/>
	</>
);
