import "./Table.css";

import type { FC, ReactElement } from "react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import DataTable from "react-data-table-component";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/forms/Input";
import { Modal } from "@/components/ui/Modal/Modal";
import { Toggle } from "@/components/ui/Toggle/Toggle";
import { useDebounce } from "@/hooks/debounce";

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
	onRowClicked?: (row: unknown) => void;
}

export const Table: FC<TableProps> = ({
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

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex justify-between items-center w-full  bg-primary-500 px-4 mb-2">
				{children}
				<div
					className={`flex justify-end gap-2 items-center bg-primary-500 h-[50px]`}
					style={{ position: "relative", width: "180px" }}
				>
					<div
						className="flex justify-end gap-1 items-center w-0"
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
									labelClassName="text-white text-[13px] w-32"
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
								variant={"white"}
								onClick={onClickButton}
							/>
						</div>
					)}
				</div>
			</div>
			<div className="h-full w-full rounded-3xl bg-white">
				<div className="rounded-3xl h-[85vh] overflow-auto">
					<DataTable
						fixedHeader
						columns={stateColumns}
						data={data}
						className="h-[85vh]"
						progressPending={loading}
						conditionalRowStyles={conditionalRowStyles}
						onRowClicked={onRowClicked}
					/>
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
