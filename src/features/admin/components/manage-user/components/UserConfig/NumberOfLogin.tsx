import { type FC, ReactElement, useEffect, useState } from "react";

import type { AxisChart } from "../../types/chart-types.ts";
import { Icon } from "@/components/ui/Icon";
import { ResponsiveLine } from "@nivo/line";
import { dateFormat } from "@/utils/formats.ts";
import type { UserActivity } from "../../types/logs.ts";

interface NumberOfLoginProps {
	data: UserActivity;
}

const initialData: Array<AxisChart> = [
	{
		id: "Logins",
		data: [],
	},
];

const NumberOfLogin: FC<NumberOfLoginProps> = ({ data }) => {
	const [dataLogins, setDataLogins] = useState<Array<AxisChart>>(initialData);
	const [numberOfLogins, setNumberOfLogins] = useState<number>(0);
	const [marginTop, setMarginTop] = useState<number>(0);

	useEffect(() => {
		setDataLogins(initialData);
		handleLogins();
	}, [data]);

	const handleLogins = (): void => {
		let logins = 0;

		const axisData: Array<AxisChart> = [
			{
				id: "Logins",
				data: [],
			},
		];

		if (data.numberOfLogins && data.numberOfLogins.length > 0) {
			data.numberOfLogins.map((value) => {
				logins += Number.parseInt(value.logins);
				axisData[0]?.data.push({
					x: value.date.slice(0, 10),
					y: value.logins,
				});
			});
		}

		if (data.numberOfLogins.length === 1) {
			//add one data with a day before and after with 0 logins
			const date = axisData[0]?.data[0]?.x ?? "";

			const dateBefore = new Date(date ?? "");
			const dateAfter = new Date(date ?? "");
			dateBefore.setDate(dateBefore.getDate() - 1);
			dateAfter.setDate(dateAfter.getDate() + 1);

			axisData[0]?.data.splice(0, 0, {
				x: dateBefore.toISOString().slice(0, 10),
				y: 0,
			});

			axisData[0]?.data.push({
				x: dateAfter.toISOString().slice(0, 10),
				y: 0,
			});
			setMarginTop(50);
		}
		setNumberOfLogins(logins);
		setDataLogins(axisData);
	};

	return (
		<div className="h-40 overflow-x-auto relative	">
			<div className="absolute w-40 h-7  bg-green-800 pt-1 pb-1 pl-3 pr-3 rounded-[15px] flex  text-xs text-green-500 font-bold align-middle ">
				<div className="pr-2 align-middle pt-0.5  ">
					<Icon name="timeUsage" width="12" color="#00BA35" />
				</div>
				Number of Logins
			</div>
			<div className="absolute top-16 text-2xl font-semibold z-40 ">
				{numberOfLogins}
			</div>

			<ResponsiveLine
				animate
				tooltip={({ point }): ReactElement => {
					return (
						<div className="shadow-lg rounded-[22px] bg-black text-white  align-middle  p-1 w-32	items-center">
							<div className="items-center w-full text-center text-gray-600 text-xs	font-medium">
								{dateFormat(point.data.xFormatted as string)}
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
					top: marginTop,
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
