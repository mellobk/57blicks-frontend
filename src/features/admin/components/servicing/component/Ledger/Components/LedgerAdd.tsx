import { type FC, useEffect, useState, MutableRefObject } from "react";

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
import LedgerApprove from "./LedgerApprove";
import type { Loan } from "@/features/admin/components/servicing/types/api";
import moment from "moment";
import { columnWidth } from "./header/column-width";
interface LedgerAddProps {
	field: FieldArrayWithId<Ledger>;
	index: number;
	errors: FieldErrors<LedgerFormValues>;
	control: Control<LedgerFormValues>;
	data: LedgerFormValues;
	loan: Loan;
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
	handleSetMonth,
	handleEdit,
	register,
	handleRemove,
	handleOpenModal,
	refetchLedgers,
}) => {
	const [dataLedgers, setDataLedgers] = useState<Ledger>();
	const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
	const [selectedIndex, setSelectedIndex] = useState<number>();
	const [selectedId, setSelectedId] = useState<string>();

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
			<div className={`${columnWidth.month} text-primary-200  pl-4`}>
				{dataLedgers?.editable ? (
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
								console.log("🚀 ~ file: LedgerAdd.tsx:174 ~ date:", date);
								handleSetMonth(`month`, date, index);
							}}
						/>
					</>
				) : (
					<>{dataLedgers && moment(dataLedgers.month).format("MMM, YYYY")}</>
				)}
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
					<InputNumber
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
					<div
						key={`edit-${index}`}
						onClick={(): void => {
							handleEdit(`editable`, !dataLedgers?.editable, index);
						}}
					>
						{dataLedgers && (
							<Icon
								name={dataLedgers.editable ? "deleteBack" : "pencil"}
								color={dataLedgers.editable ? "red" : "gray"}
								width="14"
							/>
						)}
					</div>
					<div
						key={`delete-${index}`}
						onClick={(): void => {
							setSelectedIndex(index);
							setSelectedId(dataLedgers?.id);
							if (dataLedgers?.action === "add") {
								handleRemove(index, `${dataLedgers.id}`);
							} else {
								setOpenConfirmation(true);
							}
						}}
					>
						<Icon name="trashBin" color="red" width="20" />
					</div>
					<div className="flex justify-between items-center gap-4 ">
						{/* {dataLedgers && dataLedgers?.action === "show" && (
							<LedgerApprove
								ledger={dataLedgers}
								refetchLedgers={refetchLedgers}
							/>
						)} */}
					</div>
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
			</div>
		</li>
	);
};
