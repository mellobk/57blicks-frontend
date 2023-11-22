/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePieCanvas } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const PropertyInsurance = ({ data /* see data tab */ }: any) => (
	<ResponsivePieCanvas
		data={data}
		margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
		innerRadius={0.5}
		padAngle={0.7}
		cornerRadius={3}
		activeOuterRadiusOffset={8}
		colors={{ scheme: "paired" }}
		borderColor={{
			from: "color",
			modifiers: [["darker", 0.6]],
		}}
		arcLinkLabelsSkipAngle={10}
		arcLinkLabelsTextColor="#333333"
		arcLinkLabelsThickness={2}
		arcLinkLabelsColor={{ from: "color" }}
		arcLabelsSkipAngle={10}
		arcLabelsTextColor="#333333"
		legends={[
			{
				anchor: "right",
				direction: "column",
				justify: false,
				translateX: 140,
				translateY: 0,
				itemsSpacing: 2,
				itemWidth: 60,
				itemHeight: 14,
				itemTextColor: "#999",
				itemDirection: "left-to-right",
				itemOpacity: 1,
				symbolSize: 14,
				symbolShape: "circle",
			},
		]}
	/>
);

export default PropertyInsurance as any;