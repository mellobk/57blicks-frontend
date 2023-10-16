import type { FC, ReactElement } from "react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle/Toggle";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal/Modal";
import { useDebounce } from "@/hooks/debounce";
import "./Table.css";
import { FooterTable } from "@/components/ui/FooterTabs/FooterTabs";
import type { FundingBreakdown } from "../../types/api";
import { formatCurrency } from "@/utils/common-funtions";

interface Column {
	name?: string;
	selector?: (row: any) => any;
	sortable?: boolean;
	omit?: boolean;
}

interface TableProps {
	columns?: Array<Column>;
	data?: any;
	children?: ReactElement;
	buttonText?: string;
	checkedValue?: boolean;
	handleSearchValue?: (value: string) => string;
	handleCheckValue?: (value: any) => void;
	conditionalRowStyles?: any;
	onClickButton?: () => void;
	widthSearch?: string;
	loading?: boolean;
	onRowClicked?: (row: FundingBreakdown) => void;
}

export const ServicingTable: FC<TableProps> = ({
	columns = [],
	data,
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
			{ label: formatCurrency(total), width: "150px" },
			{ label: "", width: "100px" },
			{ label: formatCurrency(totalRegular), width: "200px" },
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
									checkedClassName="bg-green-500"
									checkLabel="Show Disabled"
									checkLabelClassName="text-white text-[13px]"
									onChecked={(data): void => {
										if (handleCheckValue) {
											handleCheckValue(data);
										}
									}}
									checked={checkedValue}
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
			<div className="h-full w-full">
				<div
					className="h-[100%] w-full rounded-3xl bg-white flex flex-col justify-between "
					style={{ overflow: "overlay" }}
				>
					<div className="rounded-3xl h-[100%] overflow-auto">
						<DataTable
							responsive={false}
							columns={stateColumns}
							data={data || []}
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
