import type { DataEntry } from "../../types/chart-types";
import { Icon } from "@/components/ui/Icon";
import type React from "react";
import { ResponsiveBar } from "@nivo/bar";
import type { UserActivity } from "../../types/logs";
import { fillMissingDates } from "./UserActivityUtils";
import { formatDate } from "@/utils/date-format";

interface TimeUsageProps {
	data: UserActivity;
	date: Date;
}

const TimeUsage: React.FC<TimeUsageProps> = ({ data, date }) => {
	const newData = fillMissingDates(
		data.userActivity as unknown as Array<DataEntry>,
		date
	);

	return (
		<div className="relative  w-full " style={{ height: "250px" }}>
			<div className="absolute w-40 h-7  bg-green-800 pt-1 pb-1 pl-3 pr-3 rounded-[15px] flex  text-xs text-green-500 font-bold align-middle ">
				<div className="pr-2 align-middle pt-0.5  ">
					<Icon name="time-usage" width="12" color="#00BA35" />
				</div>
				Time of Usage
			</div>
			<div className="absolute top-16 text-2xl font-semibold z-40 "></div>

			<ResponsiveBar
				animate={true}
				data={newData}
				keys={["hour", "shadow"]}
				indexBy="date"
				margin={{ top: 50, right: 10, bottom: 50, left: 30 }}
				groupMode="stacked"
				valueScale={{ type: "linear" }}
				indexScale={{ type: "band", round: true }}
				colors={{ scheme: "nivo" }}
				colorBy="id"
				tooltip={({ data }) => (
					<div className="shadow-lg rounded-[22px] bg-black text-white  align-middle  p-1 w-32	items-center">
						<div className="items-center w-full text-center text-gray-600 text-xs	font-medium	">
							{data.hour}
							hours
						</div>
						<div className="items-center w-full text-center text-sm font-medium	">
							{formatDate(data.fullDate)}
						</div>
					</div>
				)}
				borderRadius={10}
				borderColor={{
					from: "color",
					modifiers: [["opacity", 3]],
				}}
				axisTop={null}
				axisRight={null}
				padding={0.5}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: -25,
					legend: "",
					legendPosition: "middle",
					legendOffset: 32,
				}}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: "date",
					legendPosition: "middle",
					legendOffset: -40,
				}}
				enableGridY={false}
				enableLabel={false}
				labelSkipWidth={12}
				labelSkipHeight={12}
				labelTextColor={{
					from: "color",
					modifiers: [["darker", "0.7"]],
				}}
				legends={[]}
				motionConfig="stiff"
				role="application"
			/>
		</div>
	);
};

export default TimeUsage;
