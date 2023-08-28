/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { FC, ReactElement } from "react";
// eslint-disable-next-line no-duplicate-imports
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import "./Table.css";

import { Button } from "@/components/ui/Button";
import { Input } from "../Input";
import { useDebounce } from "@/hooks/debounce";
import { Toggle } from "@/components/ui/Toggle/Toggle";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal/Modal";

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
	onClickButton: () => void;
	widthSearch?: string;
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
}) => {
	const [visible, setVisible] = useState(false);
	const [stateColumns, setStateColumns] = useState<Array<Column>>(columns);
	const [_, setSearchVisible] = useState<boolean>(false);
	const [searchMenu, setSearchMenu] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>("");
	const [value, setValue] = useState<string>("");
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

	const debouncedSearchTerm = useDebounce(value, 1000);

	useEffect(() => {
		if (debouncedSearchTerm !== "") {
			if (handleSearchValue) {
				handleSearchValue(debouncedSearchTerm);
			}
			setSearchValue(debouncedSearchTerm);
		}
	}, [debouncedSearchTerm, handleSearchValue]);
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
							onMouseEnter={(): void => {
								setSearchVisible(true);
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
							<Input
								type="text"
								value={value}
								placeholder="Search"
								iconColor="white"
								iconWidth={`${searchValue ? "12" : "20"}`}
								iconName={`${searchValue ? "wrong" : "search"}`}
								onChange={(data): void => {
									handleSearch(data.target.value);
								}}
								clickIcon={(): void => {
									setSearchValue("");
								}}
								className={`placeholder-gray-400 text-white text-[13px] font-normal font-weight-400 leading-normal bg-black-200  tracking-wide flex w-[200px] h-3 p-4 items-center self-stretch rounded-md border-none outline-none `}
							/>
						</div>
						{/* 				<div
							style={{ position: "relative" }}
							className={`h-[30px] rounded-[10px] flex items-center justify-center cursor-pointer ${
								searchVisible || searchValue ? "not-visible" : "visible"
							}`}
							onClick={(): void => {
								setSearchVisible(true);
							}}
						>
							<Icon
								name="search"
								width="20"
								color={`${searchVisible ? "#7c8991" : "#7c8991"}`}
							/>
						</div> */}
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

					<div className="">
						<Button
							onClick={onClickButton}
							text={buttonText}
							className="text-primary-500 w-[100%]  bg-white h-8 p-2 border-none flex justify-center items-center rounded-[16px] text-12 font-bold"
							deepClassName=" w-full flex flex-row items-center justify-center  text-[13px] text-center"
						/>
					</div>
				</div>
			</div>
			<div className="h-full w-full rounded-3xl bg-white">
				<div className="rounded-3xl">
					<DataTable
						columns={stateColumns}
						data={data}
						conditionalRowStyles={conditionalRowStyles}
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
