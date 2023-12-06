import { Icon } from "@/components/ui/Icon";
import type { FC } from "react";

interface TimeUsageProps {
	opportunities: number;
	data: number;
	isApproved: boolean;
	loading?: boolean;
}

const UserOpportunities: FC<TimeUsageProps> = ({
	opportunities,
	data,
	isApproved,
	loading,
}) => {
	return (
		<div className="h-40 overflow-x-auto relative flex flex-col items-center">
			{loading ? (
				<Icon name="loading" />
			) : (
				<>
					<div
						className={`w-[80%] h-7  ${
							isApproved
								? "bg-green-800 text-green-500"
								: "bg-red-50 text-red-500"
						} pt-1 pb-1 pl-3 pr-3 rounded-[15px] flex justify-center  text-xs  font-bold  mb-10`}
					>{`${
						isApproved
							? "Opportunities Accepted by Investor"
							: "Opportunities Rejected by Investor"
					}`}</div>
					<div className="w-[80%] flex items-center justify-center gap-3">
						<span className=" text-[35px]">{data}</span>{" "}
						<span className="text-[20px] text-gray-40">/</span>
						<span className="text-[20px] text-gray-40">{` ${opportunities}`}</span>
					</div>
				</>
			)}
		</div>
	);
};

export default UserOpportunities;
