import type { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Opportunity } from "@/features/opportunities/types/fields";

interface Props {
	errors: FieldErrors<Opportunity>;
	register: UseFormRegister<Opportunity>;
}

export const DocumentPreview: FC<Props> = () => (
		<div className="h-4/6 rounded-r-2xl bg-gold-300">
		<div className="h-fit m-6 bg-white border-2 border-red-500">

    </div>
    </div>
);
