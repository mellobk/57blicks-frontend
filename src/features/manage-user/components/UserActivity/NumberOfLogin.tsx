import { useEffect, useState } from "react";

import type { AxisChart } from "../../types/chart-types";
import type { FunctionComponent } from "@/types";
import { Icon } from "@/components/ui/Icon";
import type React from "react";
/* eslint-disable no-use-before-define */
import { ResponsiveLine } from "@nivo/line";
import type { UserActivity } from "../../types/logs";
import { formatDate } from "@/utils/date-format";

interface NumberOfLoginProps {
	data: UserActivity;
}

const initialData: Array<AxisChart> = [
	{
		id: "Logins",
		data: [],
	},
];

const NumberOfLogin: React.FC<NumberOfLoginProps> = ({ data }) => {
	const [dataLogins, setDataLogins] = useState<Array<AxisChart>>(initialData);

	useEffect(() => {
		setDataLogins(initialData);
		if (data.numberOfLogins && data.numberOfLogins.length > 0) {
			const axisData: Array<AxisChart> = [
				{
					id: "Logins",
					data: [],
				},
			];

			data.numberOfLogins.map((value) => {
				axisData[0]?.data.push({
					x: value.date.slice(0, 10),
					y: value.logins,
				});
			});
			//axisData[0]?.data.length || 1) * 20 + 500);
			setDataLogins(axisData);
		}
	}, [data]);

	return (
		<div className="h-40 overflow-x-auto relative	">
			<div className="absolute w-40 h-7  bg-green-800 pt-1 pb-1 pl-3 pr-3 rounded-[15px] flex  text-xs text-green-500 font-bold align-middle ">
				<div className="pr-2 align-middle pt-0.5  ">
					<Icon name="hamburger" width="12" color="#00BA35" />
				</div>
				Number of Logins
			</div>
			<div className="absolute top-16 text-2xl font-semibold z-40 ">
				{data.numberOfLogins.length}
			</div>
			<ResponsiveLine
				animate
				tooltip={({ point }): FunctionComponent => {
					return (
						<div className="shadow-lg rounded-[22px] bg-black text-white  align-middle  p-1 w-32	items-center">
							<div className="items-center w-full text-center text-gray-600 text-xs	font-medium	">
								{formatDate(point.data.xFormatted as string)}
							</div>
							<div className="items-center w-full text-center text-sm font-medium	">
								{point.data.yFormatted} Logins
							</div>
						</div>
					);
				}}
				axisBottom={{
					legendOffset: -12,
				}}
				axisLeft={{}}
				curve="basis"
				//width={data[0]?.data.length * 20 + 100}

				enableArea={true}
				areaOpacity={0.1}
				data={dataLogins}
				enablePoints={false}
				enableGridX={false}
				enableGridY={false}
				enableCrosshair={false}
				enablePointLabel
				margin={{
					bottom: 0,
					left: 0,
					right: 0,
					top: 0,
				}}
				useMesh
				xFormat="time:%Y-%m-%d"
				xScale={{
					format: "%Y-%m-%d",
					precision: "day",
					type: "time",
					useUTC: false,
				}}
				yScale={{
					type: "linear",
				}}
			/>
		</div>
	);
};

export default NumberOfLogin;