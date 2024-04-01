/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type FC, useEffect, useState, type MutableRefObject } from "react";

import {
	ApprovalStateType,
	type Ledger,
	type LedgerFormValues,
} from "../types";
import type {
	Control,
	FieldArrayWithId,
	FieldErrors,
	UseFormRegister,
} from "react-hook-form";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { InputNumber } from "@/components/forms/InputNumber";
import { dateWithFormatUS, moneyFormat } from "@/utils/formats";
import { DatePicker } from "@/components/ui/DatePicker";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import type { Loan } from "@/features/admin/components/servicing/types/api";
import moment from "moment";
import { columnWidth } from "./header/column-width";
import DeleteLedger from "./DeleteLedger";
import EditLedger from "./EditLedger";
import { Modal } from "@/components/ui/Modal";
import { Table } from "@/components/ui/Table";
import type { TableColumn } from "react-data-table-component";
import type { FundingBreakdown as FundingBreakdownType } from "@/types/api/funding-breakdown";
import type { ParticipationBreakdown } from "@/types/api/participation-breakdown";
import { Cell } from "@/components/table/Cell";
interface LedgerAddProps {
	field: FieldArrayWithId<Ledger>;
	index: number;
	errors: FieldErrors<LedgerFormValues>;
	control: Control<LedgerFormValues>;
	data: LedgerFormValues;
	loan: Loan;
	setLlcPayment?: (data: any) => void;
	setLlcHoldbackPayment?: (data: any) => void;
	handleSetValue: (
		field: string,
		value: string | number | boolean,
		index: number
	) => void;
	handleSetDate: (field: string, value: Date, index: number) => void;
	handleSetMonth: (field: string, value: Date, index: number) => void;
	handleEdit: (
		field: string,
		value: string | number | boolean,
		index: number
	) => void;
	handleDeleteLedger?: (id: string) => void;
	refetchLedgers?: () => void;
	register: UseFormRegister<LedgerFormValues>;
	handleRemove: (index: number, id: string) => void;
	handleOpenModal: (value: boolean, index: number) => void;
	lastScrollAdd: MutableRefObject<HTMLElement | null> | null;
}

