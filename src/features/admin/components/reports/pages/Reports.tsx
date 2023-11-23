/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import PropertyInsurance from "../components/PropertyInsurance";
import Csv from "@/assets/images/png/Csv.png";
import Xlsx from "@/assets/images/png/Xlsx.png";

export const Reports: FC = () => {
	const data = [
		{
			id: "scala",
			label: "scala",
			value: 537,
			color: "hsl(110, 70%, 50%)",
		},
		{
			id: "php",
			label: "php",
			value: 152,
			color: "hsl(344, 70%, 50%)",
		},
		{
			id: "go",
			label: "go",
			value: 132,
			color: "hsl(163, 70%, 50%)",
		},
		{
			id: "lisp",
			label: "lisp",
			value: 417,
			color: "hsl(102, 70%, 50%)",
		},
		{
			id: "erlang",
			label: "erlang",
			value: 589,
			color: "hsl(37, 70%, 50%)",
		},
	];

	return (
		<div className="flex w-full bg-white justify-center ">
			<div className="flex flex-col items-center  w-[50%] h-[30vh] bg-white p-2">
				<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3">
					<div>Interest Collection Report</div>
					<div className="flex gap-2">
						<div className="w-[35px] h-[35px] bg-white flex items-center justify-center rounded-xl">
							<img src={Csv} alt="DKC Csv" />
						</div>

						<div className="w-[35px] h-[35px] bg-white flex items-center justify-center rounded-xl">
							<img src={Xlsx} alt="DKC Xlsx" />
						</div>
					</div>
				</div>
				<PropertyInsurance data={data} />
			</div>
			<div className="flex flex-col items-center  w-[50%] h-[30vh] bg-white p-2">
				<div className="flex items-center justify-between w-full px-10 bg-gray-200 p-3">
					<div>Property Insurance</div>
					<div className="flex gap-2">
						<div className="w-[35px] h-[35px] bg-white flex items-center justify-center rounded-xl">
							<img src={Csv} alt="DKC Csv" />
						</div>

						<div className="w-[35px] h-[35px] bg-white flex items-center justify-center rounded-xl">
							<img src={Xlsx} alt="DKC Xlsx" />
						</div>
					</div>
				</div>
				<PropertyInsurance data={data} />
			</div>
		</div>
	);
};
