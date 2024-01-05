import { formatDateString, getLabel } from "@/utils/common-functions";

import type { FC } from "react";
import useLocalTimeZoneFormatter from "@/hooks/use-local-time-zone-formatter";

interface NotificationProps {
	text?: string;
	userFullName?: string;
	state?: string;
	date?: string;
	handleOnClick?: () => void;
}

export const Notification: FC<NotificationProps> = ({
	text,
	userFullName,
	state,
	date = "",
	handleOnClick,
}) => {
	return (
		<div
			className="flex  justify-between items-center  w-full h-full gap-3 px-2 cursor-pointer hover:bg-gray-1400 py-2 rounded-xl"
			onClick={handleOnClick}
		>
			<div>
				{" "}
				<div className="w-[30px] h-[30px] flex items-center justify-center bg-blue-300 rounded-full ">
					<div className="text-white text-[12px]">
						{getLabel(`${userFullName || ""} `)}
					</div>
				</div>
			</div>
			<div className="w-full">
				<div>{text}</div>
				<div className="text-gray-1500 text-[12px]">
					{formatDateString(useLocalTimeZoneFormatter(date))}
				</div>
			</div>
			{state === "SENT" && (
				<div className="">
					<div className="w-[8px] h-[8px] flex items-center justify-center bg-red-500 rounded-full "></div>
				</div>
			)}
		</div>
	);
};