export const LedgerAdd: FC<LedgerAddProps> = ({
	index,
	errors,
	data,
	loan,
	lastScrollAdd,
	handleSetValue,
	handleSetDate,
	handleEdit,
	register,
	handleRemove,
	handleOpenModal,
	setLlcPayment,
	setLlcHoldbackPayment,
}) => {
	const [dataLedgers, setDataLedgers] = useState<Ledger>();
	const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
	const [selectedIndex, setSelectedIndex] = useState<number>();

	const [tableData, setTableData] = useState([]);
	const [tableDataHoldBack, setTableDataHoldBack] = useState([]);
	const [openInvestorsPayments, setOpenInvestorsPayments] =
		useState<boolean>(false);
	const [openHoldBackPayments, setOpenHoldBackPayments] =
		useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<string>();
	const PrincipalFlag =
		loan?.participationBreakdowns &&
		loan?.participationBreakdowns?.length > 0 &&
		dataLedgers &&
		dataLedgers.typeOfPaymentDescription === "Principal";

	const constructionHoldBackFlag =
		loan?.participationBreakdowns &&
		loan?.participationBreakdowns?.length > 0 &&
		dataLedgers &&
		dataLedgers.typeOfPaymentDescription === "Construction Holdback";

	const handlePayments = (id: string, value: string, investorId: string) => {
		const newTableData = tableData.map((data: any) => {
			if (data.id === id) {
				return {
					...data,
					paymentValue: value,
					amountPrevious: data.amount,
				};
			}

			if (data?.investor?.id === investorId) {
				return {
					...data,
					paymentValue: value,
					amountPrevious: data.amount,
				};
			}
			return { ...data };
		});

		const amountData = newTableData
			.filter(
				(data) => data.type !== "Servicing" && data.type !== "YieldSpread"
			)
			.reduce(
				(accumulator: number, payment) =>
					accumulator + Number.parseFloat(payment.paymentValue || "0"),
				0
			);

		handleSetValue(`debit`, amountData.toString(), index);

		setTableData(newTableData as any);
		if (setLlcPayment) {
			setLlcPayment(newTableData as any);
		}
	};

	const handleHoldBackPayments = (id: string, value: string) => {
		const newTableData = tableDataHoldBack.map((data: any) => {
			if (data.id === id) {
				return {
					...data,
					holdBackPaymentValue: value,
				};
			}
			return { ...data };
		});

		const amountData = newTableData
			.filter(
				(data) => data.type !== "Servicing" && data.type !== "YieldSpread"
			)
			.reduce(
				(accumulator: number, payment) =>
					accumulator + Number.parseFloat(payment.holdBackPaymentValue || "0"),
				0
			);

		handleSetValue(`debit`, amountData.toString(), index);

		setTableDataHoldBack(newTableData as any);
		if (setLlcHoldbackPayment) {
			setLlcHoldbackPayment(newTableData as any);
		}
	};

	useEffect(() => {
		const data = [
			...(loan?.fundingBreakdowns || []),
			...(loan?.participationBreakdowns || []),
		].map((data) => {
			return { ...data, paymentValue: 0 };
		});

		const dataHoldBack = [
			...(loan?.fundingBreakdowns || []),
			...(loan?.participationBreakdowns || []),
		].map((data) => {
			return { ...data, holdBackPaymentValue: 0 };
		});

		setTableData(data as any);
		setTableDataHoldBack(dataHoldBack as any);
	}, []);

	const columns: Array<
		TableColumn<FundingBreakdownType | ParticipationBreakdown>
	> = [
		{
			cell: (row): React.ReactNode => {
				if ("lender" in row) {
					return row.lender?.name;
				} else {
					let name = "";

					name =
						row.type === "YieldSpread"
							? `Y/S ${
									row.investor?.user?.entityName ||
									`${row.investor?.user?.firstName} ${row.investor?.user?.lastName}`
							  }`
							: `${
									row.investor?.user?.entityName ||
									`${row.investor?.user?.firstName} ${row.investor?.user?.lastName}`
							  }`;
					return name;
				}
			},
			name: "Lender",
			style: { padding: 0 },
		},
		{
			cell: (row) => <Cell format="money" value={row.amount} />,
			name: "Amount",
			style: { padding: 0 },
		},

		{
			cell: (row) => (
				<InputNumber
					customValue={row.paymentValue || 0}
					disabled={row.type === "YieldSpread"}
					defaultValue={row.paymentValue || 0}
					handleChange={(value): void => {
						handlePayments(row.id, value.toString(), row?.investor?.id);
					}}
				/>
			),
			name: "Payment",
			style: { padding: 0 },
		},
		{
			cell: (row) => (
				<Cell
					format="money"
					value={
						Number.parseFloat(row.amount) -
						Number.parseFloat(row.paymentValue?.toString() || "0")
					}
				/>
			),
			name: "Total",
			style: { padding: 0 },
		},
	];

	const columnsConstructionHoldBack: Array<
		TableColumn<FundingBreakdownType | ParticipationBreakdown>
	> = [
		{
			cell: (row): React.ReactNode => {
				if ("lender" in row) {
					return row.lender?.name;
				} else {
					let name = "";

					name =
						row.type === "YieldSpread"
							? "Y/S"
							: `${
									row.investor?.user?.entityName ||
									`${row.investor?.user?.firstName} ${row.investor?.user?.lastName}`
							  }`;
					return name;
				}
			},
			name: "Lender",
			style: { padding: 0 },
		},
		{
			cell: (row) => (
				<Cell format="money" value={row?.constructionHoldback as any} />
			),
			name: "Amount",
			style: { padding: 0 },
		},

		{
			cell: (row) => (
				<InputNumber
					customValue={row.holdBackPaymentValue || 0}
					disabled={false}
					defaultValue={row.holdBackPaymentValue || 0}
					handleChange={(value): void => {
						handleHoldBackPayments(row.id, value.toString());
					}}
				/>
			),
			name: "Payment",
			style: { padding: 0 },
		},
		{
			cell: (row) => (
				<Cell
					format="money"
					value={
						Number.parseFloat(row.constructionHoldback?.toString() || "0") -
						Number.parseFloat(row.holdBackPaymentValue?.toString() || "0")
					}
				/>
			),
			name: "Total",
			style: { padding: 0 },
		},
	];

	useEffect(() => {
		if (data) {
			setDataLedgers({
				...(data?.ledgers[index] as Ledger),
			});
		}
	}, [data]);

	const handleRemoveConfirmation = (): void => {
		handleRemove(selectedIndex as number, selectedId as string);
	};

	return (
		<li
			key={`ledger-${index}`}
			className={`w-full flex flex-row   pb-1  pl-4   gap-4   relative border-b border-gray-200 ${
				dataLedgers?.editable ? "" : "pt-[12px]"
			} h-12 ${dataLedgers && dataLedgers.editable ? "bg-gray-50" : ""} pb-10 `}
			ref={lastScrollAdd as MutableRefObject<HTMLLIElement>}
		>
			<div className={`${columnWidth.date} text-primary-200  pl-4`}>
				{dataLedgers?.editable ? (
					<>
						<DatePicker
							placeholder="MM-DD-YYYY"
							minDate={moment(loan.originationDate).toDate()}
							name={`ledgers.${index}.ledgerDate`}
							className="h-10 rounded-none [&>*]:rounded-none [&>*]:border-gold-500  [&>*]:border-2"
							value={
								dataLedgers.ledgerDate
									? moment(dataLedgers.ledgerDate, "MMDDYYYY").toDate()
									: undefined
							}
							invalid={!!errors?.ledgers?.[index]?.ledgerDate}
							onChange={(date: Date): void => {
								handleSetDate(`ledgerDate`, date, index);
							}}
						/>
					</>
				) : (
					dataLedgers &&
					dataLedgers.ledgerDate &&
					dateWithFormatUS(dataLedgers.ledgerDate ?? "", "MM-DD-YYYY")
				)}
			</div>
			<div className={`${columnWidth.class} text-primary-200  pl-4`}>
				<div
					className={`flex justify-between items-center ${
						errors?.ledgers?.[index]?.typeOfPayment
							? "   border-2 border-red-ERROR h-[43px]   "
							: ""
					}`}
				>
					{dataLedgers &&
						dataLedgers.action === "show" &&
						dataLedgers?.approvalState === ApprovalStateType.PENDING && (
							<div className="absolute text-[8px] top-0 w-24  text-red-400">
								Pending
							</div>
						)}
					{dataLedgers?.editable ? (
						<>
							{dataLedgers && dataLedgers.typeOfPayment ? (
								<div>{dataLedgers.typeOfPaymentDescription}</div>
							) : (
								<div className="text-gray-400">Type of Payment</div>
							)}
							<div
								className="cursor-pointer pl-4 pt-[14px]"
								onClick={(): void => {
									handleOpenModal(true, index);
								}}
							>
								<Icon name="pencil" width="15" color="black" />
							</div>
						</>
					) : (
						<>{dataLedgers && dataLedgers.typeOfPaymentDescription}</>
					)}
				</div>
			</div>
			<div className={`${columnWidth.debitCredit} text-primary-200  pl-4`}>
				<div>
					{dataLedgers && dataLedgers.debit && dataLedgers.debit > 0 ? (
						<Tag variant="success" text="Debit" />
					) : (
						dataLedgers &&
						dataLedgers.credit &&
						dataLedgers.credit > 0 && <Tag variant="danger" text="Credit" />
					)}
				</div>
			</div>
			<div className={`${columnWidth.month} text-primary-200  pl-4 pt-2`}>
				{/* {dataLedgers?.editable ? (
					<>
						<DatePicker
							placeholder="M, YYYY"
							minDate={moment(loan.originationDate).toDate()}
							name={`ledgers.${index}.month`}
							view="month"
							className="h-10 rounded-none [&>*]:rounded-none [&>*]:border-gold-500  [&>*]:border-2"
							dateFormat="M, yy"
							value={
								dataLedgers.month
									? moment(dataLedgers.month).toDate()
									: undefined
							}
							invalid={!!errors?.ledgers?.[index]?.month}
							onChange={(date: Date): void => {
								handleSetMonth(`month`, date, index);
							}}
						/>
					</>
				) : ( */}
				<>
					{dataLedgers &&
						dataLedgers.ledgerDate &&
						moment(dataLedgers.month).format("MMM, YYYY")}
				</>
				{/* )} */}
			</div>
			<div className={`${columnWidth.memo} text-primary-200  pl-4`}>
				{dataLedgers?.editable ? (
					<input
						{...register(`ledgers.${index}.memo` as const)}
						placeholder="Enter a text.."
						className={`h-full w-full py-3 px-4 bg-transparent ${
							errors?.ledgers?.[index]?.memo ? " border-2 border-red-ERROR" : ""
						} hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none items-center font-inter text-[13px] text-primary-300 leading-4 tracking-[-0.65px]`}
						type="text"
					/>
				) : (
					dataLedgers && dataLedgers.memo
				)}
			</div>
			<div className={`${columnWidth.debit} text-primary-200  pl-4 text-right`}>
				{dataLedgers?.editable ? (
					<div className="relative">
						<InputNumber
							disabled={PrincipalFlag || constructionHoldBackFlag}
							{...register(`ledger.${index}.debit` as never)}
							placeholder="Debit"
							defaultValue={dataLedgers ? dataLedgers.debit : 0}
							error={
								errors?.ledgers?.[index]?.debit
									? errors?.ledgers?.[index]?.debit?.message
									: ""
							}
							customValue={dataLedgers ? dataLedgers.debit : 0}
							handleChange={(value): void => {
								handleSetValue(`debit`, value.toString(), index);
							}}
						/>
						{PrincipalFlag && (
							<div
								className="absolute right-[-22px] top-3 cursor-pointer"
								onClick={() => {
									setOpenInvestorsPayments(!openInvestorsPayments);
								}}
							>
								<Icon name="debit" color="black" width="20" />
							</div>
						)}
						{constructionHoldBackFlag && (
							<div
								className="absolute right-[-22px] top-3 cursor-pointer"
								onClick={() => {
									setOpenHoldBackPayments(!openHoldBackPayments);
								}}
							>
								<Icon name="debit" color="black" width="20" />
							</div>
						)}
					</div>
				) : (
					dataLedgers &&
					dataLedgers.debit &&
					moneyFormat(dataLedgers.debit || 0)
				)}
			</div>

			<div
				className={`${columnWidth.credit} text-primary-200  pl-4 text-right `}
			>
				{dataLedgers?.editable ? (
					<InputNumber
						{...register(`ledger.${index}.credit` as never)}
						placeholder="Credit"
						error={
							errors?.ledgers?.[index]?.credit
								? errors?.ledgers?.[index]?.credit?.message
								: ""
						}
						defaultValue={dataLedgers ? dataLedgers.credit : 0}
						customValue={dataLedgers ? dataLedgers.credit : 0}
						handleChange={(value): void => {
							handleSetValue(`credit`, value.toString(), index);
						}}
					/>
				) : (
					dataLedgers &&
					dataLedgers.credit &&
					moneyFormat(dataLedgers.credit || 0)
				)}
			</div>
			<div
				className={`${columnWidth.balance}  ${
					dataLedgers?.editable ? "pt-[12px]" : ""
				} text-primary-200  pl-4  text-right`}
			>
				<div
					className={` text-right pr-6 ${
						errors?.ledgers?.[index]?.balance
							? "   border-2 border-red-ERROR h-[43px]   "
							: ""
					}`}
				>
					{dataLedgers && dataLedgers.balance
						? moneyFormat(dataLedgers?.balance)
						: "0.00"}
				</div>
			</div>
			<div className={`${columnWidth.action} text-primary-200  pl-0`}>
				<div className="flex justify-between items-center gap-1">
					<EditLedger
						dataLedgers={dataLedgers}
						index={index}
						handleEdit={handleEdit}
					/>
					<DeleteLedger
						index={index}
						setSelectedIndex={setSelectedIndex}
						setSelectedId={setSelectedId}
						dataLedgers={dataLedgers}
						handleRemove={handleRemove}
						setOpenConfirmation={setOpenConfirmation}
					/>
					<div className="flex justify-between items-center gap-4 "></div>
				</div>
				<ConfirmationModal
					action="delete"
					buttonText="Delete"
					handelConfirmation={(): void => {
						handleRemoveConfirmation();
						setOpenConfirmation(false);
					}}
					model="ledger"
					onHide={(): void => {
						setOpenConfirmation(false);
					}}
					title="Delete Ledger"
					visible={openConfirmation}
				/>

				<Modal
					visible={openInvestorsPayments}
					title={"Principal investors payments"}
					width="98%"
					onHide={() => {
						setOpenInvestorsPayments(!openInvestorsPayments);
					}}
				>
					<div className="rounded-xl bg-white flex flex-col justify-between overflow-y-auto">
						<Table
							className="rounded-t-xl h-[100%]"
							columns={columns}
							data={tableData.filter((data: any) => data.type !== "Servicing")}
						/>
					</div>
				</Modal>
				<Modal
					visible={openHoldBackPayments}
					title={"Principal constructionsHoldBack payments"}
					width="98%"
					onHide={() => {
						setOpenHoldBackPayments(!openHoldBackPayments);
					}}
				>
					<div className="rounded-xl bg-white flex flex-col justify-between overflow-y-auto">
						<Table
							className="rounded-t-xl h-[100%]"
							columns={columnsConstructionHoldBack}
							data={tableDataHoldBack.filter(
								(data: any) =>
									data.type !== "Servicing" && data.type !== "YieldSpread"
							)}
						/>
					</div>
				</Modal>
			</div>
		</li>
	);
};
