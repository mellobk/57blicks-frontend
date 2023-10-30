import type { FC } from "react";
import PDF from "@/assets/images/png/PDF.png";
import { Subtitle } from "@/features/admin/components/opportunities/components/PastOpportunities/Subtitle/Subtitle";

interface Props {
	filename: string;
	selected: boolean;
}

export const Name: FC<Props> = ({ filename, selected }) => (
	<div className="flex flex-row justify-between items-center">
		<Subtitle subtitle={filename} selected={selected} />

		<div className="flex flex-row gap-1 items-center h-fit bg-red-500/[.16] px-2 py-1 rounded-2xl justify-between font-inter text-[8px] text-red-500 leading-[10px] tracking-[-0.4px] font-semibold">
			<img height="10px" width="10px" src={PDF} alt="PDF Logo" />
			PDF
		</div>
	</div>
);
