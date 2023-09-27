import type { FC } from "react";
import { BreadCrumb } from "@/components/ui/BreadCrumb";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { tabs } from "@/features/opportunities/utils/tabs";

export const PastOpportunities: FC = () => {
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
			<div></div>
		</div>
	);
};
