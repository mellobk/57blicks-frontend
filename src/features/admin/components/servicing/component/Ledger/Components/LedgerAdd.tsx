import { type FC, useEffect, useState } from "react";

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
}

export const LedgerAdd: FC<LedgerAddProps> = ({
	index,
	errors,
	data,
	loan,
	handleSetValue,
	handleSetDate,
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
		<tr
			key={`ledger-${index}`}
			className={`relative border-b border-gray-200 h-12 ${
				dataLedgers && dataLedgers.editable ? "bg-gray-50" : ""
			} `}
		>
			<td style={{ paddingLeft: "20px", width: "150px" }}>
				{dataLedgers?.editable ? (
					<>
						<DatePicker
							placeholder="MM-DD-YYYY"
							maxDate={new Date()}
							minDate={moment(loan.originationDate).toDate()}
							name={`ledgers.${index}.ledgerDate`}
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
			</td>
			<td style={{ paddingLeft: "20px", width: "160px" }}>
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
								className="cursor-pointer pl-4"
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
			</td>
			<td style={{ paddingLeft: "20px", width: "100px" }}>
				<div>
					{dataLedgers && dataLedgers.debit && dataLedgers.debit > 0 ? (
						<Tag variant="success" text="Debit" />
					) : (
						dataLedgers &&
						dataLedgers.credit &&
						dataLedgers.credit > 0 && <Tag variant="danger" text="Credit" />
					)}
				</div>
			</td>
			<td style={{ paddingLeft: "20px", width: "220px" }}>
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
			</td>
			<td style={{ paddingLeft: "20px", width: "220px" }}>
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
			</td>
			<td style={{ paddingLeft: "20px", width: "220px" }}>
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
			</td>
			<td
				style={{
					paddingLeft: "20px",
					width: "150px",
					color: `${errors?.ledgers?.[index]?.balance ? "red" : ""}`,
				}}
			>
				<div
					className={`flex justify-between items-center ${
						errors?.ledgers?.[index]?.balance
							? "   border-2 border-red-ERROR h-[43px]   "
							: ""
					}`}
				>
					{dataLedgers && dataLedgers.balance
						? moneyFormat(dataLedgers?.balance)
						: "0.00"}
				</div>
			</td>
			<td style={{ paddingRight: "30px", width: "80px" }}>
				<div className="flex justify-between items-center gap-6">
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
					<div className="flex justify-between items-center w-10 gap-2">
						{dataLedgers && dataLedgers?.action === "show" && (
							<LedgerApprove
								ledger={dataLedgers}
								refetchLedgers={refetchLedgers}
							/>
						)}
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
			</td>
		</tr>
	);
};
