/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react-refresh/only-export-components */
import type { FC } from "react";
import { useState } from "react";

import Csv from "@/assets/images/png/Csv.png";
import Xlsx from "@/assets/images/png/Xlsx.png";
import { Modal } from "@/components/ui/Modal";
import DataTable from "react-data-table-component";
import { ResponsivePieCanvas } from "@nivo/pie";

interface CreatePermissionProps {
	title?: string;
	columns?: any;
	dataReport?: any;
	dataTable?: any;
	downloadReport?: () => unknown;
	downloadXlsxReport?: () => unknown;
	isLoading?: boolean;
	children?: JSX.Element;
}

const ReportTable: FC<CreatePermissionProps> = ({
	title,
	columns,
	dataTable,
	dataReport,
	downloadReport,
	downloadXlsxReport,
	isLoading,
	children,
}) => {
	const [openInsurance, setOpenInsurance] = useState(false);

	return (
		<>
			<div className="cursor-pointer w-full">
				<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3 g-3 ">
					<div
						className="font-bold text-[13px]"
						onClick={() => {
							setOpenInsurance(true);
						}}
					>
						{title}
					</div>
					<div className="flex gap-2 ml-2" onClick={downloadReport}>
						<div className="flex gap-2 ml-2">
							<div className="w-[35px] h-[35px] bg-white flex items-center justify-center rounded-xl">
								<img src={Csv} alt="DKC Csv" />
							</div>

							<div
								className="w-[35px] h-[35px] bg-green-1100 flex items-center justify-center rounded-xl"
								onClick={downloadXlsxReport}
							>
								<img src={Xlsx} alt="DKC Xlsx" />
							</div>
						</div>

						<ResponsivePieCanvas
							data={dataReport}
							margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
							innerRadius={0.5}
							padAngle={0.7}
							cornerRadius={3}
							activeOuterRadiusOffset={8}
							colors={{ scheme: "paired" }}
							borderColor={{
								from: "color",
								modifiers: [["opacity", 0.6]],
							}}
							arcLinkLabelsSkipAngle={10}
							arcLinkLabelsTextColor="#333333"
							arcLinkLabelsThickness={2}
							arcLinkLabelsColor={{ from: "color" }}
							arcLabelsSkipAngle={10}
							arcLabelsTextColor="white"
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
					</div>
				</div>
				<div className="flex w-full h-[80px] justify-center items-center font-bold  text-[28px]">
					{children}
				</div>
				{dataTable && (
					<div
						onClick={() => {
							setOpenInsurance(true);
						}}
					>
						<DataTable
							columns={columns}
							data={dataTable?.slice(0, 3) || []}
							progressPending={isLoading}
						/>
					</div>
				)}
			</div>
			<Modal
				visible={openInsurance}
				onHide={() => {
					setOpenInsurance(false);
				}}
				title="Default Tax Loans"
			>
				<DataTable
					columns={columns}
					data={dataTable || []}
					progressPending={isLoading}
				/>
			</Modal>
		</>
	);
};

export default ReportTable;
