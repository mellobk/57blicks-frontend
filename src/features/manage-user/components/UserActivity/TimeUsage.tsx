import { Icon } from "@/components/ui/Icon";
import React from "react";

interface TimeUsageProps {}

const TimeUsage: React.FC<TimeUsageProps> = () => {
	return (
		<div className="relative h-40">
			<div className="absolute w-40 h-7  bg-green-800 pt-1 pb-1 pl-3 pr-3 rounded-[15px] flex  text-xs text-green-500 font-bold align-middle ">
				<div className="pr-2 align-middle pt-0.5  ">
					<Icon name="hamburger" width="12" color="#00BA35" />
				</div>
				Time usage
			</div>
			<div className="absolute top-16 text-2xl font-semibold z-40 "></div>
		</div>
	);
};

export default TimeUsage;
