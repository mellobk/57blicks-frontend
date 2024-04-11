/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { FC, ReactElement } from "react";
/* import {
	getIsSameMonthYear,
	getIsSamePreviousMonthYear,
} from "@/utils/common-functions"; */
import { useEffect, useState } from "react";

import BorrowerNotifications from "../../BorrowerNotifications";
import { Button } from "@/components/ui/Button";
import CustomTableComponent from "./CustomTableComponent";
import type { FundingBreakdown } from "../../../types/api";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/forms/Input";
import { Modal } from "@/components/ui/Modal/Modal";
import { Toggle } from "@/components/ui/Toggle/Toggle";
import { useDebounce } from "@/hooks/debounce";
import moment from "moment";
import type { Loan } from "@/types/api/loan";
import { compareFormatOriginationDate } from "@/utils/formats";

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
	archivedValue?: boolean;
	handleSearchValue?: (value: string) => void;
	handleCheckValue?: (value: any) => void;
	setArchived?: () => void;
	conditionalRowStyles?: any;
	onClickButton?: () => void;
	widthSearch?: string;
	loading?: boolean;
	onRowClicked: (row: FundingBreakdown) => void;
	handleTax: (id: string, data: boolean) => void;
	handleDefault: (id: string, data: string) => void;
}

const dateFormat = "YYYY-MM-DD"; // This is the format of your date strings
const currentDate = moment(); // Current date
const beforeCurrentMonth = moment().subtract(1, "month").month();
export const currentValuePayableInvestor = (loan: Loan) => {
	let data = "0";
	const findMonth =
		loan?.payables &&
		loan?.payables.find((data: { [x: string]: moment.MomentInput }) => {
			// Extract the month and year from the date string
			const dataMonth = moment(data["month"], dateFormat);
			// Check if year and month are the same as the current date
			return (
				dataMonth.year() === currentDate.year() &&
				dataMonth.month() === beforeCurrentMonth
			);
		});

	data = findMonth && findMonth["amount"];

	if (loan?.status === "DEFAULT") {
		data = /* String((Number(value.loan.principal) * 18) / 100 / 12) */ "0";
	}

	return Number.parseFloat(data || "0");
};

export const nextValuePayableInvestor = (loan: Loan) => {
	let data = "0";

	const findMonth =
		loan?.payables &&
		loan?.payables.find((data: { [x: string]: moment.MomentInput }) => {
			// Extract the month and year from the date string
			const dataMonth = moment(data["month"], dateFormat);

			// Check if year and month are the same as the current date
			return (
				dataMonth.year() === currentDate.year() &&
				dataMonth.month() === currentDate.month()
			);
		});

	data = findMonth && findMonth["amount"];

	if (loan?.status === "DEFAULT") {
		data = /* String((Number(value.loan.principal) * 18) / 100 / 12) */ "0";
	}
	return Number.parseFloat(data || "0");
};

