import { type FC, type ReactElement, useState } from "react";
import DataTable from "react-data-table-component";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle/Toggle";
import { FooterTable } from "@/components/ui/FooterTabs/FooterTabs";
import type { FundingBreakdown } from "../../../types/api";
import { moneyFormat } from "@/utils/formats";

import "./Table.css";

interface Column {
	name?: string;
	selector?: (row: any) => any;
	sortable?: boolean;
	omit?: boolean;
}

interface Props {
	columns?: Array<Column>;
	data?: any;
	children?: ReactElement;
	buttonText?: string;
	checkedValue?: boolean;
	handleSearchValue: (value: string) => void;
	handleCheckValue?: (value: any) => void;
	conditionalRowStyles?: any;
	onClickButton?: () => void;
	widthSearch?: string;
	loading?: boolean;
	onRowClicked?: (row: FundingBreakdown) => void;
}

export const Table: FC<Props> = ({
	columns = [],
	data = [],
	children,
	buttonText,
	handleSearchValue,
	handleCheckValue,
	checkedValue = true,
	conditionalRowStyles,
	onClickButton,
	widthSearch = "158px",
	loading,
	onRowClicked,
}) => {
	const [searchVisible, setSearchVisible] = useState<boolean>(false);
	const [value, setValue] = useState<string>("");

	const createFooter = (data: Array<FundingBreakdown>) => {
		const totalRow = data?.length || 0;
		const totalLoanAmount = data?.map((data: FundingBreakdown) => {
			return Number.parseFloat(data.loan.totalLoanAmount);
		});
		const totalRegularAmount = data?.map((data: FundingBreakdown) => {
			return Number.parseFloat(data.regular);
		});

		const total = totalLoanAmount?.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		);

		const totalRegular = totalRegularAmount?.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		);

		const footerTabData: Array<{
			label: string;
			width: string;
			justify?: string;
		}> = [
			{ label: `total: ${totalRow}`, width: "730px", justify: "center" },
			{ label: moneyFormat(total), width: "150px" },
			{ label: "", width: "100px" },
			{ label: moneyFormat(totalRegular), width: "200px" },
		];

		return footerTabData;
	};

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex justify-between items-center w-full  bg-primary-500 px-4 mb-2">
				{children}
				<div
					className={`flex justify-end gap-2 items-center bg-primary-500 h-[50px]`}
					style={{ position: "relative", width: "180px" }}
				>
					<div
						className="flex justify-end gap-1 items-center"
						style={{ position: "absolute" }}
					>
						<div
							className="flex gap-2 justify-end"
							style={{
								position: "relative",
								right: widthSearch,
								width: "350px",
								zIndex: "0",
							}}
						>
							{handleCheckValue && (
								<Toggle
									checked={checkedValue}
									checkedClassName="bg-green-500"
									label="Show Disabled"
									labelClassName="text-white text-[13px]"
									onChecked={(data): void => {
										if (handleCheckValue) {
											handleCheckValue(data);
										}
									}}
								/>
							)}
							<div
								className={`${
									searchVisible || value
										? "w-[200px] bg-transparent transition duration-500"
										: "bg-transparent  w-[30px] transition duration-500 "
								} `}
								onMouseEnter={(): void => {
									setSearchVisible(true);
								}}
								onMouseLeave={(): void => {
									setSearchVisible(false);
								}}
							>
								<Input
									type="text"
									value={value}
									placeholder="Search"
									iconColor="white"
									iconWidth={`${value ? "12" : "20"}`}
									iconName={`${value ? "wrong" : "search"}`}
									onChange={(data) => handleSearchValue(data.target.value)}
									clickIcon={() => handleSearchValue("")}
									className={`placeholder-gray-400 text-white text-[13px] font-normal font-weight-400 leading-normal w-full ${
										searchVisible || value
											? "bg-black-200  "
											: "bg-transparent "
									}  tracking-wide flex h-3 p-4 items-center self-stretch rounded-md border-none outline-none `}
								/>
							</div>
						</div>
					</div>

					{buttonText && (
						<div className="">
							<Button
								buttonText={buttonText}
								className="text-primary-500 w-[100%]  bg-white h-8 p-2 border-none flex justify-center items-center rounded-[16px] text-12 font-bold"
								deepClassName=" w-full flex flex-row items-center justify-center  text-[13px] text-center"
								onClick={onClickButton}
							/>
						</div>
					)}
				</div>
			</div>
			<div className="h-full w-full">
				<div
					className="h-[100%] w-full rounded-3xl bg-white flex flex-col justify-between "
					style={{ overflow: "overlay" }}
				>
					<div className="rounded-3xl h-[100%] overflow-auto">
						<DataTable
							responsive={false}
							columns={columns}
							data={data}
							className="h-[50vh]"
							fixedHeader
							progressPending={loading}
							conditionalRowStyles={conditionalRowStyles}
							onRowClicked={onRowClicked}
						/>
					</div>
					<FooterTable tabs={createFooter(data as Array<FundingBreakdown>)} />
				</div>
			</div>
		</div>
	);
};
