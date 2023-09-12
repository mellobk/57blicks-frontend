import type { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Opportunity } from "@/features/opportunities/types/fields";

interface Props {
	errors: FieldErrors<Opportunity>;
	register: UseFormRegister<Opportunity>;
}

export const DocumentPreview: FC<Props> = () => (
	<div className="col-span-3 pl-6">
		<div className="max-h-[1000px] overflow-y-auto"></div>
	</div>
);