export const Table: FC<Props> = ({
	columns = [],
	data,
	children,
	buttonText,
	handleSearchValue,
	handleCheckValue,
	checkedValue = true,
	onClickButton,
	setArchived,
	archivedValue,
	widthSearch = "158px",
	onRowClicked,
	handleTax,
	handleDefault,
}) => {
	const nextLoanDate = new Date();
	nextLoanDate.setMonth(nextLoanDate.getMonth() - 1);

	const currentLoanDate = new Date();
	currentLoanDate.setMonth(currentLoanDate.getMonth() - 2);
	const [visible, setVisible] = useState(false);
	const [stateColumns, setStateColumns] = useState<Array<Column>>(columns);
	const [searchVisible, setSearchVisible] = useState<boolean>(false);
	const [searchMenu, setSearchMenu] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>("");
	const [value, setValue] = useState<string>("");
	const debouncedSearchTerm = useDebounce(value, 1000);

	const handleCloseEye = (id: number): void => {
		const newColumns = stateColumns.map((column, key: number) => {
			if (key === id) {
				return { ...column, omit: !column.omit };
			}
			return column;
		});
		setStateColumns(newColumns);
	};

	useEffect(() => {
		if (searchValue === "") {
			setValue("");
		}
	}, [searchValue]);

	const handleSearch = (value: string): void => {
		setValue(value);
	};

	useEffect(() => {
		if (handleSearchValue) {
			handleSearchValue(debouncedSearchTerm);
			if (value === "") {
				setSearchValue(debouncedSearchTerm);
			} else {
				setSearchValue("");
			}
		}
	}, [debouncedSearchTerm, handleSearchValue]);

	const showAllColumn = (): void => {
		const newColumns = stateColumns.map((data: Column) => {
			return { ...data, omit: false };
		});

		setStateColumns(newColumns);
	};

	// const createFooter = (data: Array<FundingBreakdown>) => {
	// 	const totalRow = data?.length || 0;
	// 	const totalLoanAmount = data?.map((data: FundingBreakdown) => {
	// 		return Number.parseFloat(data.loan.totalLoanAmount || "");
	// 	});
	// 	const totalRegularAmount = data?.map((data: FundingBreakdown) => {
	// 		let regular = getIsSameMonthYear(
	// 			data.loan.originationDate as unknown as string
	// 		)
	// 			? data.loan.prorated
	// 			: data.loan.regular;

	// 		if (data.loan.status === "DEFAULT") {
	// 			regular = String((Number(data.loan.totalLoanAmount) * 18) / 100 / 12);
	// 		}

	// 		return Number.parseFloat(regular || "");
	// 	});

	// 	const totalPreviousAmount = data?.map((data: FundingBreakdown) => {
	// 		const dataDate = getIsSamePreviousMonthYear(
	// 			data.loan.originationDate as unknown as string
	// 		);
	// 		let value = "0";
	// 		if (dataDate === 0) {
	// 			value = data.loan.prorated || "0";
	// 		} else if (dataDate === -1) {
	// 			value = data.loan.regular || "0";
	// 		}
	// 		return Number.parseFloat(value || "");
	// 	});

	// 	const total = totalLoanAmount?.reduce(
	// 		(accumulator, currentValue) => accumulator + currentValue,
	// 		0
	// 	);

	// 	const totalRegular = totalRegularAmount?.reduce(
	// 		(accumulator, currentValue) => accumulator + currentValue,
	// 		0
	// 	);

	// 	const totalPrevious = totalPreviousAmount?.reduce(
	// 		(accumulator, currentValue) => accumulator + currentValue,
	// 		0
	// 	);

	// 	const footerTabData: Array<{
	// 		label: string;
	// 		width: string;
	// 		justify?: string;
	// 	}> = [
	// 		{ label: `Total: ${totalRow}`, width: "650px", justify: "center" },
	// 		{ label: moneyFormat(total), width: "170px" },
	// 		{ label: "", width: "100px" },
	// 		{
	// 			label: "" + moneyFormat(totalRegular),
	// 			width: "200px",
	// 		},
	// 		{ label: "", width: "0px" },
	// 		{ label: "", width: "0px" },
	// 		{ label: "", width: "0px" },
	// 		{ label: "", width: "0px" },
	// 		{ label: "", width: "0px" },
	// 		{ label: "", width: "0px" },
	// 		{ label: "", width: "0px" },
	// 		{ label: "", width: "470px" },
	// 		{ label: moneyFormat(totalPrevious), width: "170px" },
	// 		{ label: moneyFormat(totalRegular), width: "170px" },
	// 	];

	// 	return footerTabData;
	// };

	const createFooterNew = (data: Array<FundingBreakdown>) => {
		const loanCurrentMonth = moment().month();
		const loanNextCurrentMonth = moment().subtract(1, "months").month();

		const totalRow = data?.length || 0;
		const totalLoanAmount = data?.map((data: FundingBreakdown) => {
			return Number.parseFloat(data.loan.principal || "");
		});
		const totalRegularAmount = data?.map((data: FundingBreakdown) => {
			const loanEndDateMoment = moment(data.loan.endDate).month();
			let regular =
				nextValuePayableInvestor(data.loan as any) || data.loan.regular;

			if (data.loan.status === "DEFAULT") {
				regular =
					/* String((Number(data.loan.totalLoanAmount) * 18) / 100 / 12) */ "0";
			}

			if (data.loan.endDate && loanEndDateMoment < loanCurrentMonth) {
				regular = "0";
			}

			return Number.parseFloat(regular?.toString() as any);
		});
		const totalRegularAmountLoan = data?.map((data: FundingBreakdown) => {
			let regular = data.loan.regular;

			if (data.loan.status === "DEFAULT") {
				regular =
					/* String((Number(data.loan.totalLoanAmount) * 18) / 100 / 12) */ "0";
			}
			return Number.parseFloat(regular || "");
		});

		const totalPreviousAmount = data?.map((data: FundingBreakdown) => {
			const loanEndDateMoment = moment(data.loan.endDate).month();
			let value = "0";
			value = currentValuePayableInvestor(data.loan as any).toString();

			if (value === "0") {
				value = data?.loan?.regular || "0";
			}

			if (data.loan.status === "DEFAULT") {
				return Number.parseFloat("0");
			}

			if (data.loan.endDate && loanEndDateMoment < loanNextCurrentMonth) {
				return Number.parseFloat("0");
			}

			if (compareFormatOriginationDate(data?.loan?.originationDate)) {
				return Number.parseFloat("0");
			}
			return Number.parseFloat(value || "");
		});

		const total = totalLoanAmount?.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		);

		const totalRegular = totalRegularAmount?.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		);

		const totalRegularAmountLoanData = totalRegularAmountLoan?.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		);

		const totalPrevious = totalPreviousAmount?.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		);

		const footerTabData = {
			total: total,
			totalRegularLoan: totalRegularAmountLoanData,
			totalRegular: totalRegular,
			totalPrevious: totalPrevious,
			totalRow: totalRow,
		};

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

							<Button
								icon={
									<Icon
										name={`${archivedValue ? "openEye" : "closeEye"}`}
										color={`${archivedValue ? "black" : "white"}`}
										width="20"
									/>
								}
								buttonText={`Archived`}
								className={`${
									archivedValue ? "bg-white text-black" : "bg-black-200"
								}`}
								onClick={setArchived}
							/>
							<BorrowerNotifications
								single={false}
								right="1px"
								top="1px"
								className=""
							/>
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
									onChange={(data): void => {
										handleSearch(data.target.value);
									}}
									clickIcon={(): void => {
										if (handleSearchValue) {
											setSearchValue("");
											setValue("");
											handleSearchValue("");
										}
									}}
									className={`placeholder-gray-400 text-white text-[13px] font-normal font-weight-400 leading-normal w-full ${
										searchVisible || value
											? "bg-black-200  "
											: "bg-transparent "
									}  tracking-wide flex h-3 p-4 items-center self-stretch rounded-md border-none outline-none `}
								/>
							</div>
						</div>
					</div>

					<div
						className={`w-[50px] h-[30px] rounded-[10px] bg-black-100 flex items-center justify-center cursor-pointer hover:bg-white z-10 `}
						onMouseEnter={(): void => {
							setSearchMenu(true);
						}}
						onMouseLeave={(): void => {
							setSearchMenu(false);
						}}
						onClick={(): void => {
							setVisible(true);
						}}
					>
						<Icon
							name="menuTable"
							width="18"
							color={`${searchMenu ? "#0e2130" : "white"}`}
						/>
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
			<div
				className="w-full rounded-3xl bg-white h-full"
				style={{
					overflow: "overlay",

					top: "-20px",
				}}
			>
				<div>
					{data.length > 0 && (
						<CustomTableComponent
							data={data || []}
							handleTax={handleTax}
							handleDefault={handleDefault}
							onRowClicked={onRowClicked}
							totals={createFooterNew(data as Array<FundingBreakdown>)}
						/>
					)}

					{/* <DataTable
						responsive={false}
						columns={stateColumns}
						key={"table-responsive"}
						data={data || []}
						fixedHeader
						progressPending={loading}
						conditionalRowStyles={conditionalRowStyles}
						onRowClicked={onRowClicked}
						pagination
						paginationPerPage={5000}
					/>
					<FooterTable tabs={createFooter(data as Array<FundingBreakdown>)} /> */}
				</div>
			</div>
			<Modal
				visible={visible}
				onHide={(): void => {
					setVisible(false);
				}}
				title="Manage Columns"
				width="20vw"
			>
				<div
					className="flex flex-col items-center justify-between gap-5 "
					style={{ width: "98%" }}
				>
					<div
						className="flex justify-end w-full cursor-pointer text-blue-100 text-[13px]"
						onClick={showAllColumn}
					>
						Show All
					</div>
					{stateColumns?.map((data, key: number) => {
						return (
							<div
								key={key}
								className="flex items-center justify-between w-full"
							>
								<div className="flex items-center justify-center gap-2">
									<Icon name="column" width="16" color="black" />
									{data?.name}
								</div>

								<div
									onClick={(): void => {
										handleCloseEye(key);
									}}
									className="cursor-pointer"
								>
									<Icon
										name={data?.omit ? "closeEye" : "openEye"}
										width="18"
										color="black"
									/>
								</div>
							</div>
						);
					})}
				</div>
			</Modal>
		</div>
	);
};
